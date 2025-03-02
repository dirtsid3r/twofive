"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Filter out hydration errors
    if (error.message.includes("Hydration failed")) {
      console.log("Hydration error suppressed");
      this.setState({ hasError: false });
    } else {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Or a fallback UI
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 