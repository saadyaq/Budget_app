import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Budget App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="max-w-md mx-auto text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-red-600 mb-4">
              Erreur de chargement
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Une erreur s'est produite lors du chargement de l'application.
            </p>
            <details className="text-left text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <summary className="cursor-pointer font-medium">Détails de l'erreur</summary>
              <pre className="mt-2 text-red-600 dark:text-red-400">
                {this.state.error?.message}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}