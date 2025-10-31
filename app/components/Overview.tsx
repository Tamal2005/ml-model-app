import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";


const SyntaxHighlighter = lazy(() => 
  import('react-syntax-highlighter').then(mod => ({ 
    default: mod.Prism 
  }))
);

// Move this inside the component or lazy load it too
const useDarkStyle = () => {
  const [style, setStyle] = useState<any>(null);
  
  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then(mod => {
      setStyle(mod.vs);
    });
  }, []);
  
  return style;
};

export default function Overview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [codes, setCodes] = useState<string[]>([]);
  const vscDarkPlus = useDarkStyle();

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const trainingSections = [
    { icon: "📧", title: "Spam Mail Detection Training Code", path: "/codes/spam_mail_prediction.py"},
    { icon: "🌐", title: "Phishing URI Detection Training Code", path: "/codes/phishing_url_prediction.py"},
    { icon: "😷", title: "Face Mask Detection Training Code", path: "/codes/face_mask_detection.py"},
    { icon: "🎙️", title: "Deepfake Voice Detection Training Code", path: "/codes/deepfake_voice_detection.py"},
  ];

  useEffect(() => {
    Promise.all(trainingSections.map(section => fetch(section.path).then(r => r.text())))
      .then(data => setCodes(data))
      .catch(err => console.error("Error loading code files:", err));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-10 space-y-10 text-gray-800">
      <div className="bg-white rounded-2xl p-8 mt-9 shadow-md">

        {/* Overview Section */}
        <section>
          <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
            🏠 Overview
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome to the <span className="font-semibold">AI Detection Hub</span> 🤖✨
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            This app showcases multiple{" "}
            <span className="font-semibold">Machine Learning</span> and{" "}
            <span className="font-semibold">Deep Learning</span> models trained
            to detect and classify different types of data.
          </p>
          <hr className="my-6 border-gray-300" />
        </section>

        {/* What You Can Do Here */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🔍 What You Can Do Here
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>1️⃣ <b>Spam Mail Detection</b> – Test an email text and see if it’s spam or not.</li>
            <li>2️⃣ <b>Phishing URL Detection</b> – Enter a link to find out if it’s safe or a phishing attempt.</li>
            <li>3️⃣ <b>Face Mask Detection</b> – Upload an image to check if a person is wearing a mask.</li>
            <li>4️⃣ <b>Deepfake Voice Detection</b> – Upload a voice to check if it’s real or fake.</li>
          </ul>
          <hr className="my-6 border-gray-300" />
        </section>

        {/* Why This Matters */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📊 Why This Matters
          </h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
            <li>Spam mails can carry scams or malware.</li>
            <li>Phishing websites steal sensitive information.</li>
            <li>Face masks are vital for health safety in many scenarios.</li>
            <li>Deepfake voices can be misused for fraud or impersonation.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            This app helps demonstrate how{" "}
            <span className="font-semibold text-blue-700">
              AI can tackle real-world problems 🌍
            </span>.
          </p>
          <hr className="my-6 border-gray-300" />
        </section>

        {/* Model Training Code */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🧠 Model Training Code
          </h2>

          <div className="mt-4 space-y-3">
            {trainingSections.map((section, index) => (
              <div key={index} className="border border-b-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-300">
                <button onClick={() => toggleDropdown(index)}className="flex w-full items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition">
                  {openIndex === index ? (
                    <ChevronDownIcon className="w-5 text-gray-600" />
                  ) : (
                    <ChevronRightIcon className="w-5 text-gray-600" />
                  )}
                  <span className="font-medium">{section.icon} {section.title}</span>
                </button>

                {openIndex === index && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200 transition-all duration-300">
                    <Suspense fallback={<div className="p-4 text-gray-500">Loading code...</div>}>
                    <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers wrapLongLines
                      customStyle={{borderRadius: "10px", fontSize: "14px", padding: "16px"}}>
                      {codes[index]}
                    </SyntaxHighlighter>
                    </Suspense>
                  </div>
                )}
              </div>
            ))}
          </div>

          <hr className="my-6 border-gray-300" />
        </section>

        {/* How to Navigate */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🧭 How to Navigate
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Use the <span className="font-semibold">sidebar</span> to switch between:
          </p>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li>📂 <b>ML Projects</b> → Try out each model interactively.</li>
            <li>📘 <b>About</b> → Learn more about the technologies behind the app.</li>
          </ul>

          <p className="mt-5 text-sm text-gray-500 italic border-t pt-3">
            🧠🔧 Note: These models are prototypes for educational purposes and not production-level security tools.
          </p>
        </section>
      </div>
    </div>
  );
}
