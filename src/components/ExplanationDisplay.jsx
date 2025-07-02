import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CodeHighlight from './CodeHighlight';
import { FiBook, FiZap, FiCode, FiTarget, FiList, FiLoader, FiAlertCircle } from 'react-icons/fi';

const ExplanationDisplay = ({ explanation, isLoading, error }) => {
  if (isLoading) {
    return (
      <motion.div 
        className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm h-full flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <SafeIcon icon={FiLoader} className="w-8 h-8 text-dark-accent animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-dark-muted">
            Analyzing documentation and generating explanation...
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-white dark:bg-dark-card rounded-xl border border-red-200 dark:border-red-800 shadow-sm h-full flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center p-8">
          <SafeIcon icon={FiAlertCircle} className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 dark:text-dark-muted text-sm">
            {error}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!explanation) {
    return (
      <motion.div 
        className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm h-full flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center p-8">
          <SafeIcon icon={FiBook} className="w-12 h-12 text-gray-400 dark:text-dark-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">
            Ready to Explain
          </h3>
          <p className="text-gray-600 dark:text-dark-muted">
            Paste documentation, enter a URL, or upload a file to get started
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm h-full overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="space-y-8">
          {/* Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-dark-accent" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                Summary
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {explanation.summary.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-dark-text leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Analogy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiZap} className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                Simple Analogy
              </h2>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
              <p className="text-gray-700 dark:text-dark-text leading-relaxed">
                {explanation.analogy}
              </p>
            </div>
          </motion.section>

          {/* Code Example */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiCode} className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                Code Example
              </h2>
            </div>
            <CodeHighlight code={explanation.codeExample} language="javascript" />
          </motion.section>

          {/* Use Cases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                When to Use This
              </h2>
            </div>
            <div className="grid gap-3">
              {explanation.useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-dark-text">{useCase}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Key Points */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiList} className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                Key Points to Remember
              </h2>
            </div>
            <div className="space-y-3">
              {explanation.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-dark-text">{point}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplanationDisplay;