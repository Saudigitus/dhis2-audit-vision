import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GlobalErrorState } from '../../schema/globalErrorSchema';
import { useGlobalError } from '../../hooks/error/useGlobalError';
import { ShieldAlert, X, AlertCircle, Copy, Check } from 'lucide-react';

const CopyJsonButton = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-700 text-gray-200 text-xs font-medium rounded-md hover:bg-gray-600 transition-colors shadow-sm absolute top-2 right-2"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export const GlobalErrorModal: React.FC = () => {
  const error = useRecoilValue(GlobalErrorState);
  const { clearError } = useGlobalError();

  if (!error) return null;

  const errorMessage = error?.message || error?.details?.message || error?.toString() || 'An unknown error occurred';
  const httpStatus = error?.httpStatusCode || error?.details?.httpStatusCode || 'N/A';
  
  // Try to find the full response body or object
  const errorObject = error?.response || error?.details || (typeof error === 'object' ? error : null);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0f172a]/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl shadow-sm">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Application Error</h2>
              <p className="text-sm text-gray-500 font-medium">A network request failed</p>
            </div>
          </div>
          <button
            onClick={clearError}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          
          <div className="flex items-start gap-3 p-4 bg-white border border-red-100 shadow-sm rounded-xl">
            <div className="p-1.5 bg-red-50 rounded-lg shrink-0 mt-0.5">
              <AlertCircle size={16} className="text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  HTTP Status: {httpStatus}
                </span>
              </div>
              <div className="mb-3">
                <p className="text-[13px] font-semibold text-gray-700 mb-1">Error Message:</p>
                <p className="text-sm text-gray-600 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap bg-red-50/50 p-3 rounded-lg border border-red-50">
                  {errorMessage}
                </p>
              </div>

              {errorObject && (
                <div className="relative mt-4">
                  <p className="text-[13px] font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                    Error Details (JSON):
                  </p>
                  <div className="relative">
                    <pre className="text-sm text-white font-mono text-[12px] leading-relaxed break-words whitespace-pre-wrap bg-gray-800 p-4 pt-12 rounded-lg border border-gray-700 overflow-x-auto max-h-64 overflow-y-auto">
                      {JSON.stringify(errorObject, null, 2)}
                    </pre>
                    <CopyJsonButton data={errorObject} />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50/80 flex justify-end">
          <button
            onClick={clearError}
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
