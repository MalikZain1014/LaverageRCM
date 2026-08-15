import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    this.setState((prev) => ({
      errorCount: prev.errorCount + 1,
    }));
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: 0,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slatey-50 to-slatey-100 dark:from-navy-900 dark:to-navy-800 p-4">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-8 shadow-premium dark:bg-navy-800">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>

              <h1 className="mb-2 text-center text-2xl font-bold text-slatey-900 dark:text-white">
                Something went wrong
              </h1>
              <p className="mb-6 text-center text-sm text-slatey-600 dark:text-slatey-400">
                We encountered an error while processing your request. Please try again or contact support.
              </p>

              {this.state.error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 dark:bg-red-500/10">
                  <p className="text-xs font-mono text-red-700 dark:text-red-400 line-clamp-3">
                    {this.state.error.message || 'Unknown error'}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
                <Link
                  to="/admin"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slatey-200 px-4 py-2.5 text-sm font-semibold text-slatey-700 transition-colors hover:bg-slatey-50 dark:border-navy-600 dark:text-slatey-300 dark:hover:bg-navy-700"
                >
                  <Home className="h-4 w-4" />
                  Go to dashboard
                </Link>
              </div>

              {this.state.errorCount > 3 && (
                <div className="mt-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-500/10">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    Multiple errors detected. If the problem persists, please refresh the page or contact support.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
