import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FileUpload from './components/FileUpload/FileUpload';
import FileInfoCard from './components/FileInfo/FileInfoCard';
import GenerationOptions from './components/GenerationOptions/GenerationOptions';
import ProcessingIndicator from './components/Processing/ProcessingIndicator';
import SummaryViewer from './components/Viewers/SummaryViewer';
import MCQViewer from './components/Viewers/MCQViewer';
import FlashcardViewer from './components/Viewers/FlashcardViewer';
import { useAppContext } from './context/AppContext';

const MainContent: React.FC = () => {
  const { file, fileInfo, generationType, isProcessing, isGenerated } = useAppContext();

  const renderContent = () => {
    if (isProcessing) {
      return <ProcessingIndicator />;
    }

    if (isGenerated) {
      switch (generationType) {
        case 'summary':
          return <SummaryViewer />;
        case 'mcq':
          return <MCQViewer />;
        case 'flashcard':
          return <FlashcardViewer />;
        case 'game':
          return <div>Game viewer coming soon!</div>;
        default:
          return null;
      }
    }

    if (file) {
      return (
        <>
          <FileInfoCard />
          <GenerationOptions />
        </>
      );
    }

    return <FileUpload />;
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      {renderContent()}
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;