import { useState } from 'react';
import { AppProviders } from '@/providers';
import MatrixBackground from '@/components/MatrixBackground';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ClaimInterface from '@/components/ClaimInterface';

type View = 'admin' | 'claim';

const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1.5rem',
    borderRadius: '99px',
    border: active ? '1px solid rgba(255,140,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
    background: active ? 'rgba(255,140,0,0.12)' : 'transparent',
    color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.45)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: '0.85rem',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: active ? '0 0 12px rgba(255,140,0,0.15)' : 'none',
});

export default function App() {
    const [view, setView] = useState<View>('admin');

    return (
        <AppProviders>
            <div className="relative min-h-screen">
                <MatrixBackground />
                <Navbar />

                {/* Tab switcher */}
                <div
                    style={{
                        position: 'fixed',
                        top: '64px',
                        left: 0,
                        right: 0,
                        zIndex: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0.6rem 1rem',
                        background: 'rgba(8,12,20,0.6)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(255,140,0,0.08)',
                        gap: '0.5rem',
                    }}
                >
                    <button
                        id="tabAdmin"
                        style={tabStyle(view === 'admin')}
                        onClick={() => setView('admin')}
                    >
                        ⬡ Run Payroll
                    </button>
                    <button
                        id="tabClaim"
                        style={tabStyle(view === 'claim')}
                        onClick={() => setView('claim')}
                    >
                        📥 Claim Payroll
                    </button>
                </div>

                {/* Views */}
                <div style={{ paddingTop: '44px' }}>
                    {view === 'admin' ? <Dashboard /> : <ClaimInterface />}
                </div>
            </div>
        </AppProviders>
    );
}
