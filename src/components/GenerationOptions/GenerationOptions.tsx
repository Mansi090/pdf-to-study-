import React from 'react';
import { BookOpen, HelpCircle, Square, Gamepad2 } from 'lucide-react';
import { useAppContext, GenerationType } from '../../context/AppContext';

interface OptionCardProps {
  type: GenerationType;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick 
}) => {
  return (
    <div
      className={`relative p-6 rounded-lg cursor-pointer transition-all duration-300
        ${selected 
          ? 'bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400 shadow-md' 
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md'
        }`}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
      )}
      <div className="flex flex-col items-center text-center">
        <div className={`p-3 rounded-full mb-4 ${
          selected 
            ? 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-300' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}>
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const GenerationOptions: React.FC = () => {
  const { generationType, setGenerationType, startProcessing } = useAppContext();
  
  const options = [
    {
      type: 'summary' as GenerationType,
      title: 'Summary',
      description: 'Get a concise overview of the main points for quick revision',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      type: 'mcq' as GenerationType,
      title: 'MCQs',
      description: 'Practice with multiple choice questions to test your knowledge',
      icon: <HelpCircle className="h-6 w-6" />
    },
    {
      type: 'flashcard' as GenerationType,
      title: 'Flashcards',
      description: 'Create flashcards for efficient memorization of key concepts',
      icon: <Square className="h-6 w-6" />
    },
    {
      type: 'game' as GenerationType,
      title: 'Learning Game',
      description: 'Engage with interactive games based on your material',
      icon: <Gamepad2 className="h-6 w-6" />
    }
  ];

  const handleOptionSelect = (type: GenerationType) => {
    setGenerationType(type);
    startProcessing(); // Start processing when an option is selected
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        What would you like to generate?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.type}
            type={option.type}
            title={option.title}
            description={option.description}
            icon={option.icon}
            selected={generationType === option.type}
            onClick={() => handleOptionSelect(option.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenerationOptions;