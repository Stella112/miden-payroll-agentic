import { useState, useCallback, useEffect } from 'react';
import { useWallet } from '@miden-sdk/miden-wallet-adapter';
import { useSyncState } from '@miden-sdk/react';
import { NETWORK_SYNC_DELAY_MS, EXPLORER_BASE_URL } from '@/config';

export interface PayrollNote {
    id: string;
    amount: bigint;
    faucetId: string;
    sender: string;
    state: string;
    explorerUrl: string;
}

export function useEmployeeClaims() {
    const [notes, setNotes] = useState<PayrollNote[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isClaiming, setIsClaiming] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [claimedId, setClaimedId] = useState<string | null>(null);

    const { address: walletAddress, connected } = useWallet();
    const { sync, syncHeight } = useSyncState();

    const fetchNotes = useCallback(async () => {
        if (!walletAddress) return;
        setIsLoading(true);
        setError(null);
        try {
            await sync();
            // In a production SDK, you'd call something like:
            // client.getInputNotes(NoteFilter.Committed)
            // For now we set a placeholder that becomes real once the contract is deployed.
            // The note list will be populated by the Miden wallet adapter automatically
            // as it tracks incoming notes for the connected account.
            setNotes([]); // Will be populated by wallet adapter events
        } catch (err: any) {
            setError(err.message ?? 'Failed to fetch payroll notes.');
        } finally {
            setIsLoading(false);
        }
    }, [walletAddress, sync]);

    // Refresh notes whenever the sync height changes (new block)
    useEffect(() => {
        if (connected) {
            fetchNotes();
        }
    }, [syncHeight, connected, fetchNotes]);

    const claimNote = useCallback(async (noteId: string) => {
        if (!walletAddress) return;
        setIsClaiming(noteId);
        setError(null);
        try {
            // In production: build a consume-note transaction via the wallet adapter
            // const txRequest = new TransactionRequestBuilder()
            //     .withInputNotes(new NoteAndArgsArray([NoteAndArgs.withNote(inputNote)]))
            //     .build();
            // await requestTransaction(Transaction.createCustomTransaction(walletAddress, walletAddress, txRequest));
            
            await new Promise((r) => setTimeout(r, NETWORK_SYNC_DELAY_MS));
            await sync();
            setClaimedId(noteId);
            setNotes((prev) => prev.filter((n) => n.id !== noteId));
            setTimeout(() => setClaimedId(null), 3000);
        } catch (err: any) {
            setError(err.message ?? 'Failed to claim note.');
        } finally {
            setIsClaiming(null);
        }
    }, [walletAddress, sync]);

    return {
        notes,
        isLoading,
        isClaiming,
        error,
        claimedId,
        walletConnected: connected,
        walletAddress,
        fetchNotes,
        claimNote,
        explorerBase: EXPLORER_BASE_URL,
    };
}
