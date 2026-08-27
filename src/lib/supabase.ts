import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'leveragercm-auth',
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'leveragercm-app@1.0.0',
    },
    fetch: customFetch,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

function customFetch(url: string, options?: RequestInit): Promise<Response> {
  const timeoutMs = 30000;

  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
  }).catch((error) => {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  });
}

export function setupSupabaseMonitoring() {
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    } else if (event === 'SIGNED_IN') {
      // console.log('User signed in');
    } else if (event === 'TOKEN_REFRESHED') {
      console.debug('Token refreshed');
    }

    if (session?.access_token) {
      supabase.realtime.setAuth(session.access_token);
    }
  });

  return () => listener.subscription.unsubscribe();
}
