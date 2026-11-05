import React from 'react';
import RecommendedMatchSection from '../components/RecommendedMatchSection';
import { Zap, SlidersHorizontal, Navigation, Leaf, DollarSign, Clock } from 'lucide-react';
import { MOCK_RECOMMENDED_MATCH } from '../data/mockData';

export default function SmartMatching() {
  const match = MOCK_RECOMMENDED_MATCH;

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
              <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </span>
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
              Algorithmic Proximity Solver
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Smart Matching Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pairing surplus urban farm inventory with high-need neighborhood stores using multi-objective constraints.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>Solver: Proximity + Freshness Max</span>
        </div>
      </div>

      {/* Main Recommended Match Spotlight Component */}
      <RecommendedMatchSection />

      {/* Multi-Objective Algorithm Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
        <h3 className="text-base font-extrabold text-slate-900 mb-4">
          How the 98% Match Score is Calculated
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-emerald-600 mb-2">
              <Navigation className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Ultra-Low Transit (40%)</span>
            </div>
            <p className="text-xs text-slate-600">
              Farm is 1.2 miles from the corner store. Total transit is 8 minutes, preventing heat shock and produce decay.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">2. Urgent Freshness (30%)</span>
            </div>
            <p className="text-xs text-slate-600">
              Harvested 6 hours ago with 96/100 Gemma 4 verified score. Optimal for retail sale within 24 hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-rose-600 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">3. Deficit Priority (20%)</span>
            </div>
            <p className="text-xs text-slate-600">
              South Ward 4 has an acute 92/100 deficit score with 2.8 miles to nearest supermarket, maximizing impact.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center space-x-2 text-teal-600 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">4. Fair Margin (10%)</span>
            </div>
            <p className="text-xs text-slate-600">
              $1.65/kg surplus price provides 51% wholesale savings for the corner store while fully recovering farm costs.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
