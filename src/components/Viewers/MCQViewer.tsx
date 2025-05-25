import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

// Mock MCQ data (in a real app, this would come from the backend)
const MOCK_MCQS = [
  {
    id: 1,
    question: "This is an example question that would be generated from your document. The AI would analyze your content and create relevant questions.",
    options: [
      "First possible answer option",
      "Second possible answer option",
      "Third possible answer option",
      "Fourth possible answer option"
    ],
    correctAnswer: 1,
    explanation: "The explanation would provide context about why this answer is correct, referencing specific content from your uploaded document."
  },
  {
    id: 2,
    question: "Another example question would appear here, focusing on key concepts from your study material?",
    options: [
      "Option A from your content",
      "Option B from your content",
      "Option C from your content",
      "Option D from your content"
    ],
    correctAnswer: 2,
    explanation: "This explanation would cite specific passages or concepts from your document to explain the correct answer."
  },
  {
    id: 3,
    question: "Questions would be generated to test understanding of important concepts in your material?",
    options: [
      "First potential answer",
      "Second potential answer",
      "Third potential answer",
      "Fourth potential answer"
    ],
    correctAnswer: 1,
    explanation: "Explanations would be derived from your document's content to help reinforce learning."
  },
  {
    id: 4,
    question: "The AI would create questions that help test comprehension of the material?",
    options: [
      "Example option one",
      "Example option two",
      "Example option three",
      "Example option four"
    ],
    correctAnswer: 2,
    explanation: "Each explanation would reference specific parts of your document to explain why an answer is correct."
  },
  {
    id: 5,
    question: "Questions would cover various aspects and difficulty levels of your content?",
    options: [
      "First choice example",
      "Second choice example",
      "Third choice example",
      "Fourth choice example"
    ],
    correctAnswer: 1,
    explanation: "The explanation would help reinforce learning by connecting the answer to your study material."
  }
];

const MCQViewer: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(Array(MOCK_MCQS.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const handleCheckAnswers = () => {
    setShowResults(true);
  };
  
  const handleReset = () => {
    setAnswers(Array(MOCK_MCQS.length).fill(-1));
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };
  
  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const calculateScore = () => {
    return MOCK_MCQS.reduce((score, mcq, index) => {
      return score + (answers[index] === mcq.correctAnswer ? 1 : 0);
    }, 0);
  };
  
  const currentQuestion = MOCK_MCQS[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Multiple Choice Questions
          </h2>
          {showResults && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2 text-gray-700 dark:text-gray-300">
                Score: {calculateScore()}/{MOCK_MCQS.length}
              </span>
              <button
                onClick={handleReset}
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="mb-4 flex overflow-x-auto pb-2">
          {MOCK_MCQS.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToQuestion(index)}
              className={`flex items-center justify-center min-w-8 h-8 rounded-full mx-1 text-sm font-medium transition-all duration-200 ${
                currentQuestionIndex === index
                  ? 'bg-blue-600 text-white'
                  : answers[index] >= 0
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Question {currentQuestionIndex + 1} of {MOCK_MCQS.length}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentQuestion.question}
          </p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                onClick={() => handleSelectOption(currentQuestionIndex, optionIndex)}
                className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  answers[currentQuestionIndex] === optionIndex
                    ? showResults
                      ? optionIndex === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/10'
                      : 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                    : showResults && optionIndex === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      answers[currentQuestionIndex] === optionIndex
                        ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {answers[currentQuestionIndex] === optionIndex && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-gray-700 dark:text-gray-300 ${
                      showResults && (
                        optionIndex === currentQuestion.correctAnswer || 
                        answers[currentQuestionIndex] === optionIndex
                      ) ? 'font-medium' : ''
                    }`}>
                      {option}
                    </p>
                  </div>
                  {showResults && (
                    <div className="ml-2">
                      {optionIndex === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : answers[currentQuestionIndex] === optionIndex ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {showResults && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                Explanation
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => navigateToQuestion(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200'
            }`}
          >
            Previous
          </button>
          
          {currentQuestionIndex === MOCK_MCQS.length - 1 ? (
            !showResults && (
              <button
                onClick={handleCheckAnswers}
                disabled={answers.some(a => a === -1)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  answers.some(a => a === -1)
                    ? 'bg-blue-300 dark:bg-blue-800 text-blue-100 dark:text-blue-600 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200'
                }`}
              >
                Check Answers
              </button>
            )
          ) : (
            <button
              onClick={() => navigateToQuestion(Math.min(MOCK_MCQS.length - 1, currentQuestionIndex + 1))}
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQViewer;