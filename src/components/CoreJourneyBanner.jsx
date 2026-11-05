import React from 'react';
import { 
  Tractor, 
  Apple, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Handshake, 
  SlidersHorizontal 
} from 'lucide-react';

export default function CoreJourneyBanner() {
  const steps = [
    { label: 'Urban Farm', icon: Tractor, sub: 'Local Surplus', highlight: false },
    { label: 'Surplus Produce', icon: Apple, sub: 'Unsold Freshness', highlight: false },
    { label: 'AI Verification', icon: Sparkles, sub: 'Gemma 4 Quality', highlight: true },
    { label: 'Local Demand', icon: Building2, sub: 'Food Deserts', highlight: false },
    { label: 'Smart Matching', icon: SlidersHorizontal, sub: 'Proximity Engine', highlight: true },
    { label: 'Store Buyer', icon: Building2, sub: 'Corner Bodegas', highlight: false },
    { label: 'AI Negotiation', icon: Handshake, sub: 'Fair Micro-Pricing', highlight: false },
    { label: 'Trusted Transaction', icon: ShieldCheck, sub: 'Solana Escrow', highlight: true },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div>
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Automated Pipeline Architecture
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">
            The TazaaConnect Hyper-Local Value Loop
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md">
          Diverting perishable agricultural surplus to neighborhood corner stores with sub-2-mile zero-waste dispatch.
        </p>
      </div>

      {/* Horizontal Steps */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/50 transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 ${
                step.highlight 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs' 
                  : 'bg-slate-700/60 text-slate-300'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white leading-tight">
                {step.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {step.sub}
              </span>

              {/* Arrow separator for larger screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
