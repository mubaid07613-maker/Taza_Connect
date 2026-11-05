import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Store, 
  ShoppingBag, 
  ArrowUpRight, 
  Database,
  CheckCircle2
} from 'lucide-react';
import { MOCK_DEFICIT_ZONES } from '../data/mockData';

export default function FoodDeficitSection({ onSelectZone }) {
  const [selectedZone, setSelectedZone] = useState(MOCK_DEFICIT_ZONES[0]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 mb-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
              Community Food Access Intelligence
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Neighborhood Food Deficit Zones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time neighborhood demand signals identifying acute fresh produce shortages and supermarket deserts.
          </p>
        </div>

        {/* Snowflake Pipeline Boundary Pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200/70 text-sky-800 text-xs font-semibold self-start md:self-auto">
          <Database className="w-3.5 h-3.5 text-sky-600" />
          <span>Snowflake Warehouse Feed (Mocked)</span>
        </div>
      </div>

      {/* Main Content: Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Side: Interactive Zone List */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Select Monitored Neighborhood
          </p>

          {MOCK_DEFICIT_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <div
                key={zone.id}
                onClick={() => {
                  setSelectedZone(zone);
                  if (onSelectZone) onSelectZone(zone);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/10 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-3 h-3 rounded-full ${zone.statusColor} shrink-0`} />
                    <span className="text-sm font-bold text-slate-900">
                      {zone.name}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    zone.deficitIndex >= 85 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                      : zone.deficitIndex >= 75
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {zone.priority}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Deficit Score: <strong className="text-slate-800">{zone.deficitIndex}/100</strong></span>
                  <span>Unmet Demand: <strong className="text-slate-800">{zone.unmetWeeklyProduceKg} kg/wk</strong></span>
                </div>

                {/* Progress Meter */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      zone.deficitIndex >= 85 ? 'bg-rose-500' : zone.deficitIndex >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${zone.deficitIndex}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Selected Zone Detailed Analytics */}
        <div className="lg:col-span-7 bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-200/70">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  Active Focus Area
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedZone.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-rose-600">
                  {selectedZone.deficitIndex}
                  <span className="text-xs text-slate-400 font-medium">/100</span>
                </span>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Deficit Severity</p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="flex items-center text-slate-400 text-xs mb-1">
                  <Users className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span>Residents</span>
                </div>
                <span className="text-base font-bold text-slate-800">
                  {selectedZone.population}
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="flex items-center text-slate-400 text-xs mb-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500" />
                  <span>Nearest Supermarket</span>
                </div>
                <span className="text-base font-bold text-slate-800">
                  {selectedZone.supermarketAccessMiles} miles
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="flex items-center text-slate-400 text-xs mb-1">
                  <Store className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Local Grocers</span>
                </div>
                <span className="text-base font-bold text-slate-800">
                  {selectedZone.activeStoresInNeed} stores
                </span>
              </div>
            </div>

            {/* High Demand Produce Items */}
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Most Urgently Requested Produce:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedZone.topDemandedProduce.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    <ShoppingBag className="w-3 h-3 text-emerald-600 mr-1.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Dispatch Recommendation Note */}
          <div className="mt-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>TazaaConnect Match:</strong> Skyline Rooftop Farm has 180 kg surplus tomatoes located just 1.2 miles away.
              </span>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-700 underline cursor-pointer hover:text-emerald-800 shrink-0 ml-2">
              Auto-Match Available →
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
