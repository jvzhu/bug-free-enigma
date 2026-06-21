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
    const storedPreference = localStorage.getItem(STORAGE_KEY);
    const nextIsDark = storedPreference === 'true';
    setIsDark(nextIsDark);
    applyTheme(nextIsDark);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((current) => {
      const next = !current;
      localStorage.setItem(STORAGE_KEY, String(next));
      applyTheme(next);
      return next;
    });
  }, []);

  return { isDark, toggleDark };
}
