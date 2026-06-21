import { useCallback, useEffect, useRef, useState } from 'react';
import { generateId } from '../utils/fileDownload';

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = generateId();
    setToasts((current) => [...current, { id, message, type }]);

    if (duration > 0) {
      const timeoutId = setTimeout(() => removeToast(id), duration);
      timeoutsRef.current.set(id, timeoutId);
    }

    return id;
  }, [removeToast]);

  useEffect(() => () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current.clear();
  }, []);

  return { toasts, addToast, removeToast };
}
