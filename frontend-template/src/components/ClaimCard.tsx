import type { PayrollNote } from '@/hooks/useEmployeeClaims';

interface ClaimCardProps {
    note: PayrollNote;
    onClaim: (id: string) => void;
    isClaiming: boolean;
    isClaimed: boolean;
    explorerBase: string;
}

export default function ClaimCard({ note, onClaim, isClaiming, isClaimed, explorerBase }: ClaimCardProps) {
    const displayAmount = Number(note.amount) / 1_000_000;

    return (
        <div
            style={{
                background: 'rgba(8, 12, 20, 0.65)',
                border: isClaimed
                    ? '1px solid rgba(16, 185, 129, 0.5)'
                    : '1px solid rgba(255, 140, 0, 0.25)',
                borderRadius: '0.75rem',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: isClaimed
                    ? '0 4px 20px rgba(16, 185, 129, 0.15)'
                    : '0 4px 20px rgba(255, 140, 0, 0.05)',
                animation: 'fadeUp 0.4s ease forwards',
            }}
        >
            {/* Note info */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{
                        fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>
                        Note ID
                    </span>
                    <a
                        href={`${explorerBase}/note/${note.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            fontSize: '0.7rem',
                            color: 'var(--color-primary)',
                            opacity: 0.8,
                            textDecoration: 'none',
                        }}
                    >
                        {note.id.slice(0, 10)}…{note.id.slice(-6)} ↗
                    </a>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>
                    {displayAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    <span style={{ fontSize: '0.85rem', marginLeft: '0.4rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        MIDEN
                    </span>
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>
                    From: {note.sender.slice(0, 12)}…
                </p>
            </div>

            {/* Action */}
            <button
                onClick={() => onClaim(note.id)}
                disabled={isClaiming || isClaimed}
                style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: isClaiming || isClaimed ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    background: isClaimed
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : isClaiming
                        ? 'rgba(255,140,0,0.3)'
                        : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                    color: '#fff',
                    opacity: isClaiming ? 0.7 : 1,
                    boxShadow: isClaimed
                        ? '0 0 14px rgba(16, 185, 129, 0.4)'
                        : '0 0 14px rgba(255, 140, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                }}
            >
                {isClaiming && (
                    <span className="spinner" style={{ width: '0.8rem', height: '0.8rem', borderTopColor: '#fff' }} />
                )}
                {isClaimed ? '✓ Claimed!' : isClaiming ? 'Claiming…' : '⬡ Claim'}
            </button>
        </div>
    );
}
