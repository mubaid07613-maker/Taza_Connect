import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  Filter,
  Check,
  ShoppingBag
} from 'lucide-react';
import { MOCK_MARKETPLACE_LISTINGS } from '../data/mockData';

export default function MarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [requestedId, setRequestedId] = useState(null);

  const categories = ['All', 'Vegetables', 'Leafy Greens', 'Fruits', 'Root Vegetables'];

  const filteredListings = selectedCategory === 'All' 
    ? MOCK_MARKETPLACE_LISTINGS 
    : MOCK_MARKETPLACE_LISTINGS.filter(item => item.category === selectedCategory);

  const handleRequest = (id) => {
    setRequestedId(id);
    setTimeout(() => {
      setRequestedId(null);
    }, 2500);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 mb-8">
      
      {/* Section Header & Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Hyper-Local Direct Listings
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Surplus Produce Marketplace
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified local farm surplus offered at discounted wholesale rates directly to neighborhood corner grocers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredListings.map((item) => {
          const isJustRequested = requestedId === item.id;
          const discountPct = Math.round(((item.commercialPrice - item.pricePerKg) / item.commercialPrice) * 100);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Image & Badges */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Harvest Time Pill */}
                <div className="absolute top-2.5 left-2.5 inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                  <Clock className="w-3 h-3 mr-1 text-emerald-400" />
                  {item.harvestTime}
                </div>

                {/* Savings Pill */}
                <div className="absolute top-2.5 right-2.5 inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500 text-white shadow-xs">
                  Save {discountPct}%
                </div>

                {/* Gemma Verification Badge */}
                <div className="absolute bottom-2.5 left-2.5 inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Gemma 4: {item.qualityScore}% Quality</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1 line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Origin:</span>
                      <strong className="text-slate-800">{item.farm}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Distance:</span>
                      <span className="text-slate-700 flex items-center">
                        <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                        {item.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Available Batch:</span>
                      <strong className="text-slate-800">{item.quantity}</strong>
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wholesale Rate</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-lg font-black text-emerald-600">
                        ${item.pricePerKg.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400">/kg</span>
                      <span className="text-xs text-slate-400 line-through ml-1">
                        ${item.commercialPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRequest(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
                      isJustRequested
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isJustRequested ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Allocated!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Request Match</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
