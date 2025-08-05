import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in 3D component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-cream/20 backdrop-blur-sm p-6 rounded-lg text-center">
          <h2 className="text-2xl font-serif text-mocha mb-2">Something went wrong</h2>
          <p className="text-charcoal/70 mb-4">We couldn't load the 3D experience</p>
          {this.props.fallback || null}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
