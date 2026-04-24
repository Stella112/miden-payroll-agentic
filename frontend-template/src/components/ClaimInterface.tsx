import GlassCard from './GlassCard';
import ClaimCard from './ClaimCard';
import { useEmployeeClaims } from '@/hooks/useEmployeeClaims';
import { WalletMultiButton } from '@miden-sdk/miden-wallet-adapter';

export default function ClaimInterface() {
    const {
        notes,
        isLoading,
        isClaiming,
        error,
        claimedId,
        walletConnected,
        walletAddress,
        fetchNotes,
        claimNote,
        explorerBase,
    } = useEmployeeClaims();

    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 1.5rem 3rem',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Heading */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1
                    className="text-gradient"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}
                >
                    Claim Payroll
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '40ch', lineHeight: 1.6 }}>
                    View and claim your pending payroll notes from the Miden treasury.
                </p>
            </div>

            {/* Not connected */}
            {!walletConnected ? (
                <GlassCard
                    className="anim-fade-up"
                    style={{ maxWidth: '420px', width: '100%', padding: '2.5rem', textAlign: 'center' }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Connect Your Wallet</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Connect your Miden wallet to see incoming payroll notes.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WalletMultiButton />
                    </div>
                </GlassCard>
            ) : (
                <div style={{ width: '100%', maxWidth: '520px' }}>
                    {/* Account badge */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.25rem',
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            background: 'rgba(255,140,0,0.08)',
                            border: '1px solid rgba(255,140,0,0.2)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '99px',
                        }}>
                            {walletAddress?.slice(0, 14)}…{walletAddress?.slice(-6)}
                        </div>
                        <button
                            onClick={fetchNotes}
                            disabled={isLoading}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-primary)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontFamily: 'var(--font-sans)',
                                opacity: isLoading ? 0.5 : 1,
                            }}
                        >
                            {isLoading ? <span className="spinner" style={{ width: '0.75rem', height: '0.75rem', borderTopColor: 'var(--color-primary)' }} /> : '↻'} Refresh
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div role="alert" style={{
                            marginBottom: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(255,77,109,0.1)',
                            border: '1px solid rgba(255,77,109,0.3)',
                            color: '#ff4d6d',
                            fontSize: '0.875rem',
                        }}>
                            ⚠ {error}
                        </div>
                    )}

                    {/* Notes list */}
                    {isLoading && notes.length === 0 ? (
                        <GlassCard style={{ padding: '2rem', textAlign: 'center' }}>
                            <span className="spinner" style={{ width: '1.5rem', height: '1.5rem', borderTopColor: 'var(--color-primary)', margin: '0 auto' }} />
                            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontSize: '0.875rem' }}>
                                Syncing with Miden network…
                            </p>
                        </GlassCard>
                    ) : notes.length === 0 ? (
                        <GlassCard style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.5 }}>📭</div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                No pending payroll notes found.
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginTop: '0.4rem' }}>
                                Notes appear here once the treasury processes your payroll.
                            </p>
                        </GlassCard>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {notes.map((note) => (
                                <ClaimCard
                                    key={note.id}
                                    note={note}
                                    onClaim={claimNote}
                                    isClaiming={isClaiming === note.id}
                                    isClaimed={claimedId === note.id}
                                    explorerBase={explorerBase}
                                />
                            ))}
                        </div>
                    )}

                    <p style={{
                        marginTop: '2rem',
                        fontSize: '0.72rem',
                        color: 'rgba(255,255,255,0.25)',
                        textAlign: 'center',
                    }}>
                        Notes are private by default · Miden Testnet
                    </p>
                </div>
            )}
        </main>
    );
}
