import { useState, useCallback, useEffect } from 'react';
import { useWallet, Transaction } from '@miden-sdk/miden-wallet-adapter';
import { 
    useAccount, 
    useSyncState, 
    useImportAccount 
} from '@miden-sdk/react';
import { 
    TransactionRequestBuilder,
    TransactionScript, 
    Package,
} from '@miden-sdk/miden-sdk';
import { TREASURY_ADDRESS, NETWORK_SYNC_DELAY_MS } from '@/config';

export function usePayroll() {
    const [employeeId, setEmployeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { address: walletAddress, connected, requestTransaction } = useWallet();
    const { importAccount } = useImportAccount();
    const { sync } = useSyncState();
    const { refetch } = useAccount(TREASURY_ADDRESS);

    // Ensure treasury account is tracked
    useEffect(() => {
        if (TREASURY_ADDRESS) {
            importAccount({ type: "id", accountId: TREASURY_ADDRESS }).catch(() => {});
        }
    }, [importAccount]);

    const reset = useCallback(() => {
        setError(null);
        setResult(null);
        setIsSuccess(false);
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!employeeId.trim() || !amount || !walletAddress || !requestTransaction) return;

            setIsLoading(true);
            setError(null);
            setResult(null);
            setIsSuccess(false);

            try {
                // 1. Load the distribute_payroll transaction script
                // (Assuming the script is built and available at this path)
                const buf = await fetch("/packages/distribute_payroll.masp").then((r) =>
                    r.arrayBuffer(),
                );
                const pkg = Package.deserialize(new Uint8Array(buf));
                const txScript = TransactionScript.fromPackage(pkg);

                // 2. Prepare arguments
                // (Arguments will be mapped to the tx script in the next iteration)

                // 3. Build the transaction request
                const txRequest = new TransactionRequestBuilder()
                    .withCustomScript(txScript)
                    .build();

                // 4. Submit via wallet
                const tx = Transaction.createCustomTransaction(
                    walletAddress,
                    TREASURY_ADDRESS,
                    txRequest,
                );
                
                const txResult = await requestTransaction(tx);
                
                setResult({
                    transactionId: txResult?.toString() ?? 'pending',
                    _requestAmount: amount,
                    _requestEmployee: employeeId.trim()
                });

                setIsSuccess(true);
                
                // 5. Sync and refresh state
                await new Promise((r) => setTimeout(r, NETWORK_SYNC_DELAY_MS));
                await sync();
                await refetch();
                
                setTimeout(() => setIsSuccess(false), 3000);
            } catch (err: any) {
                setError(err.message ?? 'An unexpected error occurred. Please try again.');
                console.error('Payroll Transaction Error:', err);
            } finally {
                setIsLoading(false);
            }
        },
        [employeeId, amount, walletAddress, requestTransaction, sync, refetch]
    );

    return {
        employeeId,
        amount,
        isLoading,
        error,
        result,
        isSuccess,
        setEmployeeId,
        setAmount,
        handleSubmit,
        reset,
        walletConnected: connected,
    };
}
