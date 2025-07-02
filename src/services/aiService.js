// AI-powered documentation analysis service
class DocumentationAnalyzer {
  constructor() {
    this.patterns = {
      // React patterns
      react: {
        hooks: /use[A-Z][a-zA-Z]*/g,
        components: /function\s+[A-Z][a-zA-Z]*|const\s+[A-Z][a-zA-Z]*\s*=|class\s+[A-Z][a-zA-Z]*/g,
        jsx: /<[A-Z][a-zA-Z]*|<\/[A-Z][a-zA-Z]*>/g,
        props: /props\.|{.*props.*}/g
      },
      // JavaScript patterns
      javascript: {
        functions: /function\s+\w+|const\s+\w+\s*=\s*\(|=>\s*{/g,
        classes: /class\s+\w+/g,
        async: /async\s+|await\s+/g,
        promises: /\.then\(|\.catch\(|Promise\./g
      },
      // API patterns
      api: {
        endpoints: /\/api\/|GET|POST|PUT|DELETE|PATCH/g,
        http: /fetch\(|axios\.|XMLHttpRequest/g,
        json: /JSON\.|\.json\(\)/g
      },
      // CSS patterns
      css: {
        selectors: /\.[a-zA-Z-]+|#[a-zA-Z-]+|\w+:/g,
        properties: /[a-zA-Z-]+\s*:/g,
        responsive: /@media|@keyframes/g
      }
    };
  }

  analyzeContent(content) {
    const analysis = {
      type: 'general',
      complexity: 'beginner',
      topics: [],
      codeBlocks: [],
      keyTerms: [],
      framework: null
    };

    // Detect framework/library
    if (this.containsPattern(content, this.patterns.react.hooks) || 
        this.containsPattern(content, this.patterns.react.jsx)) {
      analysis.framework = 'React';
      analysis.type = 'react';
    } else if (this.containsPattern(content, this.patterns.javascript.functions)) {
      analysis.framework = 'JavaScript';
      analysis.type = 'javascript';
    } else if (this.containsPattern(content, this.patterns.api.endpoints)) {
      analysis.framework = 'API';
      analysis.type = 'api';
    } else if (this.containsPattern(content, this.patterns.css.properties)) {
      analysis.framework = 'CSS';
      analysis.type = 'css';
    }

    // Extract code blocks
    const codeBlockRegex = /```[\s\S]*?```|`[^`]+`/g;
    analysis.codeBlocks = content.match(codeBlockRegex) || [];

    // Determine complexity
    const complexityIndicators = [
      /async|await|Promise/g,
      /class\s+\w+.*extends/g,
      /interface\s+\w+|type\s+\w+/g,
      /generic|<T>|<[A-Z]\w*>/g,
      /callback|closure|higher-order/gi
    ];

    let complexityScore = 0;
    complexityIndicators.forEach(pattern => {
      if (pattern.test(content)) complexityScore++;
    });

    if (complexityScore >= 3) analysis.complexity = 'advanced';
    else if (complexityScore >= 1) analysis.complexity = 'intermediate';

    // Extract key terms
    analysis.keyTerms = this.extractKeyTerms(content);
    analysis.topics = this.identifyTopics(content);

    return analysis;
  }

  containsPattern(content, pattern) {
    return pattern.test(content);
  }

  extractKeyTerms(content) {
    const terms = new Set();
    
    // Technical terms
    const technicalTerms = [
      'component', 'hook', 'state', 'props', 'render', 'effect',
      'async', 'await', 'promise', 'callback', 'closure', 'scope',
      'api', 'endpoint', 'request', 'response', 'http', 'json',
      'css', 'selector', 'property', 'responsive', 'flexbox', 'grid'
    ];

    technicalTerms.forEach(term => {
      if (content.toLowerCase().includes(term)) {
        terms.add(term);
      }
    });

    return Array.from(terms);
  }

  identifyTopics(content) {
    const topics = [];
    const contentLower = content.toLowerCase();

    const topicMap = {
      'State Management': ['state', 'usestate', 'reducer', 'context'],
      'Side Effects': ['useeffect', 'effect', 'lifecycle', 'cleanup'],
      'Event Handling': ['onclick', 'onchange', 'event', 'handler'],
      'Data Fetching': ['fetch', 'api', 'axios', 'request', 'response'],
      'Styling': ['css', 'style', 'class', 'selector', 'responsive'],
      'Performance': ['memo', 'callback', 'usememo', 'optimization'],
      'Forms': ['form', 'input', 'validation', 'submit'],
      'Routing': ['route', 'navigate', 'link', 'router']
    };

    Object.entries(topicMap).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => contentLower.includes(keyword))) {
        topics.push(topic);
      }
    });

    return topics;
  }
}

// Dynamic explanation generator
export class ExplanationGenerator {
  constructor() {
    this.analyzer = new DocumentationAnalyzer();
  }

  async generateExplanation(content, sourceType = 'paste') {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    const analysis = this.analyzer.analyzeContent(content);
    
    return {
      summary: this.generateSummary(content, analysis),
      analogy: this.generateAnalogy(content, analysis),
      codeExample: this.generateCodeExample(content, analysis),
      useCases: this.generateUseCases(content, analysis),
      keyPoints: this.generateKeyPoints(content, analysis)
    };
  }

  generateSummary(content, analysis) {
    const summaryTemplates = {
      react: [
        `This ${analysis.framework} documentation explains ${analysis.topics.join(' and ').toLowerCase()} concepts that are essential for building modern React applications. `,
        `The content covers ${analysis.complexity}-level React patterns including ${analysis.keyTerms.slice(0, 3).join(', ')}. `,
        `Understanding these concepts will help you write more efficient and maintainable React components. `,
        `${analysis.topics.length > 0 ? `Key areas include ${analysis.topics.join(', ')}.` : 'This covers fundamental React development patterns.'}`
      ],
      javascript: [
        `This JavaScript documentation covers ${analysis.complexity}-level concepts including ${analysis.keyTerms.slice(0, 3).join(', ')}. `,
        `The material explains core JavaScript functionality that's essential for modern web development. `,
        `These concepts form the foundation for understanding more advanced JavaScript patterns. `,
        `${analysis.topics.length > 0 ? `Main topics include ${analysis.topics.join(', ')}.` : 'This focuses on essential JavaScript fundamentals.'}`
      ],
      api: [
        `This API documentation explains how to interact with web services and handle data communication. `,
        `It covers ${analysis.complexity}-level concepts including ${analysis.keyTerms.slice(0, 3).join(', ')}. `,
        `Understanding these patterns is crucial for building applications that communicate with external services. `,
        `${analysis.topics.length > 0 ? `Key areas covered: ${analysis.topics.join(', ')}.` : 'This focuses on API integration patterns.'}`
      ],
      general: [
        `This technical documentation explains ${analysis.complexity}-level concepts that are important for software development. `,
        `The content covers ${analysis.keyTerms.slice(0, 3).join(', ')} and related topics. `,
        `These concepts will help you understand and implement the described functionality effectively. `,
        `${analysis.topics.length > 0 ? `Main areas include ${analysis.topics.join(', ')}.` : 'This provides essential technical knowledge.'}`
      ]
    };

    const templates = summaryTemplates[analysis.type] || summaryTemplates.general;
    return templates.join('');
  }

  generateAnalogy(content, analysis) {
    const analogies = {
      react: [
        "Think of React components like LEGO blocks - each component is a reusable piece that you can combine with others to build complex structures. Props are like the connection points that let blocks share information, while state is like the internal memory that helps each block remember its current configuration.",
        "React is like a smart assistant that watches your data and automatically updates your website when anything changes. It's like having a personal secretary who immediately rewrites your presentation slides whenever you change the underlying data.",
        "Using React hooks is like having a toolbox where each tool has a specific purpose. useState is your memory tool, useEffect is your scheduling assistant, and other hooks are specialized tools that help you solve specific problems."
      ],
      javascript: [
        "JavaScript functions are like recipes in a cookbook - they take ingredients (parameters), follow specific steps, and produce a result. You can use the same recipe over and over with different ingredients to get different outcomes.",
        "Think of JavaScript promises like ordering food at a restaurant. You place your order (make the request), get a receipt with a promise that your food will come (the Promise object), and then either receive your meal (resolve) or get told the kitchen is out of ingredients (reject).",
        "JavaScript closures are like a backpack that a function carries around. Even when the function travels to different parts of your code, it still has access to all the variables it packed in its backpack from where it was created."
      ],
      api: [
        "APIs are like waiters in a restaurant. You (the client) tell the waiter (API) what you want from the menu (available endpoints), and the waiter goes to the kitchen (server) to get your order and brings back your food (data).",
        "Think of API endpoints like different departments in a company. Each department (endpoint) handles specific types of requests - HR for employee data, Accounting for financial data, etc. You need to know which department to contact for what you need.",
        "API authentication is like having a membership card at an exclusive club. You show your card (API key) at the door, and if it's valid, you get access to all the club's services. Without it, you're turned away."
      ],
      general: [
        "Think of this technical concept like learning to drive a car. At first, all the controls seem overwhelming, but once you understand what each part does and practice using them together, it becomes second nature.",
        "This is like learning a new language - you start with basic vocabulary (core concepts), learn grammar rules (syntax and patterns), and then practice combining words into sentences (implementing solutions).",
        "Understanding this documentation is like following a detailed map. It shows you where you are (current state), where you want to go (desired outcome), and the best routes to get there (implementation steps)."
      ]
    };

    const typeAnalogies = analogies[analysis.type] || analogies.general;
    return typeAnalogies[Math.floor(Math.random() * typeAnalogies.length)];
  }

  generateCodeExample(content, analysis) {
    // Extract existing code or generate relevant example
    if (analysis.codeBlocks.length > 0) {
      // Clean up the first code block
      return analysis.codeBlocks[0].replace(/```[\w]*\n?|```/g, '').trim();
    }

    const examples = {
      react: `import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}`,
      javascript: `// Example implementation
function processData(input) {
  return new Promise((resolve, reject) => {
    // Simulate async processing
    setTimeout(() => {
      if (input && input.length > 0) {
        const result = input.map(item => ({
          ...item,
          processed: true,
          timestamp: Date.now()
        }));
        resolve(result);
      } else {
        reject(new Error('Invalid input data'));
      }
    }, 1000);
  });
}

// Usage
processData(myData)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));`,
      api: `// API interaction example
const apiClient = {
  baseURL: 'https://api.example.com',
  
  async get(endpoint) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }
};

// Usage
const userData = await apiClient.get('/users/123');
const newUser = await apiClient.post('/users', { name: 'John', email: 'john@example.com' });`,
      general: `// Example implementation based on the documentation
function implementFeature(config) {
  // Initialize with default settings
  const settings = {
    enabled: true,
    timeout: 5000,
    retries: 3,
    ...config
  };
  
  // Main implementation logic
  return {
    execute: async (data) => {
      let attempts = 0;
      
      while (attempts < settings.retries) {
        try {
          const result = await processWithTimeout(data, settings.timeout);
          return { success: true, data: result };
        } catch (error) {
          attempts++;
          if (attempts >= settings.retries) {
            throw error;
          }
          await delay(1000 * attempts); // Exponential backoff
        }
      }
    },
    
    configure: (newConfig) => {
      Object.assign(settings, newConfig);
    }
  };
}`
    };

    return examples[analysis.type] || examples.general;
  }

  generateUseCases(content, analysis) {
    const useCaseTemplates = {
      react: [
        "Building interactive user interfaces with dynamic data",
        "Managing component state and handling user interactions",
        "Fetching and displaying data from APIs",
        "Creating reusable components for consistent UI patterns",
        "Implementing form handling and validation"
      ],
      javascript: [
        "Processing and transforming data in web applications",
        "Handling asynchronous operations and API calls",
        "Creating interactive functionality on websites",
        "Building reusable utility functions and modules",
        "Implementing business logic and data validation"
      ],
      api: [
        "Integrating third-party services into your application",
        "Building client-server communication for web apps",
        "Creating data synchronization between different systems",
        "Implementing authentication and authorization flows",
        "Handling real-time data updates and notifications"
      ],
      general: [
        "Implementing the specific functionality described in the documentation",
        "Solving common development challenges in your projects",
        "Building scalable and maintainable software solutions",
        "Following best practices for code organization and structure",
        "Creating robust error handling and edge case management"
      ]
    };

    const templates = useCaseTemplates[analysis.type] || useCaseTemplates.general;
    
    // Customize based on identified topics
    if (analysis.topics.length > 0) {
      const customUseCases = analysis.topics.map(topic => 
        `When working with ${topic.toLowerCase()} in your applications`
      );
      return [...customUseCases, ...templates.slice(0, 3)];
    }

    return templates.slice(0, 4);
  }

  generateKeyPoints(content, analysis) {
    const keyPointTemplates = {
      react: [
        "Components should be pure functions that render the same output for the same props",
        "Always use the dependency array in useEffect to control when effects run",
        "State updates are asynchronous and may be batched for performance",
        "Break down complex components into smaller, focused components",
        "Use proper key props when rendering lists to help React optimize updates"
      ],
      javascript: [
        "Understand the difference between synchronous and asynchronous code execution",
        "Always handle errors properly with try-catch blocks or .catch() methods",
        "Use const and let instead of var for better scope management",
        "Functions are first-class objects and can be passed as arguments",
        "Be aware of 'this' binding context in different function types"
      ],
      api: [
        "Always validate and sanitize data received from external APIs",
        "Implement proper error handling for network failures and timeouts",
        "Use appropriate HTTP methods (GET, POST, PUT, DELETE) for different operations",
        "Include proper authentication headers and handle token expiration",
        "Consider rate limiting and implement retry logic for failed requests"
      ],
      general: [
        "Read the documentation thoroughly before implementing",
        "Test your implementation with different inputs and edge cases",
        "Follow the recommended patterns and best practices",
        "Consider performance implications and optimization opportunities",
        "Keep your code clean, readable, and well-documented"
      ]
    };

    const templates = keyPointTemplates[analysis.type] || keyPointTemplates.general;
    
    // Add specific points based on analysis
    const specificPoints = [];
    if (analysis.complexity === 'advanced') {
      specificPoints.push("This is an advanced topic - make sure you understand the fundamentals first");
    }
    if (analysis.keyTerms.length > 0) {
      specificPoints.push(`Key terminology to remember: ${analysis.keyTerms.slice(0, 3).join(', ')}`);
    }

    return [...specificPoints, ...templates.slice(0, 4 - specificPoints.length)];
  }
}

// Export the service
const explanationGenerator = new ExplanationGenerator();
export const generateDynamicExplanation = (content, sourceType) => 
  explanationGenerator.generateExplanation(content, sourceType);