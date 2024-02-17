import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return (
    <div>
      <h2>Error</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>{children}</BrowserRouter>
      </ErrorBoundary>
    </React.Suspense>
  );
};
