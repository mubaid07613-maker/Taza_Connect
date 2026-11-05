import React from 'react';
import MarketplaceSection from '../components/MarketplaceSection';
import { Store, ShoppingCart, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export default function Marketplace() {
  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
              B2B Fresh Food Marketplace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Surplus Produce Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Direct access to verified surplus batches harvested by local urban farms within a 3-mile delivery radius.
          </p>
        </div>

        {/* Info Highlights */}
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Gemma 4 Verified Fresh</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs flex items-center space-x-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sub-2hr Dispatch</span>
          </div>
        </div>
      </div>

      {/* Main Marketplace Component */}
      <MarketplaceSection />

      {/* Wholesale Guarantees Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            40% - 60% Wholesale Discount
          </h4>
          <p className="text-xs text-slate-500">
            Priced dynamically to ensure urban growers recover harvest costs while enabling low-margin corner stores to profit.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Gemma 4 Quality Audited
          </h4>
          <p className="text-xs text-slate-500">
            Every batch undergoes automated visual brix and defect verification prior to listing on the network.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Zero Interstate Emissions
          </h4>
          <p className="text-xs text-slate-500">
            Produce travels less than 3 miles from urban soil to store shelves, eliminating long-haul refrigerated trucking.
          </p>
        </div>
      </div>

    </div>
  );
}
