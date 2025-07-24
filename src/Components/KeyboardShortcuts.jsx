import { useEffect } from 'react';
import { useScript } from '../contexts/ScriptContext';
import { useSettings } from '../hooks/useSettings';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

export const KeyboardShortcuts = ({ 
  isRecording, 
  startRecording, 
  stopRecording,
  onToggleSettings,
  onToggleStats,
  onToggleFocusMode
}) => {
  const { goToNextSection, goToPreviousSection, resetCurrentSection } = useScript();
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings.keyboardShortcuts) return;

    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.code) {
        case KEYBOARD_SHORTCUTS.START_RECORDING:
          event.preventDefault();
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
          break;

        case KEYBOARD_SHORTCUTS.NEXT_SECTION:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            goToNextSection();
          }
          break;

        case KEYBOARD_SHORTCUTS.PREVIOUS_SECTION:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            goToPreviousSection();
          }
          break;

        case KEYBOARD_SHORTCUTS.TOGGLE_SETTINGS:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleSettings();
          }
          break;

        case KEYBOARD_SHORTCUTS.TOGGLE_STATS:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleStats();
          }
          break;

        case KEYBOARD_SHORTCUTS.TOGGLE_FOCUS_MODE:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleFocusMode();
          }
          break;

        case KEYBOARD_SHORTCUTS.RESET_SECTION:
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            resetCurrentSection();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    isRecording,
    startRecording,
    stopRecording,
    goToNextSection,
    goToPreviousSection,
    resetCurrentSection,
    onToggleSettings,
    onToggleStats,
    onToggleFocusMode,
    settings.keyboardShortcuts
  ]);

  return null; // This component doesn't render anything
};