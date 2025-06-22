import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const ProcessingIndicator: React.FC = () => {
  const { processingProgress, generationType } = useAppContext();
  const [loadingMessage, setLoadingMessage] = useState('Analyzing document...');
  
  useEffect(() => {
    const messages = [
      'Analyzing document...',
      'Extracting key concepts...',
      'Identifying important information...',
      'Structuring content...',
      generationType === 'summary' ? 'Generating summary...' :
      generationType === 'mcq' ? 'Creating questions and answers...' :
      generationType === 'flashcard' ? 'Building flashcards...' :
      'Designing learning game...'
    ];
    
    const messageIntervals = [0, 20, 40, 60, 80];
    
    for (let i = 0; i < messageIntervals.length; i++) {
      if (processingProgress >= messageIntervals[i] && 
          (i === messageIntervals.length - 1 || processingProgress < messageIntervals[i + 1])) {
        setLoadingMessage(messages[i]);
        break;
      }
    }
  }, [processingProgress, generationType]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/70 dark:bg-gray-900/80 transition-colors duration-300">
      <div className="w-full max-w-md mx-auto text-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-8 border border-pink-200 dark:border-pink-400/30 backdrop-blur-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-200 mb-2">
            {loadingMessage}
          </h2>
          <p className="text-sm text-pink-500 dark:text-pink-300">
            Please wait while we process your document
          </p>
        </div>
        
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-pink-600 dark:text-pink-300">
                Processing
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-pink-600 dark:text-pink-300">
                {Math.round(processingProgress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-pink-200 dark:bg-pink-900/30">
            <div 
              style={{ width: `${processingProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-400 dark:bg-pink-600 transition-all duration-300 ease-out"
            ></div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-pink-300 border-t-pink-500 animate-spin" style={{ borderTopColor: '#ec4899' }}></div>
            <div className="absolute inset-2 rounded-full bg-pink-100 dark:bg-pink-900/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;