import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const CodeHighlight = ({ code, language = 'javascript' }) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <pre 
            className={`${className} p-4 rounded-lg overflow-x-auto text-sm font-mono`}
            style={{
              ...style,
              backgroundColor: '#0a0a0a',
              border: '1px solid #1a1a1a'
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
        </div>
      )}
    </Highlight>
  );
};

export default CodeHighlight;