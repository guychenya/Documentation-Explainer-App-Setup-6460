// Enhanced API service with dynamic content analysis
import { generateDynamicExplanation } from './aiService';

// Fallback explanations for when content is too short or unclear
const FALLBACK_EXPLANATIONS = {
  'short_content': {
    summary: `This appears to be a brief code snippet or documentation fragment. While the content is limited, it likely represents a specific programming concept or technique that's commonly used in software development. To provide a more comprehensive explanation, it would be helpful to have more context about the surrounding code, the problem it's solving, or the broader system it's part of. Even small code snippets can contain important patterns and principles that are worth understanding thoroughly.`,
    analogy: `Think of this like seeing a single puzzle piece - you can tell it's part of something bigger and might even recognize the pattern or color scheme, but you need more pieces to see the complete picture. This code snippet is similar - it's a small but potentially important piece of a larger solution.`,
    codeExample: `// This is a minimal example based on the provided content
// In a real implementation, this would be part of a larger system

function processInput(input) {
  // Validate input
  if (!input) {
    throw new Error('Input is required');
  }
  
  // Process the input based on the pattern shown
  const result = transformData(input);
  
  return result;
}

// Usage example
try {
  const output = processInput(userInput);
  console.log('Result:', output);
} catch (error) {
  console.error('Error:', error.message);
}`,
    useCases: [
      "As part of a larger application or system",
      "When you need to implement similar functionality in your project",
      "As a reference for understanding common programming patterns",
      "When building reusable utility functions or components"
    ],
    keyPoints: [
      "Even small code snippets can demonstrate important programming principles",
      "Context is crucial for understanding the full purpose and implementation",
      "Look for patterns that can be applied to similar problems",
      "Consider how this fits into the broader architecture of your application",
      "Test edge cases and error conditions when implementing similar code"
    ]
  },
  'url_content': {
    summary: `This documentation from an external URL contains technical information that developers can use to understand and implement specific functionality. Web-based documentation often includes comprehensive guides, API references, tutorials, and examples that cover both basic usage and advanced scenarios. The content typically follows standard documentation patterns with explanations, code samples, and best practices. Understanding how to read and apply web documentation is a crucial skill for developers, as it allows you to integrate external libraries, APIs, and services into your applications effectively.`,
    analogy: `Reading online documentation is like using a detailed user manual for a complex device. Just as a good manual shows you not only which buttons to press but also why you'd want to press them and what might go wrong, good documentation explains not just the 'how' but also the 'why' and 'when' of using the technology.`,
    codeExample: `// Example of integrating external documentation into your project
import { ExternalLibrary } from 'external-library';

// Initialize based on documentation guidelines
const config = {
  apiKey: process.env.API_KEY,
  timeout: 5000,
  retryAttempts: 3
};

const client = new ExternalLibrary(config);

// Use the documented methods
async function fetchDataAccordingToDocs() {
  try {
    // Following the API documentation pattern
    const response = await client.getData({
      endpoint: '/users',
      params: { limit: 10, offset: 0 }
    });
    
    return response.data;
  } catch (error) {
    // Handle errors as documented
    console.error('API Error:', error.message);
    throw error;
  }
}`,
    useCases: [
      "When integrating third-party libraries or services into your project",
      "Learning new technologies and understanding their capabilities",
      "Troubleshooting issues by referencing official documentation",
      "Understanding best practices and recommended implementation patterns",
      "Staying up-to-date with API changes and new features"
    ],
    keyPoints: [
      "Always check the documentation version matches your implementation",
      "Look for code examples and copy-paste carefully, adapting to your context",
      "Pay attention to authentication, rate limits, and error handling guidance",
      "Bookmark important documentation pages for quick reference",
      "Consider the documentation's update frequency and community support"
    ]
  }
};

export const mockExplainDocumentation = async (input, type) => {
  try {
    // Add realistic delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Handle different input types
    let contentToAnalyze = '';
    
    if (type === 'paste') {
      contentToAnalyze = input.trim();
    } else if (type === 'url') {
      // Simulate URL content extraction
      contentToAnalyze = `Documentation from URL: ${input}`;
      // For demo purposes, we'll use the URL-specific fallback
      if (input.includes('http')) {
        return FALLBACK_EXPLANATIONS.url_content;
      }
    } else if (type === 'file') {
      contentToAnalyze = input.trim();
    }
    
    // Check if content is too short for meaningful analysis
    if (contentToAnalyze.length < 50) {
      return FALLBACK_EXPLANATIONS.short_content;
    }
    
    // Use the dynamic explanation generator
    return await generateDynamicExplanation(contentToAnalyze, type);
    
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error("Unable to analyze the documentation at this time. Please check your content and try again.");
  }
};