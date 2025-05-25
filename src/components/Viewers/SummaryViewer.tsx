import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Mock summary data (in a real app, this would come from the backend)
const MOCK_SUMMARY = {
  title: "Study Material Summary",
  summary: `This is a placeholder summary that would normally be generated from your uploaded document. The AI would analyze your document and create:

1. A comprehensive overview of the main topics
2. Key concepts and their explanations
3. Important definitions and terminology
4. Relationships between different concepts
5. Main arguments or theories presented

In a real implementation, this summary would be specifically generated from your uploaded document's content, making it relevant to your study material.`,
  keyPoints: [
    "Key points would be extracted from your document",
    "Important concepts would be highlighted here",
    "Definitions would be listed for quick reference",
    "Critical information would be emphasized",
    "Main themes would be identified",
    "Connections between topics would be shown",
    "Core arguments would be summarized"
  ]
};

const SummaryViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_SUMMARY.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {MOCK_SUMMARY.title}
          </h2>
          <button
            onClick={handleCopy}
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {MOCK_SUMMARY.summary}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              Key Points
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {MOCK_SUMMARY.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryViewer;