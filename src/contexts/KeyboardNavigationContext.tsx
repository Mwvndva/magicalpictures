import React, { createContext, useContext, useState, useEffect } from 'react';

interface KeyboardNavigationContextType {
  activeElement: HTMLElement | null;
  setActiveElement: (element: HTMLElement | null) => void;
  isKeyboardNavigationEnabled: boolean;
  setKeyboardNavigationEnabled: (enabled: boolean) => void;
}

const KeyboardNavigationContext = createContext<KeyboardNavigationContextType | undefined>(undefined);

export const useKeyboardNavigation = () => {
  const context = useContext(KeyboardNavigationContext);
  if (context === undefined) {
    throw new Error('useKeyboardNavigation must be used within a KeyboardNavigationProvider');
  }
  return context;
};

interface KeyboardNavigationProviderProps {
  children: React.ReactNode;
}

export const KeyboardNavigationProvider: React.FC<KeyboardNavigationProviderProps> = ({ children }) => {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [isKeyboardNavigationEnabled, setKeyboardNavigationEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isKeyboardNavigationEnabled) return;

      const focusableElements = [
        'a[href]',
        'area[href]',
        'button',
        'input:not([type="hidden"])',
        'select',
        'textarea',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable]'
      ].join(',');

      const elements = document.querySelectorAll(focusableElements);
      const currentIndex = Array.from(elements).indexOf(activeElement as HTMLElement);

      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          const nextIndex = currentIndex + 1;
          const nextElement = elements[nextIndex] as HTMLElement;
          if (nextElement) {
            nextElement.focus();
            setActiveElement(nextElement);
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          const nextFocus = elements[currentIndex + 1] as HTMLElement;
          if (nextFocus) {
            nextFocus.focus();
            setActiveElement(nextFocus);
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          const prevFocus = elements[currentIndex - 1] as HTMLElement;
          if (prevFocus) {
            prevFocus.focus();
            setActiveElement(prevFocus);
          }
          break;

        case 'Escape':
          event.preventDefault();
          setKeyboardNavigationEnabled(false);
          break;
      }
    };

    const handleFocus = (event: FocusEvent) => {
      setActiveElement(event.target as HTMLElement);
    };

    const handleBlur = () => {
      setActiveElement(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, [isKeyboardNavigationEnabled]);

  return (
    <KeyboardNavigationContext.Provider
      value={{
        activeElement,
        setActiveElement,
        isKeyboardNavigationEnabled,
        setKeyboardNavigationEnabled
      }}
    >
      {children}
    </KeyboardNavigationContext.Provider>
  );
};
