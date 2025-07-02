import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import DocInput from './components/DocInput';
import ExplanationDisplay from './components/ExplanationDisplay';
import Footer from './components/Footer';
import ExportModal from './components/ExportModal';
import { mockExplainDocumentation } from './services/mockApi';
import { exportToMarkdown, exportToPDF, shareContent, downloadAsFile } from './services/exportService';

function App() {
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExplain = async (input, type) => {
    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const result = await mockExplainDocumentation(input, type);
      setExplanation(result);
    } catch (err) {
      setError(err.message || 'Failed to explain documentation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!explanation) return;

    try {
      switch (format) {
        case 'markdown':
          const markdownContent = exportToMarkdown(explanation);
          downloadAsFile(markdownContent, 'documentation-explanation.md', 'text/markdown');
          break;
        
        case 'html':
          await exportToPDF(explanation);
          break;
        
        case 'share':
          await shareContent(explanation);
          break;
        
        case 'download':
          setShowExportModal(true);
          break;
        
        default:
          console.log('Unknown export format:', format);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[calc(100vh-200px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Panel - Input */}
          <div className="lg:col-span-2">
            <DocInput onExplain={handleExplain} isLoading={isLoading} />
          </div>

          {/* Right Panel - Output */}
          <div className="lg:col-span-3">
            <ExplanationDisplay 
              explanation={explanation} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </motion.div>
      </main>

      <Footer explanation={explanation} onExport={handleExport} />
      
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        explanation={explanation}
      />
    </div>
  );
}

export default App;