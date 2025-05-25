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
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {loadingMessage}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait while we process your document
        </p>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
              Processing
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
              {Math.round(processingProgress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-100 dark:bg-gray-700">
          <div 
            style={{ width: `${processingProgress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out"
          ></div>
        </div>
      </div>
      
      <div className="animate-pulse flex space-x-4 justify-center mt-8">
        <div className="rounded-full bg-blue-200 dark:bg-blue-900/30 h-3 w-3"></div>
        <div className="rounded-full bg-blue-300 dark:bg-blue-800/50 h-3 w-3"></div>
        <div className="rounded-full bg-blue-400 dark:bg-blue-700/70 h-3 w-3"></div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;