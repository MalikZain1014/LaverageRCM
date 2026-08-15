import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ConnectionContextValue {
  isOnline: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  lastConnectionTime: Date | null;
  connectionErrorMessage: string | null;
}

const ConnectionContext = createContext<ConnectionContextValue | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [lastConnectionTime, setLastConnectionTime] = useState<Date | null>(
    () => (navigator.onLine ? new Date() : null)
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastConnectionTime(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        isOnline,
        connectionQuality: isOnline ? 'good' : 'offline',
        lastConnectionTime,
        connectionErrorMessage: isOnline
          ? null
          : 'No internet connection detected',
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error('useConnection must be used within ConnectionProvider');
  }

  return context;
}