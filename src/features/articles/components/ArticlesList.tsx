import { useArticles } from "@/features/articles/api/getArticles";
import { Link } from "react-router-dom";

export function ArticlesList() {
  const { articles, isError, isLoading } = useArticles();
  console.log("articles", articles);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!articles?.length) {
    <p>記事がみつかりません</p>;
  }

  return (
    <ul>
      {articles?.map((article) => {
        return (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
