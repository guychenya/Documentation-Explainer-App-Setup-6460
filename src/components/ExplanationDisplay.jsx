import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CodeHighlight from './CodeHighlight';
import { FiBook, FiZap, FiCode, FiTarget, FiList, FiLoader, FiAlertCircle } from 'react-icons/fi';

const ExplanationDisplay = ({ explanation, isLoading, error }) => {
  if (isLoading) {
    return (
      <motion.div 
        className="rounded-xl border hover-lift h-full flex items-center justify-center"
        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-1 mx-auto flex items-center justify-center">
              <SafeIcon icon={FiLoader} className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-1 opacity-20 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-bold mb-2 gradient-text">
            Analyzing Documentation
          </h3>
          <p className="text-secondary">
            Our AI is breaking down your content into digestible insights...
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="rounded-xl border h-full flex items-center justify-center"
        style={{
          background: 'var(--card-bg)',
          borderColor: 'rgba(255, 109, 146, 0.3)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mx-auto flex items-center justify-center mb-4">
            <SafeIcon icon={FiAlertCircle} className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-red-400">
            Something went wrong
          </h3>
          <p className="text-secondary text-sm">
            {error}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!explanation) {
    return (
      <motion.div 
        className="rounded-xl border hover-lift h-full flex items-center justify-center"
        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-2 mx-auto flex items-center justify-center mb-6">
            <SafeIcon icon={FiBook} className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Ready to <span className="gradient-text">Explain</span>
          </h3>
          <p className="text-lg text-secondary">
            Paste documentation, enter a URL, or upload a file to get started
          </p>
        </div>
      </motion.div>
    );
  }

  const sections = [
    {
      id: 'summary',
      title: 'Summary',
      icon: FiBook,
      color: 'text-primary',
      delay: 0.1
    },
    {
      id: 'analogy',
      title: 'Simple Analogy',
      icon: FiZap,
      color: 'text-yellow-500',
      delay: 0.2
    },
    {
      id: 'codeExample',
      title: 'Code Example',
      icon: FiCode,
      color: 'text-green-500',
      delay: 0.3
    },
    {
      id: 'useCases',
      title: 'When to Use This',
      icon: FiTarget,
      color: 'text-blue-500',
      delay: 0.4
    },
    {
      id: 'keyPoints',
      title: 'Key Points to Remember',
      icon: FiList,
      color: 'text-purple-500',
      delay: 0.5
    }
  ];

  return (
    <motion.div 
      className="rounded-xl border hover-lift h-full overflow-hidden"
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="space-y-8">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: section.delay }}
              className="hover-lift"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-1`}>
                  <SafeIcon icon={section.icon} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold gradient-text">
                  {section.title}
                </h2>
              </div>

              {section.id === 'summary' && (
                <div className="prose prose-gray max-w-none">
                  {explanation.summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed mb-4 text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.id === 'analogy' && (
                <div 
                  className="rounded-xl p-6 border"
                  style={{
                    background: 'var(--gradient-2)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <p className="text-white leading-relaxed font-medium">
                    {explanation.analogy}
                  </p>
                </div>
              )}

              {section.id === 'codeExample' && (
                <div className="rounded-xl overflow-hidden">
                  <CodeHighlight 
                    code={explanation.codeExample} 
                    language="javascript" 
                  />
                </div>
              )}

              {section.id === 'useCases' && (
                <div className="grid gap-4">
                  {explanation.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl border hover-lift"
                      style={{
                        background: 'var(--sidebar-bg)',
                        borderColor: 'var(--border-color)',
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-6 h-6 bg-gradient-1 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-secondary">{useCase}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {section.id === 'keyPoints' && (
                <div className="space-y-4">
                  {explanation.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl border hover-lift"
                      style={{
                        background: 'var(--sidebar-bg)',
                        borderColor: 'var(--border-color)',
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-8 h-8 bg-gradient-2 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-secondary pt-1">{point}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExplanationDisplay;