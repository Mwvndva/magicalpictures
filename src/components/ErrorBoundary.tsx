import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold mb-4 text-error">Something went wrong</h1>
            <p className="text-muted mb-6">Please try refreshing the page or contact support if the problem persists.</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90"
            >
              Try Again
            </Button>
          </motion.div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
