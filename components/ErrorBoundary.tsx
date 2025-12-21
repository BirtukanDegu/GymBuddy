"use client";

import React, { Component, ReactNode } from "react";
import { Button } from "./ui/button";
import { Warning2 } from "iconsax-reactjs";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React errors
 * Prevents the entire app from crashing when an error occurs
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#1a1a1a] rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">
                <Warning2 className="h-8 w-8 text-red-500"/>
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Don't worry, your workout data
              is safe.
            </p>
            {this.state.error && (
              <details className="text-left mb-6 bg-black/30 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-semibold mb-2">
                  Error Details
                </summary>
                <pre className="text-xs text-red-400 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
