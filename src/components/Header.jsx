import React from 'react';
import { Sprout, ShieldCheck, Activity, Cpu, Sparkles } from 'lucide-react';

export default function Header({ onQuickScroll }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-4 ring-emerald-50">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Tazaa<span className="text-emerald-600">Connect</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  MVP v0.1
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-tight">
                Connecting local surplus with neighborhoods that need fresh food.
              </p>
            </div>
          </div>

          {/* Status Indicator & Future Tech Badges */}
          <div className="flex items-center space-x-4">
            
            {/* System Online Beacon */}
            <div className="flex items-center space-x-2.5 px-3 py-1.5 bg-emerald-50/80 border border-emerald-200/90 rounded-full shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                System Online
              </span>
            </div>

            {/* Gemma 4 Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100/90 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gemma 4 Vision</span>
            </div>

            {/* Solana Trust Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100/90 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Solana Trust Layer</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
