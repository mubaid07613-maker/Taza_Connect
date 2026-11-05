import React from 'react';
import { Tractor, Scale, MapPin, Zap, TrendingUp } from 'lucide-react';
import { MOCK_KPIS } from '../data/mockData';

export default function KpiCards() {
  const cards = [
    {
      title: 'Active Farms',
      value: MOCK_KPIS.activeFarms.value,
      sub: MOCK_KPIS.activeFarms.label,
      badge: MOCK_KPIS.activeFarms.change,
      icon: Tractor,
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Available Surplus',
      value: MOCK_KPIS.availableSurplus.value,
      sub: MOCK_KPIS.availableSurplus.label,
      badge: MOCK_KPIS.availableSurplus.change,
      icon: Scale,
      color: 'text-emerald-700',
      bgLight: 'bg-emerald-50/70',
      borderColor: 'border-emerald-100',
      badgeBg: 'bg-emerald-100/70 text-emerald-800 border-emerald-200'
    },
    {
      title: 'Food Deficit Zones',
      value: MOCK_KPIS.deficitZones.value,
      sub: MOCK_KPIS.deficitZones.label,
      badge: MOCK_KPIS.deficitZones.change,
      icon: MapPin,
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-100',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      title: 'Active Matches',
      value: MOCK_KPIS.activeMatches.value,
      sub: MOCK_KPIS.activeMatches.label,
      badge: MOCK_KPIS.activeMatches.change,
      icon: Zap,
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-5 border ${card.borderColor} shadow-xs hover:shadow-md transition-shadow relative overflow-hidden`}
          >
            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl ${card.bgLight} ${card.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
            </div>

            {/* Context Subtitle & Change Badge */}
            <div className="mt-2.5 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
              <span className="text-slate-500 truncate mr-2" title={card.sub}>
                {card.sub}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${card.badgeBg} shrink-0`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
