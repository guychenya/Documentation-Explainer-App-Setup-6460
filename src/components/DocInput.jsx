import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiFileText, FiLink, FiUpload, FiSend, FiLoader, FiX, FiFile } from 'react-icons/fi';

const DocInput = ({ onExplain, isLoading }) => {
  const [activeTab, setActiveTab] = useState('paste');
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let content = '';
    
    if (activeTab === 'paste') {
      content = input;
    } else if (activeTab === 'url') {
      content = url;
    } else if (activeTab === 'file') {
      content = fileContent;
    }
    
    if (content.trim()) {
      onExplain(content, activeTab);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'text/html',
      'application/json',
      'text/javascript',
      'text/typescript',
      'text/jsx',
      'text/tsx'
    ];

    const isAllowedType = allowedTypes.includes(file.type) || 
      file.name.match(/\.(txt|md|html|json|js|ts|jsx|tsx|py|java|cpp|c|go|rs|php|rb|swift|kt)$/i);

    if (!isAllowedType) {
      alert('Please upload a text-based file (txt, md, html, json, js, ts, jsx, tsx, py, etc.)');
      return;
    }

    setUploadedFile(file);

    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isValid = 
    (activeTab === 'paste' && input.trim().length > 0) ||
    (activeTab === 'url' && url.trim().length > 0) ||
    (activeTab === 'file' && fileContent.trim().length > 0);

  return (
    <motion.div 
      className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-dark-surface rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'paste'
                ? 'bg-white dark:bg-dark-hover text-gray-900 dark:text-dark-text shadow-sm'
                : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
            }`}
          >
            <SafeIcon icon={FiFileText} className="w-4 h-4" />
            Paste
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'url'
                ? 'bg-white dark:bg-dark-hover text-gray-900 dark:text-dark-text shadow-sm'
                : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
            }`}
          >
            <SafeIcon icon={FiLink} className="w-4 h-4" />
            URL
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'file'
                ? 'bg-white dark:bg-dark-hover text-gray-900 dark:text-dark-text shadow-sm'
                : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
            }`}
          >
            <SafeIcon icon={FiUpload} className="w-4 h-4" />
            File
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {activeTab === 'paste' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                Paste your documentation here
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste React hooks documentation, API docs, or any technical content you want explained..."
                className="flex-1 min-h-[300px] p-4 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-input text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-muted focus:ring-2 focus:ring-dark-accent focus:border-transparent resize-none font-mono text-sm"
                disabled={isLoading}
              />
            </div>
          )}

          {activeTab === 'url' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                Enter documentation URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://reactjs.org/docs/hooks-effect.html"
                className="p-4 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-input text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-muted focus:ring-2 focus:ring-dark-accent focus:border-transparent"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-2">
                We'll extract and explain the documentation from the URL
              </p>
            </div>
          )}

          {activeTab === 'file' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                Upload documentation file
              </label>
              
              {!uploadedFile ? (
                <div 
                  className="flex-1 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 text-center hover:border-dark-accent dark:hover:border-dark-accent transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 dark:text-dark-muted mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-dark-muted mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-dark-muted">
                    Supports: TXT, MD, HTML, JSON, JS, TS, JSX, TSX, PY and more
                  </p>
                  <p className="text-xs text-gray-500 dark:text-dark-muted">
                    Max file size: 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.md,.html,.json,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.swift,.kt"
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-input rounded-lg border border-gray-200 dark:border-dark-border mb-4">
                    <div className="flex items-center gap-3">
                      <SafeIcon icon={FiFile} className="w-5 h-5 text-dark-accent" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-muted">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded transition-colors"
                      disabled={isLoading}
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
                    </button>
                  </div>
                  
                  <div className="flex-1 p-4 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-input">
                    <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">File content preview:</p>
                    <pre className="text-xs font-mono text-gray-800 dark:text-dark-text overflow-auto max-h-48">
                      {fileContent.slice(0, 500)}{fileContent.length > 500 ? '...' : ''}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={!isValid || isLoading}
            className={`mt-6 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
              isValid && !isLoading
                ? 'bg-dark-accent hover:bg-dark-accent-hover text-white shadow-sm'
                : 'bg-gray-300 dark:bg-dark-border text-gray-500 dark:text-dark-muted cursor-not-allowed'
            }`}
            whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
            whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-4 h-4 animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <SafeIcon icon={FiSend} className="w-4 h-4" />
                Explain Documentation
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default DocInput;