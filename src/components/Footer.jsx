import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiClock, FiShare2, FiDownload, FiHeart } from 'react-icons/fi';

const Footer = ({ explanation, onExport }) => {
  return (
    <motion.footer 
      className="border-t backdrop-blur"
      style={{
        background: 'rgba(14, 9, 24, 0.8)',
        borderColor: 'var(--border-color)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <motion.button 
              className="flex items-center gap-2 text-secondary hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <SafeIcon icon={FiClock} className="w-4 h-4" />
              <span className="text-sm font-medium">Recently Explained</span>
            </motion.button>
            
            <motion.button
              onClick={() => onExport && onExport('share')}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </motion.button>
            
            <motion.button
              onClick={() => onExport && onExport('download')}
              disabled={!explanation}
              className={`flex items-center gap-2 transition-all ${
                explanation 
                  ? 'text-secondary hover:text-primary cursor-pointer' 
                  : 'text-muted cursor-not-allowed'
              }`}
              whileHover={explanation ? { scale: 1.05 } : {}}
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-accent" />
            <span>for developers who want</span>
            <span className="gradient-text font-semibold">clarity</span>
          </div>
        </div>

        {/* Additional footer content */}
        <div className="mt-8 pt-6 border-t border-opacity-20" style={{ borderColor: 'var(--border-color)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 gradient-text">Features</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li>AI-powered explanations</li>
                <li>Multiple input formats</li>
                <li>Export capabilities</li>
                <li>Real-time analysis</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 gradient-text">Supported Formats</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li>Markdown & HTML</li>
                <li>JavaScript & TypeScript</li>
                <li>API Documentation</li>
                <li>Code Snippets</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 gradient-text">Export Options</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li>Markdown files</li>
                <li>HTML documents</li>
                <li>Shareable links</li>
                <li>PDF ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;