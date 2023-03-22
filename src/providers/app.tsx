import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
