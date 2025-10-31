import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

export default function About() {
  return (
    <div id='about' className="w-full max-w-3xl mx-auto py-10 text-gray-800">
      {/* About */}
      <div className="bg-white rounded-2xl p-8 mt-9 shadow-md">
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <span className="text-blue-500 text-4xl">ℹ️</span> About
        </h1>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Welcome to the <span className="font-semibold text-blue-700">AI Detection Hub 🚀</span>
        </p>
        <p className="mt-2 text-gray-600">
          This app brings together multiple{" "}
          <span className="font-semibold">Machine Learning</span> and{" "}
          <span className="font-semibold">Deep Learning</span> models to demonstrate how AI can
          be applied to real-world problems:
        </p>

        <ul className="mt-4 space-y-2 text-gray-700">
          <li>📧 <b>Spam Mail Detection</b> – Identifies spam vs. non-spam messages.</li>
          <li>🌐 <b>Phishing URL Detection</b> – Detects unsafe links.</li>
          <li>😷 <b>Face Mask Detection</b> – Uses computer vision to check if a person is wearing a mask.</li>
          <li>🎙️ <b>Deepfake Voice Detection</b> – Analyzes audio to detect AI-generated voices.</li>
        </ul>

        <hr className="mt-6 border-gray-300" />
      </section>

      {/* Technologies Used */}
      <section className="mb-8 items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🔧 Technologies Used
        </h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
          <li><b>Python</b> (Streamlit, scikit-learn, TensorFlow/Keras, NLTK, etc.)</li>
          <li><b>Machine Learning Models:</b> Logistic Regression, Naive Bayes, etc.</li>
          <li><b>Deep Learning Models:</b>
            <ul className="list-decimal list-inside ml-8 mt-1 space-y-2">
              <li>CNNs for image classification (Face Mask Detection)</li>
              <li>Conv1D networks for audio classification (Deepfake Voice Detection)</li>
            </ul>
          </li>
          <li><b>Vectorizers & Feature Extraction:</b>
            <ul className="list-decimal list-inside ml-8 mt-1 space-y-2">
              <li>TF-IDF for text (Fake News, Spam Mail)</li>
              <li>Custom URL feature extraction (Phishing Detection)</li>
              <li>MFCCs for voice analysis (Deepfake Voice Detection)</li>
            </ul>
          </li>
          <li><b>Deployment:</b> Streamlit app with Google Drive model storage</li>
        </ul>

        <hr className="mt-6 border-gray-300" />
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          ⚠️ Disclaimer
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          These models are trained on <span className="font-semibold">public datasets</span> for
          demonstration and educational purposes. They may not always provide 100% accurate predictions.
        </p>

        <hr className="mt-6 border-gray-300" />
      </section>

      {/* Author */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          👨‍💻 Author
        </h2>
        <p className="mt-3">
          Developed by <b>Tamal Debnath</b>
        </p>

        <ul className="mt-2 space-y-1">
          <li className='flex items-center gap-4'><TfiEmail className='w-6'/> Email: <a className="text-blue-600" href="mailto:tamalcoder@email.com">tamalcoder@email.com</a></li>
          <li className='flex items-center gap-4'><FaGithub className='w-6'/> GitHub: <a className="text-blue-600" href="https://github.com/tamal2005">github.com/tamal2005</a></li>
          <li className='flex items-center gap-4'><FaLinkedin className='w-6'/> LinkedIn: <a className="text-blue-600" href="https://linkedin.com/in/tamal-debnath-35823b312">linkedin.com/in/tamal-debnath-35823b312</a></li>
        </ul>
      </section>
      </div>
    </div>
  )
}
