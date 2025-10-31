import { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SpamMailPage() {
    const [emailContent, setEmailContent] = useState<string>('');
    const [isPredicting, setIsPredicting] = useState<boolean>(false);
    const [prediction, setPrediction] = useState<{ result: string; confidence?: number; error?: string } | null>(null);

    const handlePredict = async () => {
        if (emailContent.trim().length === 0) return;

        setIsPredicting(true);
        setPrediction(null);

        try {
            const mailApi = import.meta.env.VITE_SPAM_MAIL_API;
            const response = await fetch( mailApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: emailContent }),
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
        setEmailContent('');
        setPrediction(null);
    };

    return (
        <div id="spam-mail" className="w-full max-w-3xl mx-auto py-10 items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg mt-15">
                <section>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                        Spam Mail Detection 📧
                    </h1>

                    <div className="mb-6">
                        <label htmlFor="spamInput" className="block text-lg font-semibold text-gray-800 mb-3" >
                            Enter Email Content:
                        </label>
                        <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all resize-none text-gray-700 placeholder-gray-400" id="spamInput" rows={6} placeholder="Paste your email content here..." value={emailContent} onChange={(e) => setEmailContent(e.target.value)} />
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">
                                {emailContent.length} characters
                            </p>
                            {emailContent.length > 0 && (
                                <button onClick={handleClear} type="button" className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors" >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {prediction && !prediction.error && prediction.result && (
                        <div className={`mb-6 p-6 rounded-lg border-2 ${prediction.result === 'Spam Mail' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                            <div className="flex items-start gap-3">
                                {prediction.result === 'Spam Mail' ? (
                                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                ) : (
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-1 ${prediction.result === 'Spam Mail' ? 'text-red-800' : 'text-green-800'}`}>
                                        {prediction.result === 'Spam Mail' ? '⚠️ Spam Detected' : '✅ Legitimate Email'}
                                    </h3>
                                    <p className={`text-sm mb-3 ${prediction.result === 'Spam Mail' ? 'text-red-700' : 'text-green-700'}`}>
                                        {prediction.result === 'Spam Mail' ? 'This email appears to be spam. Be cautious of suspicious links or requests.' : 'This email appears to be legitimate.'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium ${prediction.result === 'Spam Mail' ? 'text-red-600' : 'text-green-600'}`}>
                                            Confidence:
                                        </span>
                                        <div className="flex-1 bg-white rounded-full h-2 overflow-hidden max-w-xs">
                                            <div className={`h-2 rounded-full transition-all duration-500 ${prediction.result === 'Spam Mail' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${prediction.confidence || 0}%` }} />
                                        </div>
                                        <span className={`text-xs font-bold ${prediction.result === 'Spam Mail' ? 'text-red-700' : 'text-green-700'}`}>
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
                        <button type="button" onClick={handlePredict} disabled={emailContent.trim().length === 0 || isPredicting} className={`py-3 px-8 flex items-center justify-center gap-2 border-2 rounded-lg font-medium transition-all duration-300 ${emailContent.trim().length === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' : isPredicting ? 'border-blue-300 text-blue-600 bg-blue-50 cursor-wait' : 'border-gray-300 text-gray-700 hover:shadow-md hover:bg-green-50 hover:border-green-300 hover:text-green-700'}`}>
                            {isPredicting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>Analyze Email</span>
                                </>
                            )}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}