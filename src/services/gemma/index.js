/**
 * Local Gemma 4 Quality Inspector Service via Ollama
 * 
 * Connects directly to local Ollama instance running gemma4:latest
 */

const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_BASE_URL || 'http://localhost:11434';
const GEMMA_MODEL = import.meta.env.VITE_GEMMA_MODEL || 'gemma4:latest';

const INSPECTOR_PROMPT = `You are a fresh produce quality inspector. Analyze this image of fresh produce and identify:
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

/**
 * Strips data URI prefix to get raw base64 string
 */
function extractRawBase64(dataUrl) {
  const parts = dataUrl.split(',');
  return parts.length > 1 ? parts[1] : parts[0];
}

export const gemmaService = {
  /**
   * Analyzes a produce image using the local Gemma 4 model on Ollama
   * @param {string} base64ImageData Data URL or raw base64 string of the produce image
   */
  async analyzeProduceWithGemma4(base64ImageData) {
    const rawBase64 = extractRawBase64(base64ImageData);

    const payload = {
      model: GEMMA_MODEL,
      prompt: INSPECTOR_PROMPT,
      images: [rawBase64],
      format: 'json',
      stream: false
    };

    // Try through Vite proxy (/api/ollama) first to guarantee bypass of browser CORS,
    // and fallback to direct OLLAMA_BASE_URL if called outside browser
    const endpoints = [
      '/api/ollama/api/generate',
      `${OLLAMA_BASE_URL}/api/generate`
    ];

    let lastError = null;
    let jsonResponse = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} from Ollama`);
        }

        jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.response) {
          break; // successfully received response
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!jsonResponse || !jsonResponse.response) {
      throw new Error('Local Gemma 4 could not be reached. Make sure Ollama is running.');
    }

    try {
      // Parse the JSON string from Gemma response
      const parsed = JSON.parse(jsonResponse.response);
      return {
        produce_type: parsed.produce_type || 'Fresh Produce',
        freshness_score: Number(parsed.freshness_score) || 90,
        quality_score: Number(parsed.quality_score) || 90,
        grade: parsed.grade || 'A',
        visible_defects: Array.isArray(parsed.visible_defects) ? parsed.visible_defects : [],
        description: parsed.description || 'Verified fresh agricultural produce.',
        recommended_price_min: Number(parsed.recommended_price_min) || 1.50,
        recommended_price_max: Number(parsed.recommended_price_max) || 3.50
      };
    } catch (parseErr) {
      console.error('Failed to parse Gemma JSON output:', jsonResponse.response);
      throw new Error('Gemma 4 response could not be parsed into the required JSON schema.');
    }
  },

  /**
   * Healthcheck for local Ollama
   */
  async checkOllamaHealth() {
    try {
      const res = await fetch('/api/ollama/api/tags', { method: 'GET' });
      return res.ok;
    } catch {
      try {
        const directRes = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { method: 'GET' });
        return directRes.ok;
      } catch {
        return false;
      }
    }
  }
};

export default gemmaService;
