import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  CheckCircle, 
  Cpu, 
  AlertCircle, 
  RefreshCw, 
  Tag, 
  DollarSign, 
  Award, 
  Layers, 
  FileImage,
  Globe
} from 'lucide-react';
import { gemmaService } from '../services/gemma';
import { geminiService } from '../services/gemini';
import { GEMMA_SAMPLE_PREVIEWS } from '../data/mockData';

export default function GemmaProduceInspector() {
  const [imagePreview, setImagePreview] = useState(GEMMA_SAMPLE_PREVIEWS[0].image);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [aiEngine, setAiEngine] = useState('gemma'); // 'gemma' | 'gemini'
  const [lastUsedEngine, setLastUsedEngine] = useState('gemma');

  // File upload handler converting image to Base64
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setErrorMessage(null);
      setAnalysisResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert sample image URL to base64
  const handleSampleSelect = async (sample) => {
    setErrorMessage(null);
    setAnalysisResult(null);
    setImagePreview(sample.image);
  };

  // Execute AI Inspection
  const handleAnalyzeClick = async (forceEngine) => {
    if (!imagePreview) {
      setErrorMessage('Please select or upload a produce image first.');
      return;
    }

    const engineToUse = forceEngine || aiEngine;
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      // If the image is a remote URL, convert it to base64 first
      let base64Data = imagePreview;
      if (imagePreview.startsWith('http')) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

      let result = null;
      if (engineToUse === 'gemini') {
        result = await geminiService.inspectProduceWithGemini(base64Data);
        setLastUsedEngine('gemini');
      } else {
        result = await gemmaService.analyzeProduceWithGemma4(base64Data);
        setLastUsedEngine('gemma');
      }

      setAnalysisResult(result);
    } catch (err) {
      console.error('AI Produce Inspection Error:', err);
      if (engineToUse === 'gemma') {
        setErrorMessage('Local Gemma 4 could not be reached. Make sure Ollama is running.');
      } else {
        setErrorMessage(`Google Gemini API error: ${err.message}`);
      }
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 mb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Multimodal Vision Verification
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            AI Produce Inspector
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Instant grading of farm surplus to verify freshness, remaining shelf-life, and grocery viability before dispatch.
          </p>
        </div>

        {/* Engine Selector & Powered by Gemma 4 Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-auto">
          
          {/* Engine Selector Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setAiEngine('gemma')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
                aiEngine === 'gemma'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gemma 4 (Local)</span>
            </button>
            <button
              onClick={() => setAiEngine('gemini')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
                aiEngine === 'gemini'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gemini 3.5 (Cloud)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200/80 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-black text-slate-900 tracking-tight">
              Powered by Gemma 4
            </span>
          </div>

        </div>
      </div>

      {/* Main Grid: Upload Area on Left, Inspection Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Upload Area, Image Preview & Action Button */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Upload Dropzone & Image Preview */}
          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-50/70 transition-all flex flex-col items-center justify-center group min-h-[220px] overflow-hidden">
            
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Produce Preview" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  Click below to choose another image
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-6">
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800 mt-3">
                  Upload produce photo here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPEG, PNG, WEBP
                </p>
              </div>
            )}

            {/* Hidden Input for Real File Upload */}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="mt-3 block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 cursor-pointer"
            />
          </div>

          {/* Action Button: "Analyze with Gemma 4" */}
          <div>
            <button
              onClick={() => handleAnalyzeClick()}
              disabled={isAnalyzing || !imagePreview}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md ${
                isAnalyzing
                  ? 'bg-slate-800 text-slate-300 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.01]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>
                    {aiEngine === 'gemini' 
                      ? 'Gemini 3.5 Flash is inspecting produce...' 
                      : 'Gemma 4 is inspecting the produce...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>
                    {aiEngine === 'gemini' 
                      ? 'Analyze with Google Gemini 3.5' 
                      : 'Analyze with Gemma 4'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Preset Sample Selectors */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Or pick a sample to inspect:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {GEMMA_SAMPLE_PREVIEWS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample)}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all hover:bg-slate-50"
                >
                  <img 
                    src={sample.image} 
                    alt={sample.produceName} 
                    className="w-full h-12 object-cover rounded-lg mb-1"
                  />
                  <span className="text-[10px] font-semibold text-slate-700 block truncate">
                    {sample.produceName}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Inspection Results Panel */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 border border-slate-200/90 flex flex-col justify-between">
          
          {/* Error Message Display with Fallback Action */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl mb-4 flex flex-col space-y-2 text-rose-800 text-xs">
              <div className="flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block">Inspection Error:</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
              {aiEngine === 'gemma' && (
                <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between">
                  <span className="text-rose-700">Need an immediate cloud inspection?</span>
                  <button
                    onClick={() => {
                      setAiEngine('gemini');
                      handleAnalyzeClick('gemini');
                    }}
                    className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-700"
                  >
                    Inspect with Gemini Cloud API →
                  </button>
                </div>
              )}
            </div>
          )}

          {isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center">
              <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
              <p className="text-base font-extrabold text-slate-900">
                {aiEngine === 'gemini' 
                  ? 'Gemini 3.5 Flash is inspecting produce...' 
                  : 'Gemma 4 is inspecting the produce...'}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {aiEngine === 'gemini'
                  ? 'Calling Google Cloud Gemini Vision API. Analyzing produce grading tensors.'
                  : 'Sending image tensor to local Ollama instance (gemma4:latest). Analyzing cell turgor, brix, and surface defects.'}
              </p>
            </div>
          ) : analysisResult ? (
            <div>
              
              {/* Product Title & Quality Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    Inspection Passed
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {analysisResult.produce_type}
                  </h3>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-emerald-600">
                      {analysisResult.quality_score}
                    </span>
                    <span className="text-xs font-bold text-slate-400">/100</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">
                    Grade {analysisResult.grade}
                  </span>
                </div>
              </div>

              {/* Structured Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                
                <div className="bg-white p-3 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                    Produce Type
                  </span>
                  <span className="text-xs font-extrabold text-slate-800">
                    {analysisResult.produce_type}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                    Freshness
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">
                    {analysisResult.freshness_score}%
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                    Quality
                  </span>
                  <span className="text-xs font-extrabold text-indigo-600">
                    {analysisResult.quality_score}%
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">
                    Grade
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700">
                    Grade {analysisResult.grade}
                  </span>
                </div>

              </div>

              {/* Recommended Price */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                    Recommended Price
                  </span>
                  <span className="text-sm font-extrabold text-emerald-600">
                    ${analysisResult.recommended_price_min.toFixed(2)} – ${analysisResult.recommended_price_max.toFixed(2)} / kg
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Fair Wholesale Range
                </span>
              </div>

              {/* Visible Defects */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 mb-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1.5">
                  Visible Defects
                </span>
                {analysisResult.visible_defects.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.visible_defects.map((defect, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        {defect}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-emerald-600 font-medium flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    No visible defects detected. Pristine harvest grade.
                  </span>
                )}
              </div>

              {/* AI Description */}
              <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100 mb-3">
                <span className="text-[11px] font-bold text-indigo-900 block mb-1">
                  AI Description
                </span>
                <p className="text-xs text-indigo-800/90 leading-relaxed">
                  "{analysisResult.description}"
                </p>
              </div>

              {/* Footer Attribution Tag */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="font-bold text-emerald-700 flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  {lastUsedEngine === 'gemini' 
                    ? 'Analyzed by Google Gemini 3.5 • Cloud AI' 
                    : 'Analyzed by Gemma 4 • Local AI'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lastUsedEngine === 'gemini' ? 'Model: gemini-3.5-flash' : 'Model: gemma4:latest (Ollama)'}
                </span>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <Sparkles className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-700">
                Ready for AI Quality Inspection
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Upload a produce photo on the left or select a sample, then click "Analyze with Gemma 4" or switch to Gemini Cloud AI.
              </p>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
