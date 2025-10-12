"use client";

import React from "react";
import { Button } from "./Button";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="card bg-surface p-8">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-error text-2xl">
                  error
                </span>
              </div>
              
              <h1 className="text-2xl font-bold text-primary mb-2">
                Something went wrong
              </h1>
              
              <p className="text-secondary mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleReset}>
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-secondary cursor-pointer">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs text-error bg-error/10 p-3 rounded overflow-auto">
                    {this.state.error && this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
