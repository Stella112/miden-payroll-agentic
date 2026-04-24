const BASE_URL = '/api';

export interface PayrollPayload {
    employeeId: string;
    amount: string | number;
}

export async function runPayroll({ employeeId, amount }: PayrollPayload): Promise<any> {
    const response = await fetch(`${BASE_URL}/run-payroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, amount: Number(amount) }),
    });

    if (!response.ok) {
        let message = `Server error: ${response.status}`;
        try {
            const errBody = await response.json();
            if (errBody?.message || errBody?.error) {
                message = errBody.message ?? errBody.error;
            }
        } catch {
            // ignore parse error
        }
        throw new Error(message);
    }

    return response.json();
}

export async function fetchTreasuryBalance(): Promise<{ balance: number }> {
    const response = await fetch(`${BASE_URL}/balance`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.status}`);
    }

    return response.json();
}
