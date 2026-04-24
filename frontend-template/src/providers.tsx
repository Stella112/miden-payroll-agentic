import { useMemo, type ReactNode } from "react";
import { MidenProvider } from "@miden-sdk/react";
import { WalletProvider } from "@miden-sdk/miden-wallet-adapter-react";
import { WalletModalProvider, MidenFiSignerProvider } from "@miden-sdk/miden-wallet-adapter";
import { MidenWalletAdapter } from "@miden-sdk/miden-wallet-adapter-miden";
import "@miden-sdk/miden-wallet-adapter/styles.css";
import { APP_NAME, MIDEN_RPC_URL, MIDEN_PROVER } from "@/config";

export function AppProviders({ children }: { children: ReactNode }) {
    const wallets = useMemo(() => [new MidenWalletAdapter({ appName: APP_NAME })], []);

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <MidenFiSignerProvider appName={APP_NAME} autoConnect>
                    <MidenProvider
                        config={{ rpcUrl: MIDEN_RPC_URL, prover: MIDEN_PROVER }}
                        loadingComponent={
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '100vh',
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1rem',
                            }}>
                                ⬡ Loading Miden...
                            </div>
                        }
                    >
                        {children}
                    </MidenProvider>
                </MidenFiSignerProvider>
            </WalletModalProvider>
        </WalletProvider>
    );
}
