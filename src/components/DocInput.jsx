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

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = [
      'text/plain', 'text/markdown', 'text/html', 'application/json',
      'text/javascript', 'text/typescript', 'text/jsx', 'text/tsx'
    ];
    
    const isAllowedType = allowedTypes.includes(file.type) || 
      file.name.match(/\.(txt|md|html|json|js|ts|jsx|tsx|py|java|cpp|c|go|rs|php|rb|swift|kt)$/i);

    if (!isAllowedType) {
      alert('Please upload a text-based file (txt, md, html, json, js, ts, jsx, tsx, py, etc.)');
      return;
    }

    setUploadedFile(file);
    
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
      className="rounded-xl border hover-lift h-full"
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Hero Section */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Explain</span> Your Documentation
          </h2>
          <p className="text-lg text-secondary">
            Transform complex technical docs into clear, actionable insights
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex rounded-xl p-1 mb-6 bg-sidebar">
          {[
            { id: 'paste', icon: FiFileText, label: 'Paste' },
            { id: 'url', icon: FiLink, label: 'URL' },
            { id: 'file', icon: FiUpload, label: 'File' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-1 text-white shadow-lg'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {activeTab === 'paste' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-semibold mb-3 gradient-text">
                Paste your documentation here
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste React hooks documentation, API docs, or any technical content you want explained..."
                className="flex-1 min-h-[300px] p-4 rounded-xl border backdrop-blur resize-none font-mono text-sm transition-all focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  background: 'var(--sidebar-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-dark)',
                }}
                disabled={isLoading}
              />
            </div>
          )}

          {activeTab === 'url' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-semibold mb-3 gradient-text">
                Enter documentation URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://reactjs.org/docs/hooks-effect.html"
                className="p-4 rounded-xl border transition-all focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{
                  background: 'var(--sidebar-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-dark)',
                }}
                disabled={isLoading}
              />
              <p className="text-xs text-muted mt-2">
                We'll extract and explain the documentation from the URL
              </p>
            </div>
          )}

          {activeTab === 'file' && (
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-semibold mb-3 gradient-text">
                Upload documentation file
              </label>
              {!uploadedFile ? (
                <div 
                  className="flex-1 border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-color)' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <SafeIcon icon={FiUpload} className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="mb-2 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted">
                    Supports: TXT, MD, HTML, JSON, JS, TS, JSX, TSX, PY and more
                  </p>
                  <p className="text-xs text-muted">
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
                  <div 
                    className="flex items-center justify-between p-4 rounded-xl border mb-4"
                    style={{
                      background: 'var(--sidebar-bg)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <SafeIcon icon={FiFile} className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-muted">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 hover:bg-card-bg rounded transition-colors"
                      disabled={isLoading}
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4 text-muted" />
                    </button>
                  </div>
                  <div 
                    className="flex-1 p-4 rounded-xl border"
                    style={{
                      background: 'var(--sidebar-bg)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <p className="text-sm text-secondary mb-2">File content preview:</p>
                    <pre className="text-xs font-mono overflow-auto max-h-48">
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
            className={`mt-6 flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-semibold transition-all ${
              isValid && !isLoading
                ? 'btn-primary text-white shadow-lg'
                : 'opacity-50 cursor-not-allowed'
            }`}
            whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
            whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                Analyzing Documentation...
              </>
            ) : (
              <>
                <SafeIcon icon={FiSend} className="w-5 h-5" />
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