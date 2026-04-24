import React from 'react';
import GlassCard from './GlassCard';

interface TransactionCardProps {
    data: any;
}

export default function TransactionCard({ data }: TransactionCardProps) {
    if (!data) return null;

    // Helper to safely extract a regex match from any string in the data object
    const extractFromRawOutput = (regex: RegExp) => {
        for (const val of Object.values(data)) {
            if (typeof val === 'string') {
                const match = val.match(regex);
                if (match && match[1]) return match[1];
            }
        }
        return null;
    };

    // Parse the values dynamically
    const transactionId = data.transactionId || data.txId || extractFromRawOutput(/Transaction ID:?\s*([a-zA-Z0-9]+)/i) || 'N/A';
    const noteHash = data.noteHash || data.noteId || extractFromRawOutput(/Output notes?:?\s*([a-zA-Z0-9]+)/i) || 'N/A';
    const targetEmployee = data._requestEmployee || data.employeeId || 'Unknown';
    const amountSent = data._requestAmount || data.amount || 'Unknown';

    const rowStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '0.85rem 0',
        borderBottom: '1px solid rgba(255, 140, 0, 0.08)',
        fontSize: '0.875rem',
    };

    const labelStyle: React.CSSProperties = {
        color: 'var(--color-text-muted)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
    };

    const valueStyle: React.CSSProperties = {
        color: 'var(--color-text)',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
        textAlign: 'right',
        fontSize: '0.95rem'
    };

    return (
        <GlassCard
            className="anim-fade-up"
            style={{ padding: '1.5rem', marginTop: '1.5rem' }}
        >
            {/* Success header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    marginBottom: '1.25rem',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        fontSize: '1.1rem',
                        color: '#10b981',
                        flexShrink: 0,
                    }}
                    aria-hidden="true"
                >
                    ✓
                </span>
                <div>
                    <p style={{ fontWeight: 700, color: '#10b981', fontSize: '1.05rem' }}>
                        Payroll Processed
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                        Transaction successfully recorded on Miden testnet
                    </p>
                </div>
            </div>

            {/* Formatted Table Output */}
            <div style={{ marginTop: '0.5rem' }}>
                <div style={rowStyle}>
                    <span style={labelStyle}>Target Employee</span>
                    <span style={valueStyle}>{targetEmployee}</span>
                </div>
                <div style={rowStyle}>
                    <span style={labelStyle}>Amount Sent</span>
                    <span style={{ ...valueStyle, color: 'var(--color-primary)', fontWeight: 'bold' }}>
                        {amountSent} MIDEN
                    </span>
                </div>
                <div style={rowStyle}>
                    <span style={labelStyle}>Transaction ID</span>
                    <span style={valueStyle}>{transactionId}</span>
                </div>
                <div style={{ ...rowStyle, borderBottom: 'none', paddingBottom: 0 }}>
                    <span style={labelStyle}>Note Hash</span>
                    <span style={valueStyle}>{noteHash}</span>
                </div>
            </div>
        </GlassCard>
    );
}
