import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiCode, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-opacity-80 border-b"
      style={{
        background: 'rgba(14, 9, 24, 0.8)',
        borderColor: 'var(--border-color)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-2 rounded-xl bg-gradient-1">
            <SafeIcon icon={FiCode} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              DocExplainer
            </h1>
            <p className="text-sm opacity-70 hidden sm:block">
              Paste Docs, Get Clarity
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#export" className="text-sm font-medium hover:text-primary transition-colors">
            Export
          </a>
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card-bg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon 
              icon={isDark ? FiSun : FiMoon} 
              className="w-5 h-5 text-primary" 
            />
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-card-bg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon 
              icon={isMenuOpen ? FiX : FiMenu} 
              className="w-5 h-5 text-primary" 
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden backdrop-blur border-t"
          style={{
            background: 'rgba(14, 9, 24, 0.9)',
            borderColor: 'var(--border-color)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="container mx-auto px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="block text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#export" className="block text-sm font-medium hover:text-primary transition-colors">
              Export
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;