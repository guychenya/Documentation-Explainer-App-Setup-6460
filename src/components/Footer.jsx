import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiClock, FiShare2, FiDownload } from 'react-icons/fi';

const Footer = ({ explanation, onExport }) => {
  return (
    <motion.footer 
      className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors">
              <SafeIcon icon={FiClock} className="w-4 h-4" />
              <span className="text-sm">Recently Explained</span>
            </button>
            <button 
              onClick={() => onExport && onExport('share')}
              className="flex items-center gap-2 text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors"
            >
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            <button 
              onClick={() => onExport && onExport('download')}
              disabled={!explanation}
              className={`flex items-center gap-2 transition-colors ${
                explanation 
                  ? 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text cursor-pointer' 
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-dark-muted">
            Made with ❤️ for developers who want clarity
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;