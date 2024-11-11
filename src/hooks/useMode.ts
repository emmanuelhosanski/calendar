import { useState, useEffect } from 'react';
import { Mode } from '../types';

export const useMode = () => {
  const [mode, setMode] = useState<Mode>(() => {
    const savedMode = localStorage.getItem('calendarMode');
    return (savedMode as Mode) || 'real';
  });

  useEffect(() => {
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