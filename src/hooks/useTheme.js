import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('docexplainer-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme or system preference
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('docexplainer-theme', newTheme ? 'dark' : 'light');
  };

  const applyTheme = (dark) => {
    const root = document.documentElement;
    const body = document.body;
    
    if (dark) {
      body.classList.remove('body-light');
      body.classList.add('body-dark');
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
    } else {
      body.classList.remove('body-dark');
      body.classList.add('body-light');
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
    }
  };

  return { isDark, toggleTheme };
};