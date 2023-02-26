import React from "react";
import { Link } from "react-router-dom";
import { Articles } from "./domain/repositories";
import { Article } from "./domain/models";

function App() {
  const [articles, setArticles] = React.useState<Article.Model[]>([]);
  const getArticles = async () => {
    const articles = await Articles.getALl();
    setArticles(articles);
    return articles;
  };

  React.useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {articles.map((article) => {
          return (
            <div key={article.id} style={{ marginBottom: 20 }}>
              <p>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </p>
            </div>
          );
        })}
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
