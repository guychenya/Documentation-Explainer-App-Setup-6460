import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiX, FiDownload, FiFileText, FiCode, FiShare2 } from 'react-icons/fi';

const ExportModal = ({ isOpen, onClose, onExport, explanation }) => {
  const exportOptions = [
    {
      id: 'markdown',
      title: 'Markdown File',
      description: 'Download as .md file for documentation',
      icon: FiFileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'html',
      title: 'HTML Document',
      description: 'Download as .html file (easily convert to PDF)',
      icon: FiCode,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 'share',
      title: 'Share Link',
      description: 'Copy shareable link to clipboard',
      icon: FiShare2,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const handleExport = (format) => {
    onExport(format);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-xl max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                  Export Explanation
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500 dark:text-dark-muted" />
                </button>
              </div>

              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    disabled={!explanation}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      explanation
                        ? 'border-gray-200 dark:border-dark-border hover:border-dark-accent dark:hover:border-dark-accent hover:shadow-sm'
                        : 'border-gray-200 dark:border-dark-border opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${option.bgColor}`}>
                        <SafeIcon icon={option.icon} className={`w-5 h-5 ${option.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-dark-text">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-dark-muted">
                          {option.description}
                        </p>
                      </div>
                      <SafeIcon 
                        icon={FiDownload} 
                        className="w-4 h-4 text-gray-400 dark:text-dark-muted" 
                      />
                    </div>
                  </button>
                ))}
              </div>

              {!explanation && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Generate an explanation first to enable export options.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;