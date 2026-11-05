import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  ShoppingBag, 
  Store, 
  Users, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { MOCK_TODAYS_DEFICITS } from '../data/mockData';

export default function TodaysDeficitsSection({ onSelectNeighborhood }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
              Immediate Food Desert Gaps
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Today's Fresh Food Deficits
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Neighborhoods currently experiencing acute fresh produce shortages with high local retail demand.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Updated 12 mins ago</span>
        </div>
      </div>

      {/* Grid of Deficit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {MOCK_TODAYS_DEFICITS.map((item) => {
          const isCritical = item.priority === 'Critical Need';
          const isHigh = item.priority === 'High Priority';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isCritical 
                  ? 'border-rose-200 bg-rose-50/20 hover:border-rose-300' 
                  : isHigh 
                  ? 'border-amber-200 bg-amber-50/20 hover:border-amber-300' 
                  : 'border-slate-200 bg-slate-50/30 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Top Row: Neighborhood & Priority Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {item.neighborhood}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isCritical 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                      : isHigh 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {item.priority}
                  </span>
                </div>

                {/* Severity Score Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Deficit Index:</span>
                    <strong className="text-slate-800">{item.severityScore}/100</strong>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.severityScore}%` }}
                    />
                  </div>
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Unmet Today</span>
                    <strong className="text-slate-900 text-sm">{item.unmetTodayKg} kg</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Supermarket Dist</span>
                    <strong className="text-slate-900 text-sm">{item.distanceToSupermarketMiles} miles</strong>
                  </div>
                </div>

                {/* Demanded Produce Pills */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1.5">
                    Highest Requested Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.mostNeededProduce.map((prod, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-slate-200 text-slate-700"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Stores & Status */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center">
                  <Store className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  {item.participatingStores} Local Bodegas
                </span>
                <span className={`text-[11px] font-bold ${
                  item.status === 'Surplus Dispatched' 
                    ? 'text-emerald-700' 
                    : item.status === 'Matching in Progress' 
                    ? 'text-indigo-700' 
                    : 'text-slate-600'
                }`}>
                  {item.status}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
