import { useState, useRef } from 'react';
import { X, Check, Sparkles, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { IoCloudUploadOutline } from "react-icons/io5";

interface FileWithProgress {
  file: File;
  id: string;
  preview: string;
  progress: number;
  uploading: boolean;
  complete: boolean;
}

export default function FaceMaskPage() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<{ result: string; confidence?: number; error?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const filesWithProgress: FileWithProgress[] = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploading: true,
      complete: false
    }));

    setFiles(prev => [...prev, ...filesWithProgress]);
    
    filesWithProgress.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newProgress = f.progress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...f, progress: 100, uploading: false, complete: true };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 200);
  };

  const cancelUpload = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    addFiles(droppedFiles);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handlePredict = async () => {
    if (files.length === 0) return;

    setIsPredicting(true);
    try {
      const formData = new FormData();
      formData.append('image', files[0].file);

      const faceMaskApi = import.meta.env.VITE_FACE_MASK_API;
      const response = await fetch(faceMaskApi, {
        method: 'POST',
        body: formData, // no headers!
      });

      const data = await response.json();

      if (data.error) {
        setPrediction({ result: '', error: data.error });
      } else {
        setPrediction({
          result: data.prediction,
          confidence: data.confidence || 85,
        });
      }
    } catch (error) {
      setPrediction({ result: '', error: 'Failed to connect to the server.' });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleClear = () => {
    setFiles([]);
    setPrediction(null);
  };

  return (
    <div id="face-mask" className="w-full max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg mt-15">
        <section>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Face Mask Detection 😷
          </h1>

          <div className="mb-3 mt-3 flex flex-col">
            <label htmlFor="imageInput" className="font-semibold text-blue-500 ms-1">Upload the image:</label>
            <h5 className='text-red-500 font-mono ms-1'>Note: provided image should be of 1 person.</h5>
          </div>
          
          <div className={`flex flex-row items-center justify-between p-6 border-2 rounded-lg mb-5 transition-all duration-200 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-100'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <input ref={fileInputRef} type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange}/>
            
            <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-3 flex-1">
              <IoCloudUploadOutline className="w-12 h-12 text-gray-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-gray-700 font-medium">
                  Drag and drop files here
                </p>
                <p className="text-xs text-gray-500">
                  Limit 200MB per file • JPG, JPEG, PNG formats only
                </p>
              </div>
            </label>
            
            <button onClick={handleBrowseClick} type="button" className="px-6 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
              Browse files
            </button>
          </div>

          {files.length > 0 && (
            <div className="space-y-3 mb-6">
              {files.map(fileObj => (
                <div key={fileObj.id} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg bg-white shadow-sm">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img src={fileObj.preview} alt={fileObj.file.name} className="w-full h-full object-cover"/>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileObj.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <button onClick={() => (cancelUpload(fileObj.id), handleClear())} type="button" className="shrink-0 ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Remove file">
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    
                    {fileObj.uploading && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Uploading...</span>
                          <span>{fileObj.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${fileObj.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {fileObj.complete && (
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <Check className="w-4 h-4" />
                        <span>Upload complete</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {prediction && !prediction.error && prediction.result && (
            <div className={`mb-6 p-6 rounded-lg border-2 ${prediction.result === "The person in the image is not wearing a mask" ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start gap-3">{prediction.result === "The person in the image is not wearing a mask" ? (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-1 ${prediction.result === "The person in the image is not wearing a mask" ? 'text-red-800' : 'text-green-800'}`}>{prediction.result === "The person in the image is not wearing a mask" ? '⚠️ Face Mask Not Detected' : '✅ Face Mask Detected'}
                  </h3>
                  <p className={`text-sm mb-3 ${prediction.result === "The person in the image is not wearing a mask" ? 'text-red-700' : 'text-green-700'
                  }`}>{prediction.result === "The person in the image is not wearing a mask" ? "The person in the image is not wearing a mask." : 'The person in the image is wearing a mask.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${prediction.result === "The person in the image is not wearing a mask" ? 'text-red-600' : 'text-green-600'}`}>
                      Confidence:
                    </span>
                    <div className="flex-1 bg-white rounded-full h-2 overflow-hidden max-w-xs">
                      <div className={`h-2 rounded-full transition-all duration-500 ${prediction.result === "The person in the image is not wearing a mask" ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${prediction.confidence || 0}%` }}/>
                    </div>
                    <span className={`text-xs font-bold ${ prediction.result === "The person in the image is not wearing a mask" ? 'text-red-700' : 'text-green-700' }`}>
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
          
          <div className="flex justify-center">
            <button type="button" onClick={handlePredict} disabled={files.length === 0 || isPredicting} className={`py-3 px-8 flex items-center justify-center gap-2 border-2 rounded-lg font-medium transition-all duration-300 ${files.length === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' : isPredicting ? 'border-blue-300 text-blue-600 bg-blue-50 cursor-wait' : 'border-gray-300 text-gray-700 hover:shadow-md hover:bg-green-50 hover:border-green-300 hover:text-green-700'}`}>
              {isPredicting ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Predicting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Predict</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}