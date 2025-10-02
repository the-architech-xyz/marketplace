import React, { Component, ReactNode } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface QueryErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class QueryErrorBoundary extends Component<QueryErrorBoundaryProps, QueryErrorBoundaryState> {
  constructor(props: QueryErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Query Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, () => {
          this.setState({ hasError: false, error: null });
        });
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4 max-w-md">
            {this.state.error?.message || 'An unexpected error occurred while loading data.'}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: null })}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary wrapper
export function QueryErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <QueryErrorBoundary
          fallback={(error, resetError) => (
            <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Query Error
              </h2>
              <p className="text-gray-600 mb-4 max-w-md">
                {error.message || 'Failed to load data. Please try again.'}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={resetError}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
                <Button
                  onClick={reset}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Query
                </Button>
              </div>
            </div>
          )}
        >
          {children}
        </QueryErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default QueryErrorBoundary;
