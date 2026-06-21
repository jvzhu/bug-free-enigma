import React from 'react';

export function useSession(isAuthenticated, onLock, sessionTimeoutMinutes = 15) {
  const [showWarning, setShowWarning] = React.useState(false);
  const [remainingSeconds, setRemainingSeconds] = React.useState(sessionTimeoutMinutes * 60);
  const lastActivityRef = React.useRef(Date.now());
  const lastHandledActivityRef = React.useRef(0);
  const hasLockedRef = React.useRef(false);

  const resetSession = React.useCallback(() => {
    lastActivityRef.current = Date.now();
    hasLockedRef.current = false;
    setShowWarning(false);
    setRemainingSeconds(Math.max(0, sessionTimeoutMinutes * 60));
  }, [sessionTimeoutMinutes]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setShowWarning(false);
      setRemainingSeconds(sessionTimeoutMinutes * 60);
      return undefined;
    }

    resetSession();

    const handleActivity = () => {
      if (Date.now() - lastHandledActivityRef.current < 1000) {
        return;
      }
      lastHandledActivityRef.current = Date.now();
      lastActivityRef.current = Date.now();
      setShowWarning(false);
    };

    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }));

    const intervalId = window.setInterval(() => {
      const timeoutMs = sessionTimeoutMinutes * 60 * 1000;
      const elapsedMs = Date.now() - lastActivityRef.current;
      const nextRemainingSeconds = Math.max(0, Math.ceil((timeoutMs - elapsedMs) / 1000));

      setRemainingSeconds(nextRemainingSeconds);
      setShowWarning(nextRemainingSeconds > 0 && nextRemainingSeconds <= 120);

      if (elapsedMs >= timeoutMs && !hasLockedRef.current) {
        hasLockedRef.current = true;
        setShowWarning(false);
        onLock?.();
      }
    }, 1000);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, handleActivity));
      window.clearInterval(intervalId);
    };
  }, [isAuthenticated, onLock, resetSession, sessionTimeoutMinutes]);

  return {
    showWarning,
    remainingSeconds,
    resetSession,
  };
}
