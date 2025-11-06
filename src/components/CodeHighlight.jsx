import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const CodeHighlight = ({ code, language = 'javascript' }) => {
  return (
    <Highlight
      theme={themes.vsDark}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <pre
            className={`${className} p-6 rounded-xl overflow-x-auto text-sm font-mono border`}
            style={{
              ...style,
              background: 'var(--sidebar-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
          
          {/* Gradient overlay for visual appeal */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
            style={{ background: 'var(--gradient-1)' }}
          />
        </div>
      )}
    </Highlight>
  );
};

export default CodeHighlight;