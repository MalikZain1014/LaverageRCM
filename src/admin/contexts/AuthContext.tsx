import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, setupSupabaseMonitoring } from '@/admin/services/supabaseClient';
import { handleSupabaseError, type ApiError } from '@/admin/services/errorHandler';
import { withRetry } from '@/admin/services/retryService';
import type { CmsUser, UserRole } from '@/admin/types';

interface AuthContextValue {
  user: User | null;
  profile: CmsUser | null;
  loading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Setup Supabase monitoring
    const stopSupabaseMonitoring = setupSupabaseMonitoring();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);

      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }

      if (event === 'SIGNED_OUT') {
        setError(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      stopSupabaseMonitoring();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error: err } = await supabase
        .from('cms_users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (err) throw err;
      setProfile(data as CmsUser | null);
      setError(null);
    } catch (err) {
      const apiError = handleSupabaseError(err);
      console.error('Failed to fetch profile:', apiError);
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setError(null);
      setLoading(true);

      const { error: err } = await withRetry(
        async () => {
          const result = await supabase.auth.signInWithPassword({ email, password });
          if (result.error) throw result.error;
          return result;
        },
        'Sign in',
        2,
      );

      if (err) throw err;
      return { error: null };
    } catch (err) {
      const apiError = handleSupabaseError(err);
      setError(apiError);
      return { error: apiError.message };
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      setError(null);
      setLoading(true);

      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (err) throw err;
      return { error: null };
    } catch (err) {
      const apiError = handleSupabaseError(err);
      setError(apiError);
      return { error: apiError.message };
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      const { error: err } = await supabase.auth.signOut();
      if (err) throw err;
      setProfile(null);
      setUser(null);
      setError(null);
    } catch (err) {
      const apiError = handleSupabaseError(err);
      setError(apiError);
      console.error('Sign out error:', apiError);
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(email: string) {
    try {
      setError(null);
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      if (err) throw err;
      return { error: null };
    } catch (err) {
      const apiError = handleSupabaseError(err);
      setError(apiError);
      return { error: apiError.message };
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useRole(): UserRole | null {
  const { profile } = useAuth();
  return profile?.role ?? null;
}

