import { useEffect, useState } from 'react';
import { WifiOff, AlertCircle, Wifi, AlertTriangle } from 'lucide-react';
import { useConnection } from '@/admin/contexts/ConnectionContext';

export default function ConnectionStatusIndicator() {
  const { isOnline, connectionQuality, connectionErrorMessage } = useConnection();
  const [showBanner, setShowBanner] = useState(!isOnline);

  useEffect(() => {
    setShowBanner(!isOnline || connectionQuality === 'poor');
  }, [isOnline, connectionQuality]);

  if (!showBanner) {
    return null;
  }

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-lg flex items-center gap-3 max-w-xs">
        <WifiOff className="h-4 w-4 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">No connection</p>
          <p className="text-red-100 text-xs">You are currently offline. Some features may be limited.</p>
        </div>
      </div>
    );
  }

  if (connectionQuality === 'poor') {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white shadow-lg flex items-center gap-3 max-w-xs">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />
        <div className="flex-1">
          <p className="font-semibold">Weak connection</p>
          <p className="text-amber-100 text-xs">{connectionErrorMessage || 'Connection quality is poor'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
      <Wifi className="h-3 w-3" />
      Connected
    </div>
  );
}

export function ConnectionStatusHeader() {
  const { isOnline, connectionQuality } = useConnection();

  if (isOnline && connectionQuality !== 'poor') {
    return null;
  }

  const getIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />;
    if (connectionQuality === 'poor') return <AlertCircle className="h-4 w-4" />;
    return null;
  };

  const getColor = () => {
    if (!isOnline) return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
    if (connectionQuality === 'poor') return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
    return '';
  };

  const getMessage = () => {
    if (!isOnline) return 'You are offline. Changes may not sync.';
    if (connectionQuality === 'poor') return 'Connection is slow. Operations may take longer.';
    return '';
  };

  return (
    <div className={`flex items-center gap-2 border-b px-4 py-3 text-sm font-medium ${getColor()}`}>
      {getIcon()}
      {getMessage()}
    </div>
  );
}
