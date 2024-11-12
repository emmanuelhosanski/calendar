import { useState, useEffect } from 'react';
import { Mode } from '../types';

export const useMode = () => {
  const [mode, setMode] = useState<Mode>(() => {
    // Always default to 'real' mode when the app loads
    return 'real';
  });

  useEffect(() => {
    // Save the mode to localStorage whenever it changes
    localStorage.setItem('calendarMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'test' ? 'real' : 'test'));
  };

  return {
    isTestMode: mode === 'test',
    toggleMode,
  };
};
