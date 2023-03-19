import { Link } from "react-router-dom";
import { ArticlesList } from "@/features/articles/components/ArticlesList";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <ArticlesList />
        <p>New Article Page</p>
        <p>
          <Link to={"/article/new"}>/article/new</Link>
        </p>
        <p>New Tag Page</p>
        <p>
          <Link to={"/tag/new"}>/tag/new</Link>
        </p>
      </header>
    </div>
  );
}

export default Home;
