import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Leaf, 
  Award, 
  Scale, 
  ShieldCheck, 
  Building2, 
  Tractor,
  Sparkles
} from 'lucide-react';
import { MOCK_RECOMMENDED_MATCH } from '../data/mockData';

export default function RecommendedMatchSection() {
  const match = MOCK_RECOMMENDED_MATCH;
  const [matchStatus, setMatchStatus] = useState('ready'); // 'ready' | 'locked'

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/20 to-slate-50 rounded-2xl border-2 border-emerald-500/30 shadow-sm p-6 mb-8 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Top Banner / Match Score */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-emerald-200/60 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
              <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </span>
            <span className="text-xs font-black tracking-wider uppercase text-emerald-800">
              Smart Proximity Engine Recommendation
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            Optimal Farm-to-Store Match
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Algorithmic alignment balancing shortest logistics route, produce urgency, and community nutrition deficit.
          </p>
        </div>

        {/* 98% Match Score Badge */}
        <div className="flex items-center space-x-3 bg-white px-4 py-2.5 rounded-2xl border border-emerald-300 shadow-xs self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-xs">
            {match.matchScore}%
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Match Score
            </span>
            <span className="text-sm font-extrabold text-slate-800">
              {match.algorithmRating}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Pairing Flow Card */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 my-6 items-stretch">
        
        {/* Left: Farm Side */}
        <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                <Tractor className="w-3.5 h-3.5" />
                <span>Urban Producer</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {match.farm.distance}
              </span>
            </div>
            
            <h3 className="text-base font-extrabold text-slate-900">
              {match.farm.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Managed by {match.farm.operator}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Reputation Score:</span>
              <strong className="text-emerald-700 font-bold">{match.farm.reputation}/100</strong>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-slate-500">Solana Credential:</span>
              <span className="text-emerald-600 font-semibold">{match.farm.solanaBadge}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
            <span>Surplus verified ready for same-day harvest pickup</span>
          </div>
        </div>

        {/* Center: Logistics & Transfer Badge */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 mb-2">
            <ArrowRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800">
            {match.farm.distance}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            8 min local route
          </span>
          <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Zero Interstate Transit
          </span>
        </div>

        {/* Right: Store Buyer Side */}
        <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-[11px] font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Store Buyer</span>
              </span>
              <span className="text-[11px] text-rose-600 font-bold">
                Critical Deficit Zone
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              {match.buyer.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Owner: {match.buyer.owner} · {match.buyer.neighborhood}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Reputation Score:</span>
              <strong className="text-emerald-700 font-bold">{match.buyer.reputation}/100</strong>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-slate-500">Buyer Status:</span>
              <span className="text-indigo-600 font-semibold">{match.buyer.solanaBadge}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mr-1.5 shrink-0" />
            <span>Pre-approved micro-inventory financing</span>
          </div>
        </div>

      </div>

      {/* Produce & Transaction Details Grid */}
      <div className="relative z-10 bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Produce Item
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {match.produce}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Allocated Quantity
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {match.quantity}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Surplus Price / kg
            </span>
            <span className="text-sm font-extrabold text-emerald-600">
              ${match.pricePerKg.toFixed(2)}
              <span className="text-xs text-slate-400 line-through ml-1 font-normal">
                ${match.commercialMarketPrice.toFixed(2)}
              </span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Store Savings
            </span>
            <span className="text-sm font-extrabold text-emerald-700">
              51% Discount
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Quality Grade
            </span>
            <span className="text-sm font-extrabold text-slate-900 flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 mr-1" />
              96/100 (Gemma 4)
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
              Carbon Offset
            </span>
            <span className="text-sm font-extrabold text-emerald-700 flex items-center">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 mr-1" />
              38.4 kg CO2e
            </span>
          </div>

        </div>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            <strong className="text-slate-800">Match Rationale:</strong> {match.matchReason}
          </p>

          <div className="flex items-center space-x-3 shrink-0">
            {matchStatus === 'ready' ? (
              <button
                onClick={() => setMatchStatus('locked')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accept Smart Match & Lock Escrow</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Match Accepted · Solana Escrow Initialized</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
