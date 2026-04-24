import React from 'react';
import GlassCard from './GlassCard';
import TransactionCard from './TransactionCard';
import TreasuryWidget from './TreasuryWidget';
import { usePayroll } from '@/hooks/usePayroll';
import { WalletMultiButton } from '@miden-sdk/miden-wallet-adapter';


const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(8, 12, 20, 0.6)',
    border: '1px solid rgba(255, 140, 0, 0.22)',
    borderRadius: '0.5rem',
    padding: '0.8rem 1rem',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function Dashboard() {
    const {
        employeeId,
        amount,
        isLoading,
        error,
        result,
        setEmployeeId,
        setAmount,
        handleSubmit,
        reset,
        isSuccess,
        walletConnected,
    } = usePayroll();

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
            {/* Hero heading */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1
                    className="text-gradient"
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        marginBottom: '0.75rem',
                    }}
                >
                    Private Payroll
                </h1>
                <p
                    style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '1rem',
                        maxWidth: '38ch',
                        lineHeight: 1.6,
                    }}
                >
                    Zero-knowledge payroll transactions, powered by the Miden VM.
                </p>
            </div>

            {/* Live Treasury Widget */}
            <TreasuryWidget />

            {/* Form card */}
            <GlassCard
                className="anim-fade-up"
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    padding: '2rem',
                }}
            >
                {/* Card header */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <h2
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            marginBottom: '0.3rem',
                        }}
                    >
                        Run Payroll Transaction
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Funds will be transferred privately via Miden notes.
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Employee ID */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label
                            htmlFor="employeeId"
                            style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--color-text-muted)',
                                marginBottom: '0.4rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Employee ID
                        </label>
                        <input
                            id="employeeId"
                            type="text"
                            placeholder="e.g. EMP001"
                            value={employeeId}
                            onChange={(e) => { reset(); setEmployeeId(e.target.value); }}
                            disabled={isLoading}
                            required
                            className="input-glow"
                            style={inputBaseStyle}
                            autoComplete="off"
                            spellCheck={false}
                        />
                    </div>

                    {/* Token Amount */}
                    <div style={{ marginBottom: '1.75rem' }}>
                        <label
                            htmlFor="amount"
                            style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--color-text-muted)',
                                marginBottom: '0.4rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Token Amount (MIDEN)
                        </label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="e.g. 500"
                            min="1"
                            step="any"
                            value={amount}
                            onChange={(e) => { reset(); setAmount(e.target.value); }}
                            disabled={isLoading}
                            required
                            className="input-glow"
                            style={inputBaseStyle}
                        />
                    </div>

                    {/* Submit button */}
                    {!walletConnected ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <WalletMultiButton />
                        </div>
                    ) : (
                        <button
                            id="runPayrollBtn"
                            type="submit"
                            disabled={isLoading || !employeeId.trim() || !amount}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.6rem',
                                background: isSuccess
                                    ? 'linear-gradient(135deg, #10b981, #059669)'
                                    : undefined,
                                boxShadow: isSuccess
                                    ? '0 0 20px rgba(16, 185, 129, 0.4)'
                                    : undefined,
                                color: isSuccess ? '#ffffff' : undefined,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading && <span className="spinner" />}
                            {isSuccess ? '✓ Paycheck Sent!' : isLoading ? 'Processing…' : '⬡ Run Payroll'}
                        </button>
                    )}

                </form>

                {/* Error banner */}
                {error && (
                    <div
                        role="alert"
                        style={{
                            marginTop: '1.25rem',
                            padding: '0.85rem 1rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(255, 77, 109, 0.1)',
                            border: '1px solid rgba(255, 77, 109, 0.35)',
                            color: '#ff4d6d',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                        }}
                    >
                        <span aria-hidden="true" style={{ flexShrink: 0 }}>⚠</span>
                        {error}
                    </div>
                )}
            </GlassCard>

            {/* Transaction result */}
            <div style={{ width: '100%', maxWidth: '480px' }}>
                <TransactionCard data={result} />
            </div>

            {/* Decorative footnote */}
            <p
                style={{
                    marginTop: '2.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    opacity: 0.6,
                }}
            >
                Transactions are private by default · Miden Testnet
            </p>
        </main>
    );
}
