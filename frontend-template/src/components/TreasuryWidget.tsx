import { useMemo } from 'react';
import { useAccount } from '@miden-sdk/react';
import GlassCard from './GlassCard';
import { TREASURY_ADDRESS, FAUCET_ID } from '@/config';
import { AccountId } from '@miden-sdk/miden-sdk';

export default function TreasuryWidget() {
    const { account } = useAccount(TREASURY_ADDRESS);

    const balance = useMemo(() => {
        if (!account) return '0.00';
        try {
            // Get balance for the specific faucet from the account vault
            const faucetId = AccountId.fromHex(FAUCET_ID);
            const rawBalance = account.vault().getBalance(faucetId);
            
            // Convert from 6 decimals
            return (Number(rawBalance) / 1000000).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
            });
        } catch (err) {
            console.error('Error reading treasury balance:', err);
            return '0.00';
        }
    }, [account]);

    const isLoading = !account;

    return (
        <GlassCard
            className="anim-fade-up"
            style={{
                width: '100%',
                maxWidth: '480px',
                padding: '1.25rem 1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 140, 0, 0.4)',
                boxShadow: '0 4px 30px rgba(255, 140, 0, 0.1)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255, 140, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        fontSize: '1.2rem',
                        border: '1px solid rgba(255, 140, 0, 0.3)',
                    }}
                    aria-hidden="true"
                >
                    💎
                </div>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Treasury Balance
                    </h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.1rem' }}>
                        {isLoading && !account ? (
                            <span className="spinner" style={{ width: '1rem', height: '1rem', borderTopColor: 'var(--color-primary)' }} />
                        ) : (
                            `${balance} MIDEN`
                        )}
                    </p>
                </div>
            </div>

            {!isLoading && (
                <div style={{
                    fontSize: '0.7rem',
                    color: '#10b981',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                    Verified
                </div>
            )}
        </GlassCard>
    );
}
