import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ProduceInspector from './pages/ProduceInspector';
import DemandIntelligence from './pages/DemandIntelligence';
import SmartMatching from './pages/SmartMatching';
import TrustTransactions from './pages/TrustTransactions';
import { Menu, Sprout, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard'); // Dashboard is default page
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={(page) => setActivePage(page)} />;
      case 'marketplace':
        return <Marketplace />;
      case 'inspector':
        return <ProduceInspector />;
      case 'demand':
        return <DemandIntelligence />;
      case 'matching':
        return <SmartMatching />;
      case 'trust':
        return <TrustTransactions />;
      default:
        return <Dashboard onNavigate={(page) => setActivePage(page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header / App Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 inline-block">
                Hyper-Local Food Ecosystem
              </span>
              <p className="text-xs text-slate-500 font-medium hidden sm:block mt-0.5">
                Connecting local surplus with neighborhoods that need fresh food.
              </p>
            </div>
          </div>

          {/* Right Status Badges */}
          <div className="flex items-center space-x-3">
            
            {/* Live System Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-800">
                System Online
              </span>
            </div>

            {/* Gemma 4 Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gemma 4</span>
            </div>

            {/* Solana Escrow Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Solana Trust</span>
            </div>

          </div>

        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-semibold text-slate-700">
              TazaaConnect — Hackathon Phase 1 Foundation
            </span>
            <span className="text-slate-400 text-[11px]">
              Gemma 4 · Snowflake · Solana (Clean Architecture Boundaries Prepared)
            </span>
          </div>
        </footer>

      </div>

    </div>
  );
}
