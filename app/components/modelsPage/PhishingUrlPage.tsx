import { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PhishingUrlPage() {
  const [urlContent, setUrlContent] = useState<string>('');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<{ result: string; confidence?: number; error?: string } | null>(null);

  const handlePredict = async () => {
    if (urlContent.trim().length === 0) return;

    setIsPredicting(true);
    setPrediction(null);

    try {
      const urlApi = import.meta.env.VITE_PHISHING_URL_API;
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: urlContent }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPrediction({ result: '', error: data.error });
      } else {
        setPrediction({ 
          result: data.prediction,
          confidence: data.confidence || 85
        });
      }
    } catch (error) {
      setPrediction({ 
        result: '', 
        error: 'Failed to connect to the server.' 
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleClear = () => {
    setUrlContent('');
    setPrediction(null);
  };

  return (
    <div id="phishing-url" className="w-full max-w-3xl mx-auto py-10 items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg mt-15">
        <section>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Phishing URL Detection 🔍
          </h1>
          
          <div className="mb-6">
            <label htmlFor="urlInput" className="block text-lg font-semibold text-gray-800 mb-3">
              Enter URL to Check:
            </label>
            <input type="url" aria-rowspan={4} className="w-full border-2 border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-gray-700 placeholder-gray-400" id="urlInput" placeholder="https://example.com" value={urlContent} onChange={(e) => setUrlContent(e.target.value)}/>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {urlContent.length} characters
              </p>
              {urlContent.length > 0 && (
                <button onClick={handleClear} type="button" className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>

          {prediction && !prediction.error && prediction.result && (
            <div className={`mb-6 p-6 rounded-lg border-2 ${prediction.result === 'Phishing Url' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start gap-3">{prediction.result === 'Phishing Url' ? (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-1 ${prediction.result === 'Phishing Url' ? 'text-red-800' : 'text-green-800'}`}>{prediction.result === 'Phishing Url' ? '⚠️ Phishing URL Detected' : '✅ Safe URL'}
                  </h3>
                  <p className={`text-sm mb-3 ${prediction.result === 'Phishing Url' ? 'text-red-700' : 'text-green-700'
                  }`}>{prediction.result === 'Phishing Url' ? 'This URL appears to be a phishing attempt. Do not enter personal information or credentials.' : 'This URL appears to be legitimate and safe to visit.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${prediction.result === 'Phishing Url' ? 'text-red-600' : 'text-green-600'}`}>
                      Confidence:
                    </span>
                    <div className="flex-1 bg-white rounded-full h-2 overflow-hidden max-w-xs">
                      <div className={`h-2 rounded-full transition-all duration-500 ${prediction.result === 'Phishing Url' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${prediction.confidence || 0}%` }}/>
                    </div>
                    <span className={`text-xs font-bold ${ prediction.result === 'Phishing Url' ? 'text-red-700' : 'text-green-700' }`}>
                      {prediction.confidence?.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {prediction?.error && (
            <div className="mb-6 p-6 rounded-lg border-2 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-yellow-800">
                    Error
                  </h3>
                  <p className="text-sm text-yellow-700">
                    {prediction.error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center gap-3">
            <button type="button" onClick={handlePredict} disabled={urlContent.trim().length === 0 || isPredicting} className={`py-3 px-8 flex items-center justify-center gap-2 border-2 rounded-lg font-medium transition-all duration-300 ${ urlContent.trim().length === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'  : isPredicting ? 'border-blue-300 text-blue-600 bg-blue-50 cursor-wait' : 'border-gray-300 text-gray-700 hover:shadow-md hover:bg-green-50 hover:border-green-300 hover:text-green-700' }`} >
              {isPredicting ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Check URL</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}