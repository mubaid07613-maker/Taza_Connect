import React from 'react';
import TrustSection from '../components/TrustSection';
import { ShieldCheck, Layers, Lock, Award, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrustTransactions() {
  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-emerald-800 tracking-wider uppercase">
              Decentralized Trust & Provenance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Trust & Transactions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verifiable seller/buyer credentials, micro-escrow validation, and on-chain reputation for local food deliveries.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900 shadow-2xs">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Solana Devnet Demo Adapter</span>
        </div>
      </div>

      {/* Main Trust Section Component (Shows Seller, Buyer, Transaction, Verify button, History) */}
      <TrustSection />

      {/* Architectural Explainer: Replacing Demo Adapter with Real Solana Program */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
        <h3 className="text-base font-extrabold text-slate-900 mb-2">
          Modular Solana Service Architecture
        </h3>
        <p className="text-xs text-slate-500 mb-5 max-w-3xl leading-relaxed">
          TazaaConnect abstracts transaction execution through the <code className="font-mono text-indigo-700 bg-slate-100 px-1.5 py-0.5 rounded">solanaTrustService</code> boundary. In production, this demo adapter swaps cleanly with an Anchor program or Solana Pay micro-escrow instruction without refactoring the UI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <KeyRound className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Verifiable Credentials
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Green Valley Urban Farm and Corner Market #104 hold cryptographic identity records ensuring mutual accountability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-emerald-600 mb-2">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Micro-Escrow Contract
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The $60 payment for 50 kg of Romaine Lettuce is locked in a condition-based escrow released upon Gemma 4 inspection.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-teal-600 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Immutable Reputation
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every completed delivery increments on-chain reputation scores (currently 4.8/5 and 4.7/5), building trust for local credit lines.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
