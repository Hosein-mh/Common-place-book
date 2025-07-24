import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      const key = event.code;
      const modifier = event.ctrlKey || event.metaKey;

      if (shortcuts[key]) {
        const shortcut = shortcuts[key];
        
        if (shortcut.requireModifier && !modifier) return;
        if (!shortcut.requireModifier && modifier) return;

        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);
};