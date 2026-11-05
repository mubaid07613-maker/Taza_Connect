import React from 'react';
import KpiCards from '../components/KpiCards';
import CoreJourneyBanner from '../components/CoreJourneyBanner';
import TodaysDeficitsSection from '../components/TodaysDeficitsSection';
import RecommendedMatchSection from '../components/RecommendedMatchSection';
import { ArrowRight, Sparkles, Store, ShieldCheck, Zap } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="space-y-6">
      
      {/* Welcome & Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Marketplace Command Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time surplus routing from urban farms to neighborhood food deserts.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigate('inspector')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Inspect Produce</span>
          </button>

          <button
            onClick={() => onNavigate('marketplace')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-600/20 transition-all flex items-center space-x-1.5"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Browse Surplus</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Active Farms: 24, Available Surplus: 1,840 kg, Food Deficit Zones: 7, Active Matches: 18) */}
      <KpiCards />

      {/* Core User Journey Architecture Banner */}
      <CoreJourneyBanner />

      {/* Top Proximity Recommended Match Spotlight */}
      <RecommendedMatchSection />

      {/* Today's Fresh Food Deficits Section (Requirement 5) */}
      <TodaysDeficitsSection onSelectNeighborhood={() => onNavigate('demand')} />

      {/* Quick Navigation Footprint */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => onNavigate('inspector')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
            <span>AI Produce Inspector</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Grade farm harvest freshness and remaining shelf-life powered by Gemma 4 vision.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('demand')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
            <span>Demand Intelligence</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Track 7 monitored deficit zones and calculate unmet community nutritional demand.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('trust')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
            <span>Trust & Transactions</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            View decentralized producer credentials and Solana smart micro-escrow status.
          </p>
        </div>

      </div>

    </div>
  );
}
