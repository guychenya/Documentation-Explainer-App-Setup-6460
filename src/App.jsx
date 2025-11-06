import React, { useState, useEffect } from 'react';
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

  // Initialize theme
  useEffect(() => {
    // Theme is now handled by the useTheme hook in Header
    document.body.style.transition = 'all 0.3s ease';
  }, []);

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
    <div className="min-h-screen transition-all duration-300">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl" style={{ marginTop: '80px' }}>
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Complex
            <br />
            <span className="gradient-text">Documentation</span>
            <br />
            into Clear Insights
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Paste any technical documentation and get AI-powered explanations with practical examples, 
            analogies, and actionable insights.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

        {/* Features Section */}
        <motion.section
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-12">
            Why Choose <span className="gradient-text">DocExplainer</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms break down complex documentation into digestible insights',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Multiple Input Formats',
                description: 'Support for paste, URL, and file uploads with various programming languages',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Export & Share',
                description: 'Download explanations as Markdown, HTML, or share with your team instantly',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border hover-lift"
                style={{
                  background: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} mx-auto mb-4`}></div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
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