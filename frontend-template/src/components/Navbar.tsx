


export default function Navbar() {
    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                background: 'rgba(8, 12, 20, 0.72)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid rgba(255, 140, 0, 0.15)',
            }}
        >
            {/* Branding */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                    style={{
                        fontSize: '1.5rem',
                        lineHeight: 1,
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                    }}
                    aria-hidden="true"
                >
                    ⬡
                </span>
                <span
                    className="text-gradient"
                    style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.04em' }}
                >
                    Miden Payroll
                </span>
            </div>

            {/* Network badge */}
            <div
                className="badge-pulse"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '99px',
                    border: '1px solid rgba(255, 140, 0, 0.40)',
                    background: 'rgba(255, 140, 0, 0.09)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    letterSpacing: '0.06em',
                }}
                role="status"
                aria-label="Connected to Miden Testnet"
            >
                <span
                    style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        flexShrink: 0,
                    }}
                />
                MIDEN TESTNET
            </div>
        </header>
    );
}
