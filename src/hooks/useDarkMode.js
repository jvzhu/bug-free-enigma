import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'notes-dark-mode';

function applyTheme(isDark) {
  if (typeof document === 'undefined') {
    return;
  }

  if (isDark) {
    document.documentElement.dataset.theme = 'dark';
  } else {
    delete document.documentElement.dataset.theme;
  }
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const storedPreference = window?.localStorage?.getItem(STORAGE_KEY);
      const nextIsDark = storedPreference === 'true';
      setIsDark(nextIsDark);
      applyTheme(nextIsDark);
    } catch {
      setIsDark(false);
      applyTheme(false);
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((current) => {
      const next = !current;
      try {
        window?.localStorage?.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore storage failures (preference just won't persist).
      }
      applyTheme(next);
      return next;
    });
  }, []);

  return { isDark, toggleDark };
}
