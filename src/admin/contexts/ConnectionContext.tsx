import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ConnectionContextValue {
  isOnline: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  lastConnectionTime: Date | null;
  connectionErrorMessage: string | null;
}

const ConnectionContext = createContext<ConnectionContextValue | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor' | 'offline'>('excellent');
  const [lastConnectionTime, setLastConnectionTime] = useState<Date | null>(new Date());
  const [connectionErrorMessage, setConnectionErrorMessage] = useState<string | null>(null);
  const [failedRequests, setFailedRequests] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setConnectionQuality('excellent');
      setLastConnectionTime(new Date());
      setConnectionErrorMessage(null);
      setFailedRequests(0);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setConnectionQuality('offline');
      setConnectionErrorMessage('No internet connection detected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Monitor connection quality via periodic ping
    const intervalId = setInterval(async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        setConnectionQuality('offline');
        return;
      }

      try {
        const start = performance.now();
        const response = await fetch('https://www.gstatic.com/generate_204', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
        });
        const latency = performance.now() - start;

        if (!response.ok && response.status !== 204) {
          throw new Error('Connection check failed');
        }

        setIsOnline(true);
        setConnectionErrorMessage(null);
        setFailedRequests(0);

        // Determine quality based on latency
        if (latency < 100) {
          setConnectionQuality('excellent');
        } else if (latency < 300) {
          setConnectionQuality('good');
        } else {
          setConnectionQuality('poor');
        }
        setLastConnectionTime(new Date());
      } catch (error) {
        setFailedRequests((prev) => prev + 1);
        if (failedRequests >= 2) {
          setConnectionQuality('poor');
          setConnectionErrorMessage('Connection quality degraded');
        }
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [failedRequests]);

  return (
    <ConnectionContext.Provider
      value={{
        isOnline,
        connectionQuality,
        lastConnectionTime,
        connectionErrorMessage,
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
