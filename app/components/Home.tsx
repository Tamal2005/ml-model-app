import React, { useRef } from 'react'

export default function Home() {
    return (
        <div id='home'className="w-full mx-auto h-screen flex flex-col items-center justify-center gap-4">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 mt-6 shadow-md">

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    🤖 MAchInE LEarNiNG ApP
                </h1>

                <div className="text-center">
                    <div className="bg-blue-50 text-blue-700 font-medium py-3 px-5 rounded-xl mb-8 inline-block">
                        This is a Machine and Deep Learning Model App
                    </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed">
                    Welcome to the <span className="font-semibold">AI Detection Hub!</span> 🚀 <br />
                    This app contains 4 different AI-based models:
                </p>


                <ul className="mt-6 text-left space-y-4 text-gray-700">
                    <li>
                        <span className="font-bold text-gray-900">1. Spam Mail Detection 📧</span><br />
                        <span className="italic">Detects whether an email is spam or not spam.</span>
                    </li>
                    <li>
                        <span className="font-bold text-gray-900">2. Phishing URL Detection 🌐</span><br />
                        <span className="italic">Identifies whether a URL is phishing or safe.</span>
                    </li>
                    <li>
                        <span className="font-bold text-gray-900">3. Face Mask Detection 😷</span><br />
                        <span className="italic">Detects whether a person in an uploaded image is wearing a mask.</span>
                    </li>
                    <li>
                        <span className="font-bold text-gray-900">4. Deepfake Voice Detection 🎙️</span><br />
                        <span className="italic">Detects whether a voice is real or fake (edited or AI generated).</span>
                    </li>
                </ul>


                <div className="border-t mt-8 pt-4 text-sm text-gray-500 italic">
                    🧠🔧 <span className="font-medium">Note:</span> These models are trained on sample datasets and may not always provide 100% accurate results.
                </div>
            </div>

        </div>
    )
}
