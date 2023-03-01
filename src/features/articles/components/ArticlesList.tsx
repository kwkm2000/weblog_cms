// import { useArticles } from "@features/articles/api/getArticle";
import { useArticles } from "../api/getArticles";
import { Link } from "react-router-dom";

export function ArticlesList() {
  const articlesQuery = useArticles();

  if (articlesQuery.isLoading) {
    return <p>loading...</p>;
  }

  if (!articlesQuery?.data?.length) {
    <p>記事がみつかりません</p>;
  }

  return (
    <ul>
      {articlesQuery.data?.map((article) => {
        return (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
