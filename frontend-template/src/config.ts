// Network counter account deployed on Miden testnet
export const COUNTER_ADDRESS = "mtst1aru8adnrqspgcsr3drk2n990lyc070ll";

// StorageMap slot name for the counter
export const COUNTER_SLOT_NAME =
  "miden::component::miden_counter_account::count_map";

// Payroll Treasury configuration
export const TREASURY_ADDRESS = "0x9193b77c62aaf5000c00822fde5008";
export const TREASURY_TOTAL_DISTRIBUTED_SLOT =
  "miden::component::miden_payroll_account::total_distributed";
export const FAUCET_ID = "0x0000000000000000"; // Placeholder for the asset faucet


// Block explorer base URL
export const EXPLORER_BASE_URL = "https://testnet.midenscan.com";

// Delay (ms) to wait for the network to process a note before re-syncing
export const NETWORK_SYNC_DELAY_MS = 10_000;

// Application display name (used by wallet adapter)
export const APP_NAME = "Miden Template";

// Miden SDK configuration — override via environment variables
export const MIDEN_RPC_URL =
  import.meta.env.VITE_MIDEN_RPC_URL ?? "testnet";
export const MIDEN_PROVER =
  (import.meta.env.VITE_MIDEN_PROVER as "testnet" | "local") ?? "testnet";
