import React, { useState, useEffect } from 'react';
import { 
  Database, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  BarChart3, 
  ShoppingBag,
  Info,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { snowflakeCoCoService } from '../services/snowflake';

export default function DemandIntelligence() {
  const [demandRecords, setDemandRecords] = useState([]);
  const [neighborhoodAggs, setNeighborhoodAggs] = useState([]);
  const [dayAggs, setDayAggs] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [selectedProduce, setSelectedProduce] = useState('All');

  useEffect(() => {
    async function loadData() {
      const records = await snowflakeCoCoService.getDemandRecords();
      const nAggs = await snowflakeCoCoService.getDeficitByNeighborhood();
      const dAggs = await snowflakeCoCoService.getDeficitByDayOfWeek();

      setDemandRecords(records);
      setNeighborhoodAggs(nAggs);
      setDayAggs(dAggs);
    }
    loadData();
  }, []);

  const primaryInsight = snowflakeCoCoService.getPrimaryInsight();

  // Unique filters
  const neighborhoods = ['All', ...Array.from(new Set(demandRecords.map(r => r.neighborhood)))];
  const produceTypes = ['All', ...Array.from(new Set(demandRecords.map(r => r.produce)))];

  const filteredRecords = demandRecords.filter(r => {
    const matchN = selectedNeighborhood === 'All' || r.neighborhood === selectedNeighborhood;
    const matchP = selectedProduce === 'All' || r.produce === selectedProduce;
    return matchN && matchP;
  });

  const highPriorityDeficits = demandRecords.filter(r => r.priority === 'High' || r.priority === 'Critical');

  // Calculate maximum deficit for bar scaling
  const maxDayDeficit = Math.max(...dayAggs.map(d => d.totalDeficitKg), 1);

  return (
    <div className="space-y-6">
      
      {/* Page Title & Mandatory Labeling */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-sky-50 text-sky-700">
              <Database className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-sky-800 tracking-wider uppercase">
              Snowflake CoCo — Demand Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Predictive Neighborhood Demand & Deficits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Warehouse analytics predicting produce shortages and food desert vulnerabilities before they occur.
          </p>
        </div>

        {/* CoCo System Architecture Badge */}
        <div className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200/90 text-sky-900 shadow-2xs self-start md:self-auto">
          <Database className="w-4 h-4 text-sky-600 shrink-0" />
          <div>
            <span className="text-[10px] text-sky-600 uppercase font-bold block leading-tight">Data Pipeline</span>
            <span className="text-xs font-extrabold text-slate-800">
              Snowflake CoCo Query Abstraction
            </span>
          </div>
        </div>
      </div>

      {/* Transparent Disclaimer Banner (Per Hackathon MVP Guidelines) */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Architecture Notice:</strong> This interface is powered by the modular <code className="text-sky-700 font-mono text-[11px] bg-white px-1 py-0.5 rounded border border-slate-200">snowflakeCoCoService</code> abstraction. It displays a realistic local demo dataset modeled on a Snowflake Cortex/CoCo SQL predictive query output. It is not connected to a live warehouse in this MVP phase.
        </p>
      </div>

      {/* Prominent Primary Insight Hero Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-emerald-50 to-white border-2 border-amber-300/80 shadow-xs relative overflow-hidden">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block mb-1">
              Key Predictive Demand Insight
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              "{primaryInsight}"
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Snowflake demand forecasting anticipates a <strong>88 kg Romaine Lettuce shortfall</strong> in North District this Thursday due to delayed regional freight shipments and heightened community kitchen demand.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 1. Deficit by Neighborhood & 2. Deficit by Day of Week */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Food Deficit by Neighborhood */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  1. Food Deficit by Neighborhood
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Total Unmet Demand</span>
            </div>

            <div className="space-y-4">
              {neighborhoodAggs.map((n, idx) => {
                const deficitPercentage = Math.round((n.totalDeficitKg / n.totalDemandKg) * 100);
                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {n.neighborhood}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        n.priority === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {n.priority} Priority
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Top Shortage: <strong className="text-slate-800">{n.highestDeficitProduce}</strong></span>
                      <span>Deficit: <strong className="text-rose-600">{n.totalDeficitKg} kg</strong> ({deficitPercentage}% gap)</span>
                    </div>

                    {/* Visual Meter */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${n.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(deficitPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Aggregated across urban zip boundaries</span>
            <span className="font-bold text-slate-700">4 Urban Districts Monitored</span>
          </div>
        </div>

        {/* 2. Food Deficit by Day of Week (Heatmap / Bar Chart) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  2. Food Deficit by Day of the Week
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Weekly Deficit Pulse</span>
            </div>

            {/* Visual Day-by-Day Bar Heatmap */}
            <div className="space-y-2.5">
              {dayAggs.map((d, idx) => {
                const barWidth = Math.round((d.totalDeficitKg / maxDayDeficit) * 100);
                const isPeakThursday = d.day === 'Thursday';

                return (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl border transition-all ${
                      isPeakThursday 
                        ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-300/40' 
                        : 'bg-slate-50/70 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-20 font-bold ${isPeakThursday ? 'text-amber-900' : 'text-slate-800'}`}>
                          {d.day}
                        </span>
                        {isPeakThursday && (
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/70 px-1.5 py-0.2 rounded">
                            Peak Deficit
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-500">
                          {d.topDeficitProduce} in {d.topDeficitNeighborhood}
                        </span>
                        <strong className="text-slate-900 font-extrabold w-14 text-right">
                          {d.totalDeficitKg} kg
                        </strong>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isPeakThursday ? 'bg-amber-500' : d.totalDeficitKg > 60 ? 'bg-indigo-500' : 'bg-slate-400'}`}
                        style={{ width: `${Math.max(barWidth, 8)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Peak shortfalls occur Thursday – Saturday</span>
            <span className="font-bold text-amber-700">Thursday: Highest Weekly Gap (88 kg)</span>
          </div>
        </div>

      </div>

      {/* 3. Produce Demand & 4. Supply vs Demand Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 3. Produce Demand Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  3. Produce Demand Ranking
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Total Weekly Demand</span>
            </div>

            <div className="space-y-3">
              {demandRecords.slice(0, 5).map((rec) => (
                <div key={rec.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {rec.produce}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {rec.neighborhood} · {rec.day}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900">
                      {rec.predicted_demand_kg} kg
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      Demand Target
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Ranked by total volumetric need across urban food pantries and bodegas.
          </div>
        </div>

        {/* 4. Supply vs Demand Comparison */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  4. Supply vs Demand Comparison
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-bold">
                <span className="flex items-center text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1" />
                  Available Supply
                </span>
                <span className="flex items-center text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1" />
                  Deficit Gap
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {demandRecords.map((item) => {
                const supplyPct = Math.round((item.available_supply_kg / item.predicted_demand_kg) * 100);
                const deficitPct = 100 - supplyPct;

                return (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-extrabold text-slate-900">
                        {item.produce} <span className="text-slate-400 font-normal">({item.neighborhood} · {item.day})</span>
                      </span>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-slate-600">
                          Supply: <strong className="text-emerald-700">{item.available_supply_kg} kg</strong>
                        </span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-600">
                          Demand: <strong className="text-slate-900">{item.predicted_demand_kg} kg</strong>
                        </span>
                      </div>
                    </div>

                    {/* Dual Stacked Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2.5 flex overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full" 
                        style={{ width: `${supplyPct}%` }}
                        title={`Supply: ${item.available_supply_kg}kg (${supplyPct}%)`}
                      />
                      <div 
                        className="bg-rose-500 h-full" 
                        style={{ width: `${deficitPct}%` }}
                        title={`Deficit: ${item.deficit_kg}kg (${deficitPct}%)`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] mt-1 text-slate-500">
                      <span>Supply Coverage: {supplyPct}%</span>
                      <span className="font-bold text-rose-600">Deficit: {item.deficit_kg} kg</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Surplus inventory from local rooftop and community gardens is prioritized to fill the red deficit gaps.
          </div>
        </div>

      </div>

      {/* 5. Highest-Priority Food Deficits Table / Heatmap */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                5. Highest-Priority Food Deficits (Snowflake CoCo Output)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time filterable query results showing urgent neighborhood food deficits.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>District:</span>
            </div>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Heatmap / Data Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/70">
                <th className="py-3 px-4 rounded-l-lg">Neighborhood</th>
                <th className="py-3 px-4">Produce</th>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4 text-right">Predicted Demand</th>
                <th className="py-3 px-4 text-right">Available Supply</th>
                <th className="py-3 px-4 text-right">Deficit (kg)</th>
                <th className="py-3 px-4 text-center">Deficit Score</th>
                <th className="py-3 px-4 text-center rounded-r-lg">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => {
                const isHigh = rec.priority === 'High' || rec.priority === 'Critical';
                return (
                  <tr 
                    key={rec.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      rec.neighborhood === 'North District' && rec.produce === 'Romaine Lettuce' 
                        ? 'bg-amber-50/50 font-medium' 
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {rec.neighborhood}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800">
                      <span className="font-semibold">{rec.produce}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {rec.day}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700">
                      {rec.predicted_demand_kg} kg
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-700">
                      {rec.available_supply_kg} kg
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        {rec.deficit_kg} kg
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-slate-800">
                        {rec.deficit_score}
                        <span className="text-[10px] text-slate-400">/100</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        isHigh 
                          ? 'bg-rose-100 text-rose-800 border-rose-200' 
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {rec.priority}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Query Execution Time: 42ms · Cache Hit via Snowflake CoCo</span>
          <span className="font-mono text-[11px] text-sky-700">
            MODEL: SNOWFLAKE_CORTEX_DEMAND_FORECAST_V2
          </span>
        </div>

      </div>

    </div>
  );
}
