import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/admin/contexts/AuthContext';

export default function LoginPage() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Welcome back!');
    navigate('/admin');
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email');
      return;
    }
    setResetLoading(true);
    const { error } = await resetPassword(resetEmail);
    setResetLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Password reset link sent to your email');
    setShowReset(false);
    setResetEmail('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-glow">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">LeverageRCM Admin</h1>
          <p className="mt-1 text-sm text-slatey-400">Sign in to manage your website content</p>
        </div>

        <div className="admin-card p-8">
          {!showReset ? (
            <>
              <h2 className="mb-6 text-xl font-bold text-slatey-800 dark:text-white">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="admin-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slatey-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@leveragercm.com"
                      className="admin-input pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slatey-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="admin-input pl-10"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slatey-600 dark:text-slatey-300">
                    <input type="checkbox" className="rounded border-slatey-300" /> Remember me
                  </label>
                  <button type="button" onClick={() => setShowReset(true)} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              <button onClick={() => setShowReset(false)} className="mb-4 flex items-center gap-1 text-sm text-slatey-500 hover:text-slatey-700 dark:hover:text-slatey-300">
                <ArrowLeft className="h-4 w-4" /> Back to sign in
              </button>
              <h2 className="mb-2 text-xl font-bold text-slatey-800 dark:text-white">Reset Password</h2>
              <p className="mb-6 text-sm text-slatey-500">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="admin-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slatey-400" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@leveragercm.com"
                      className="admin-input pl-10"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-50"
                >
                  {resetLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Send Reset Link
                </button>
              </form>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-slatey-400 hover:text-white">Back to website</Link>
        </div>
      </div>
    </div>
  );
}
