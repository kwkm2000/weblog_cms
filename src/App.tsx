import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ArticleNew from "./pages/article/New";
import ArticleDetailPage from "./pages/article/Detai";
import TagNew from "./pages/tag/New";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const App = () => {
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/article/new`} element={<ArticleNew />} />
            <Route path={`/article/:id`} element={<ArticleDetailPage />} />
            <Route path={`/tag/new`} element={<TagNew />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
