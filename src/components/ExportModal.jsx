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
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'html',
      title: 'HTML Document',
      description: 'Download as .html file (easily convert to PDF)',
      icon: FiCode,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'share',
      title: 'Share Link',
      description: 'Copy shareable link to clipboard',
      icon: FiShare2,
      gradient: 'from-purple-500 to-pink-500'
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="rounded-xl border shadow-2xl max-w-md w-full"
            style={{
              background: 'var(--bg-dark)',
              borderColor: 'var(--border-color)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold gradient-text">
                  Export Explanation
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-card-bg rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5 text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                {exportOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    disabled={!explanation}
                    className={`w-full p-4 rounded-xl border transition-all text-left hover-lift ${
                      explanation 
                        ? 'hover:border-primary' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{
                      background: 'var(--card-bg)',
                      borderColor: 'var(--border-color)',
                    }}
                    whileHover={explanation ? { scale: 1.02 } : {}}
                    whileTap={explanation ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${option.gradient}`}>
                        <SafeIcon icon={option.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-secondary">
                          {option.description}
                        </p>
                      </div>
                      <SafeIcon icon={FiDownload} className="w-4 h-4 text-muted" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {!explanation && (
                <div 
                  className="mt-6 p-4 rounded-xl border"
                  style={{
                    background: 'rgba(255, 152, 39, 0.1)',
                    borderColor: 'rgba(255, 152, 39, 0.3)',
                  }}
                >
                  <p className="text-sm text-primary">
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