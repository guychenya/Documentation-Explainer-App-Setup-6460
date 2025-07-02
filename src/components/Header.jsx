import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiCode, FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.header 
      className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border sticky top-0 z-50 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-dark-accent rounded-lg">
            <SafeIcon icon={FiCode} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-dark-text">
              DocExplainer
            </h1>
            <p className="text-sm text-gray-600 dark:text-dark-muted hidden sm:block">
              Paste Docs, Get Clarity
            </p>
          </div>
        </div>

        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-dark-input hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon 
            icon={isDark ? FiSun : FiMoon} 
            className="w-5 h-5 text-gray-600 dark:text-dark-muted" 
          />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;