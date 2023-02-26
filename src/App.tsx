import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ArticleNew from "./pages/article/New";
import ArticleDetail from "./pages/article/Detail";
import TagNew from "./pages/tag/New";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/article/new`} element={<ArticleNew />} />
        <Route path={`/article/:id`} element={<ArticleDetail />} />
        <Route path={`/tag/new`} element={<TagNew />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
