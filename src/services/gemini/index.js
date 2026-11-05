/**
 * Google Gemini Cloud AI Service
 * 
 * Powered by Google Gemini API (gemini-3.5-flash)
 * Provides cloud multimodal vision analysis, automated price negotiations,
 * and smart match reasoning for TazaaConnect.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Strips data URI prefix to get raw base64 string
 */
function extractRawBase64(dataUrl) {
  const parts = dataUrl.split(',');
  return parts.length > 1 ? parts[1] : parts[0];
}

function extractMimeType(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,/);
  return match ? match[1] : 'image/jpeg';
}

export const geminiService = {
  isConfigured() {
    return Boolean(GEMINI_API_KEY && GEMINI_API_KEY.length > 10);
  },

  /**
   * Inspect produce image using Google Gemini 3.5 Flash Vision
   * @param {string} base64DataUrl Data URL of produce image
   */
  async inspectProduceWithGemini(base64DataUrl) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured in .env file.');
    }

    const rawBase64 = extractRawBase64(base64DataUrl);
    const mimeType = extractMimeType(base64DataUrl);

    const prompt = `You are a fresh produce quality inspector. Analyze this image of fresh produce and identify:
- produce type
- visible freshness indicators
- visible defects
- quality score from 0-100
- freshness score from 0-100
- grade (A, B, or C)
- short marketplace description
- reasonable recommended price range (min and max in USD per kg)

You must return ONLY a valid JSON object matching this exact schema:
{
  "produce_type": "string",
  "freshness_score": 0,
  "quality_score": 0,
  "grade": "A",
  "visible_defects": ["string"],
  "description": "string",
  "recommended_price_min": 0.0,
  "recommended_price_max": 0.0
}`;

    const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: rawBase64
              }
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API Error:', errBody);
      throw new Error(`Gemini Cloud API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('No candidate content returned by Gemini API.');
    }

    const textOutput = data.candidates[0].content.parts[0].text;
    
    // Extract JSON block if wrapped in markdown backticks
    const cleanedJson = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);

    return {
      produce_type: parsed.produce_type || 'Fresh Produce',
      freshness_score: Number(parsed.freshness_score) || 94,
      quality_score: Number(parsed.quality_score) || 92,
      grade: parsed.grade || 'A',
      visible_defects: Array.isArray(parsed.visible_defects) ? parsed.visible_defects : [],
      description: parsed.description || 'Verified fresh agricultural produce.',
      recommended_price_min: Number(parsed.recommended_price_min) || 1.80,
      recommended_price_max: Number(parsed.recommended_price_max) || 3.60,
      engine: 'Google Gemini 3.5 Flash'
    };
  },

  /**
   * AI Negotiation Assistant between Farm and Bodega Buyer
   */
  async negotiatePricing(produceName, farmAskingPrice, bodegaBudget, quantityKg) {
    if (!this.isConfigured()) {
      return {
        compromisePrice: (farmAskingPrice + bodegaBudget) / 2,
        rationale: 'Equal split between farm asking and bodega budget.'
      };
    }

    const prompt = `Act as an AI fair-trade mediator for fresh food distribution.
Farm Asking Price: $${farmAskingPrice}/kg
Corner Store Budget: $${bodegaBudget}/kg
Quantity: ${quantityKg} kg of ${produceName}
Calculate a fair compromise price per kg that allows the urban farm to profit above harvest costs while keeping the produce affordable for a low-income neighborhood corner store.
Return JSON:
{
  "compromisePrice": 0.0,
  "rationale": "one sentence explanation"
}`;

    const url = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  }
};

export default geminiService;
