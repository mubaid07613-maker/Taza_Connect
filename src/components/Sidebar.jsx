import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Sprout, 
  CheckCircle2,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'marketplace', label: 'Marketplace', icon: Store, badge: '6 Batches' },
  { id: 'inspector', label: 'AI Produce Inspector', icon: Sparkles, badge: 'Gemma 4' },
  { id: 'demand', label: 'Demand Intelligence', icon: TrendingUp, badge: '7 Zones' },
  { id: 'matching', label: 'Smart Matching', icon: Zap, badge: '98% Top' },
  { id: 'trust', label: 'Trust & Transactions', icon: ShieldCheck, badge: 'Solana' }
];

export default function Sidebar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Brand Header */}
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Tazaa<span className="text-emerald-400">Connect</span>
                </span>
                <span className="block text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">
                  Hyper-Local Surplus
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* System Online Status Pill */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/70">
              <div className="flex items-center space-x-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  System Online
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                MVP v0.1
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
              Hackathon Scope
            </span>
            <p className="text-slate-300 text-[11px] mt-1 leading-snug">
              Connecting urban farms with underserved local neighborhood grocers.
            </p>
          </div>
        </div>

      </aside>
    </>
  );
}
