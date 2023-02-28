import { Link } from "react-router-dom";
// import { ArticlesList } from "@/features/articles/components/ArticlesList";
import { ArticlesList } from "./features/articles/components/ArticlesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ArticlesList />
        <p>
          <Link to={"/article/new"}>/article/new</Link>
        </p>
        <p>
          <Link to={"/tag/new"}>/tag/new</Link>
        </p>
      </header>
    </div>
  );
}

export default App;
