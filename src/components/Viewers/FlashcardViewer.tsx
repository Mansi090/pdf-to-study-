import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Bookmark } from 'lucide-react';

// Mock flashcard data (in a real app, this would come from the backend)
const MOCK_FLASHCARDS = [
  {
    id: 1,
    front: "Example Question 1",
    back: "This would be the answer to the first question, generated from your uploaded document's content."
  },
  {
    id: 2,
    front: "Example Question 2",
    back: "The answer would contain relevant information extracted from your study material."
  },
  {
    id: 3,
    front: "Example Question 3",
    back: "Each answer would be based on specific content from your uploaded document."
  },
  {
    id: 4,
    front: "Example Question 4",
    back: "The AI would create questions and answers that help reinforce key concepts from your material."
  },
  {
    id: 5,
    front: "Example Question 5",
    back: "Answers would include important details and explanations from your study content."
  },
  {
    id: 6,
    front: "Example Question 6",
    back: "These flashcards would be customized based on the specific content of your uploaded document."
  },
  {
    id: 7,
    front: "Example Question 7",
    back: "Each card would focus on helping you remember important information from your study material."
  }
];

const FlashcardViewer: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [bookmarkedCards, setBookmarkedCards] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentCard = MOCK_FLASHCARDS[currentCardIndex];
  
  const handleFlip = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
  };
  
  const handlePrevCard = () => {
    if (isAnimating || currentCardIndex === 0) return;
    
    setIsAnimating(true);
    setIsFlipped(false);
    setCurrentCardIndex(currentCardIndex - 1);
  };
  
  const handleNextCard = () => {
    if (isAnimating || currentCardIndex === MOCK_FLASHCARDS.length - 1) return;
    
    setIsAnimating(true);
    setIsFlipped(false);
    setCurrentCardIndex(currentCardIndex + 1);
  };
  
  const toggleBookmark = () => {
    if (bookmarkedCards.includes(currentCard.id)) {
      setBookmarkedCards(bookmarkedCards.filter(id => id !== currentCard.id));
    } else {
      setBookmarkedCards([...bookmarkedCards, currentCard.id]);
    }
  };
  
  const isCurrentCardBookmarked = bookmarkedCards.includes(currentCard.id);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this with the CSS transition time
    
    return () => clearTimeout(timer);
  }, [isFlipped, currentCardIndex]);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Flashcards
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Card {currentCardIndex + 1} of {MOCK_FLASHCARDS.length}
          </div>
        </div>
        
        <div className="relative perspective-1000 mb-6">
          <div
            onClick={handleFlip}
            className={`relative cursor-pointer w-full aspect-[3/2] transition-transform duration-300 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Front of card */}
            <div
              className={`absolute inset-0 backface-hidden rounded-xl flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{ 
                backfaceVisibility: 'hidden'
              }}
            >
              <p className="text-xl font-medium text-gray-800 dark:text-gray-100 text-center">
                {currentCard.front}
              </p>
            </div>
            
            {/* Back of card */}
            <div
              className={`absolute inset-0 backface-hidden rounded-xl flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 ${
                isFlipped ? '' : 'rotate-y-180'
              }`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <p className="text-base text-gray-700 dark:text-gray-200 text-center">
                {currentCard.back}
              </p>
            </div>
          </div>
          
          {/* Bookmark icon */}
          <button
            onClick={toggleBookmark}
            className="absolute top-3 right-3 z-10 text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
          >
            <Bookmark
              className={`h-6 w-6 ${
                isCurrentCardBookmarked ? 'fill-yellow-400 text-yellow-500 dark:fill-yellow-300 dark:text-yellow-400' : ''
              }`}
            />
          </button>
        </div>
        
        <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Click on the card to flip it
        </div>
        
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className={`p-2 rounded-full ${
              currentCardIndex === 0
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleFlip}
            className="p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200"
          >
            <RotateCw className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === MOCK_FLASHCARDS.length - 1}
            className={`p-2 rounded-full ${
              currentCardIndex === MOCK_FLASHCARDS.length - 1
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-1">
            {MOCK_FLASHCARDS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setIsFlipped(false);
                  setCurrentCardIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === currentCardIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : bookmarkedCards.includes(MOCK_FLASHCARDS[index].id)
                    ? 'bg-yellow-400 dark:bg-yellow-300'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;