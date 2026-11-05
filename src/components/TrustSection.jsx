import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Tractor, 
  Store, 
  ArrowRight, 
  Coins, 
  RefreshCw, 
  Info,
  ExternalLink,
  History,
  Star
} from 'lucide-react';
import { 
  solanaTrustService, 
  INITIAL_DEMO_TRANSACTION, 
  MOCK_REPUTATION_HISTORY 
} from '../services/solana';

export default function TrustSection() {
  const [transaction, setTransaction] = useState(INITIAL_DEMO_TRANSACTION);
  const [history, setHistory] = useState(MOCK_REPUTATION_HISTORY);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleVerifyTransaction = async () => {
    setIsValidating(true);
    try {
      const result = await solanaTrustService.verifyTransaction(transaction.id);
      setValidationResult(result);
      setTransaction(prev => ({
        ...prev,
        status: result.status,
        validationDetails: result
      }));
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setIsValidating(false);
    }
  };

  const isVerified = transaction.status === 'Validated via Demo Adapter';

  return (
    <div className="space-y-6">
      
      {/* Primary Section Header & Label */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-black text-emerald-800 tracking-wider uppercase">
                Trust & Transactions Layer
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Solana Devnet Micro-Escrow Validation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Decentralized producer/buyer verification and micro-transaction proof for hyper-local food deliveries.
            </p>
          </div>

          {/* Mandatory Demo / Devnet Label */}
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-900 shadow-2xs self-start md:self-auto">
            <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-[10px] text-indigo-600 uppercase font-bold block leading-tight">Adapter Mode</span>
              <span className="text-xs font-extrabold text-slate-900">
                Demo / Devnet Transaction
              </span>
            </div>
          </div>
        </div>

        {/* Clear Explanation Banner (Do NOT fake a real blockchain confirmation) */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Demo Adapter Notice:</strong> This interface uses the <code className="text-indigo-700 font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-slate-200">solanaTrustService</code> demo adapter. It queries live Solana Devnet RPC telemetry (cluster blockhash & slot) without requiring local private key setup or wallet signing. It does not fake a real on-chain transaction or label it as confirmed mainnet/devnet state.
          </p>
        </div>

        {/* Main Transaction Card: Seller, Buyer, Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-6">
          
          {/* SELLER */}
          <div className="md:col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Seller
                </span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                  {transaction.seller.status}
                </span>
              </div>

              <div className="flex items-center space-x-2.5 mt-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Tractor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {transaction.seller.name}
                  </h3>
                  <span className="text-[11px] text-slate-500">Urban Agricultural Producer</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center">
                  <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" />
                  Reputation:
                </span>
                <strong className="text-slate-900 font-bold text-sm">
                  {transaction.seller.reputation}
                </strong>
              </div>
            </div>

            <div className="mt-3 text-[10px] font-mono text-slate-400 bg-white p-2 rounded border border-slate-200/60 truncate">
              Addr: {transaction.seller.walletAddress}
            </div>
          </div>

          {/* BUYER */}
          <div className="md:col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Buyer
                </span>
                <span className="inline-flex items-center text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-indigo-600" />
                  {transaction.buyer.status}
                </span>
              </div>

              <div className="flex items-center space-x-2.5 mt-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {transaction.buyer.name}
                  </h3>
                  <span className="text-[11px] text-slate-500">Local Bodega / Corner Grocer</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center">
                  <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" />
                  Reputation:
                </span>
                <strong className="text-slate-900 font-bold text-sm">
                  {transaction.buyer.reputation}
                </strong>
              </div>
            </div>

            <div className="mt-3 text-[10px] font-mono text-slate-400 bg-white p-2 rounded border border-slate-200/60 truncate">
              Addr: {transaction.buyer.walletAddress}
            </div>
          </div>

          {/* TRANSACTION SUMMARY & ACTION */}
          <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Transaction
                </span>
                <span className="text-[10px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  Network: {transaction.network}
                </span>
              </div>

              <div className="my-2">
                <span className="text-xs text-slate-400 block font-medium">Allocated Produce:</span>
                <span className="text-base font-extrabold text-white">
                  {transaction.produce} · {transaction.quantity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Unit Price</span>
                  <span className="font-bold text-emerald-400">{transaction.unitPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Total Amount</span>
                  <span className="font-extrabold text-white text-base">{transaction.total}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  isVerified 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={handleVerifyTransaction}
                disabled={isValidating || isVerified}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 ${
                  isVerified
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : isValidating
                    ? 'bg-slate-700 text-slate-300 cursor-wait'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-white font-extrabold hover:scale-[1.01]'
                }`}
              >
                {isValidating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Querying Solana Devnet RPC...</span>
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Transaction Verified (Demo Adapter)</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify Transaction</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Deterministic Demo Transaction ID & Telemetry Breakdown */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Deterministic Demo Transaction ID:
              </span>
              <span className="font-mono text-slate-800 text-xs font-bold break-all">
                {transaction.deterministicTxId}
              </span>
            </div>
            
            {validationResult && (
              <div className="text-right shrink-0">
                <span className="text-[10px] text-emerald-700 font-bold block">
                  Devnet Slot: {validationResult.slot}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Blockhash: {validationResult.blockhash.slice(0, 16)}...
                </span>
              </div>
            )}
          </div>

          {validationResult && (
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span className="text-emerald-800 font-medium flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                Live cluster response verified from <code className="font-mono ml-1 text-slate-700">api.devnet.solana.com</code>
              </span>
              <span className="text-slate-400 text-[10px]">
                Timestamp: {new Date(validationResult.verifiedAt).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Simple Reputation & Transaction History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              Reputation & Transaction History
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Green Valley Urban Farm Record
          </span>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/70">
                <th className="py-2.5 px-3 rounded-l-lg">Date</th>
                <th className="py-2.5 px-3">Produce Item</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Counterparty</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3 text-center rounded-r-lg">Validation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((hist) => (
                <tr key={hist.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-600">
                    {hist.date}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {hist.produce}
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-semibold">
                    {hist.quantity}
                  </td>
                  <td className="py-3 px-3 text-slate-800">
                    {hist.counterparty}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-emerald-700">
                    {hist.total}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-800">
                    ★ {hist.ratingGiven.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
                      {hist.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Overall Farm Trust Rating: <strong>4.8 / 5.0 (99.4% on-time fulfillment)</strong></span>
          <span className="text-[11px] text-slate-400">
            Adapter: TazaaConnect-Solana-Trust-V1
          </span>
        </div>

      </div>

    </div>
  );
}
