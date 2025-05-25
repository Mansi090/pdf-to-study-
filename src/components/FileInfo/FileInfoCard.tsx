import React from 'react';
import { FileText, Clock, HardDrive } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileInfoCard: React.FC = () => {
  const { fileInfo } = useAppContext();
  
  if (!fileInfo) return null;
  
  const fileDate = new Date(fileInfo.lastModified).toLocaleString();
  const fileType = fileInfo.type.includes('pdf') ? 'PDF Document' : 'Word Document';
  
  return (
    <div className="mt-6 w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
            {fileInfo.name}
          </h3>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <HardDrive className="h-3.5 w-3.5 mr-1" />
              <span>{formatFileSize(fileInfo.size)}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mr-1.5"></span>
              <span>{fileType}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{fileDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfoCard;