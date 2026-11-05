import React from 'react';
import GemmaProduceInspector from '../components/GemmaProduceInspector';
import { Sparkles, Cpu, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

export default function ProduceInspector() {
  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-indigo-800 tracking-wider uppercase">
              AI Freshness Verification Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            AI Produce Inspector
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated visual grading, defect detection, and shelf-life prediction powered by Google Gemma 4.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 text-xs font-bold text-slate-800 shadow-2xs">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span>Powered by Gemma 4</span>
        </div>
      </div>

      {/* Main Inspector Component */}
      <GemmaProduceInspector />

      {/* Gemma 4 Inspection Protocol Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs uppercase mb-1">
            <Zap className="w-4 h-4" />
            <span>Cellular Firmness & Brix</span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">
            Turgor Pressure Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Computer vision analyzes skin tension, surface light reflection, and color spectrum histograms to verify water retention and ripeness.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Micro-Defect Scoring</span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">
            Automated Rejection Thresholds
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Flags fungal spotting, transport bruising, and stem decay to ensure bodegas never receive spoiled, non-saleable produce.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Smart Shelf-Life Estimation</span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">
            Predictive Window
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Projects remaining optimal selling days (typically 5 to 8 days) so store owners can price and rotate inventory confidently.
          </p>
        </div>
      </div>

    </div>
  );
}
