/**
 * Solana Trust & Transaction Service Abstraction
 * 
 * Provides verifiable identity badges, decentralized reputation scores,
 * and demo/devnet transaction validation for TazaaConnect.
 * 
 * Note: This implements a clearly labeled "Demo / Devnet Transaction" adapter.
 * It connects to the live Solana Devnet RPC endpoint (https://api.devnet.solana.com)
 * to verify cluster health and fetch live blockhash telemetry, while keeping
 * transaction signing inside a deterministic demo adapter boundary without requiring
 * private key configuration.
 */

const SOLANA_DEVNET_RPC = import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

export const INITIAL_DEMO_TRANSACTION = {
  id: 'tx_demo_sol_884192a4f',
  seller: {
    name: 'Green Valley Urban Farm',
    status: 'Verified Identity',
    reputation: '4.8/5',
    reputationScore: 4.8,
    walletAddress: 'GvFarm7xKpQz29kM9j2qWvL3nP6rTy18z'
  },
  buyer: {
    name: 'Corner Market #104',
    status: 'Verified Identity',
    reputation: '4.7/5',
    reputationScore: 4.7,
    walletAddress: 'CrnMkt4bM8LtP5vXy9KdF2wQ8rJ14mN6'
  },
  produce: 'Romaine Lettuce',
  quantity: '50 kg',
  quantityKg: 50,
  unitPrice: '$1.20/kg',
  unitPriceNumber: 1.20,
  total: '$60',
  totalAmount: 60.00,
  network: 'Solana Devnet',
  status: 'Pending Validation',
  deterministicTxId: '5KtP_DEMO_ADAPTER_8841_Romaine_NorthDistrict_7xYz',
  createdAt: '2026-10-31T07:15:00Z',
  validationDetails: null
};

export const MOCK_REPUTATION_HISTORY = [
  {
    id: 'tx-hist-001',
    date: '2026-10-29',
    produce: 'Heirloom Vine Tomatoes',
    quantity: '40 kg',
    total: '$66.00',
    counterparty: 'Corner Market #104',
    role: 'Seller (Green Valley Farm)',
    status: 'Validated via Demo Adapter',
    ratingGiven: 5.0,
    network: 'Solana Devnet'
  },
  {
    id: 'tx-hist-002',
    date: '2026-10-26',
    produce: 'Baby Spinach Bunches',
    quantity: '25 kg',
    total: '$36.25',
    counterparty: 'Al-Madina Local Fresh Grocers',
    role: 'Seller (Green Valley Farm)',
    status: 'Validated via Demo Adapter',
    ratingGiven: 4.8,
    network: 'Solana Devnet'
  },
  {
    id: 'tx-hist-003',
    date: '2026-10-22',
    produce: 'Crisp Bell Peppers',
    quantity: '30 kg',
    total: '$51.00',
    counterparty: 'Bodega 24 Express',
    role: 'Seller (Green Valley Farm)',
    status: 'Validated via Demo Adapter',
    ratingGiven: 4.9,
    network: 'Solana Devnet'
  },
  {
    id: 'tx-hist-004',
    date: '2026-10-18',
    produce: 'Organic Rainbow Carrots',
    quantity: '60 kg',
    total: '$66.00',
    counterparty: 'East Riverview Co-op',
    role: 'Seller (Green Valley Farm)',
    status: 'Validated via Demo Adapter',
    ratingGiven: 4.7,
    network: 'Solana Devnet'
  }
];

export const solanaTrustService = {
  /**
   * Fetches the current pending demo transaction
   */
  async getTransactionDetails() {
    return { ...INITIAL_DEMO_TRANSACTION };
  },

  /**
   * Executes validation interaction against Solana Devnet
   * Queries real Solana Devnet RPC for cluster status & blockhash,
   * then updates status via the demo adapter without faking private keys.
   */
  async verifyTransaction(txId) {
    let devnetBlockhash = '4uQeVj5tqViQh7yWWbStnEGpKkWuePAGTzZ...';
    let devnetSlot = 328491020;
    let rpcAvailable = false;

    try {
      // Query live Solana Devnet RPC for real cluster blockhash
      const res = await fetch(SOLANA_DEVNET_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getLatestBlockhash',
          params: [{ commitment: 'confirmed' }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.result && data.result.value) {
          devnetBlockhash = data.result.value.blockhash;
          devnetSlot = data.result.context.slot;
          rpcAvailable = true;
        }
      }
    } catch (err) {
      console.warn('[Solana Devnet RPC Warning] Falling back to offline demo telemetry:', err);
    }

    // Return structured validation result
    return {
      status: 'Validated via Demo Adapter',
      deterministicTxId: INITIAL_DEMO_TRANSACTION.deterministicTxId,
      network: 'Solana Devnet',
      verifiedAt: new Date().toISOString(),
      rpcAvailable,
      blockhash: devnetBlockhash,
      slot: devnetSlot,
      adapterNotice: 'Transaction simulated and verified through TazaaConnect Solana Devnet Demo Adapter. No live wallet private key was required.'
    };
  },

  /**
   * Returns reputation and past transaction history
   */
  async getReputationHistory() {
    return [...MOCK_REPUTATION_HISTORY];
  }
};

export default solanaTrustService;
