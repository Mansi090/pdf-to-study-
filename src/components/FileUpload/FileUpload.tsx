import React, { useState, useCallback } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const FileUpload: React.FC = () => {
  const { setFile, setFileInfo } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only PDF and DOCX files are supported');
      return false;
    }
    
    // 20MB max size
    if (file.size > 20 * 1024 * 1024) {
      setFileError('File size must be less than 20MB');
      return false;
    }
    
    setFileError(null);
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      setFile(file);
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    }
  }, [setFile, setFileInfo]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, [handleFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
            : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
        } transition-colors duration-200 ease-in-out`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FileText className="h-10 w-10" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Upload your study material
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Drag and drop your PDF or DOCX file here, or click to browse
            </p>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Max file size: 20MB
            </p>
          </div>
          <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 ease-in-out">
            <span>Select File</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
          </label>
          {fileError && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <X className="h-4 w-4 mr-1" />
              {fileError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;