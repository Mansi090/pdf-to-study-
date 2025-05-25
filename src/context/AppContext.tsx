import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export type GenerationType = 'summary' | 'mcq' | 'flashcard' | 'game' | null;

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface AppContextType {
  file: File | null;
  fileInfo: FileInfo | null;
  generationType: GenerationType;
  isProcessing: boolean;
  processingProgress: number;
  isGenerated: boolean;
  setFile: (file: File | null) => void;
  setFileInfo: (fileInfo: FileInfo | null) => void;
  setGenerationType: (type: GenerationType) => void;
  startProcessing: () => void;
  completeProcessing: () => void;
  resetState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [generationType, setGenerationType] = useState<GenerationType>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Mock progress updates
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setIsGenerated(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const completeProcessing = () => {
    setIsProcessing(false);
    setIsGenerated(true);
  };

  const resetState = () => {
    setFile(null);
    setFileInfo(null);
    setGenerationType(null);
    setIsProcessing(false);
    setProcessingProgress(0);
    setIsGenerated(false);
  };

  return (
    <AppContext.Provider
      value={{
        file,
        fileInfo,
        generationType,
        isProcessing,
        processingProgress,
        isGenerated,
        setFile,
        setFileInfo,
        setGenerationType,
        startProcessing,
        completeProcessing,
        resetState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};