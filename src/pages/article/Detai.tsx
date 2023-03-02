import { Link } from "react-router-dom";
import ArticleDetail from "../../features/articles/components/ArticleDetail";

export default function ArticleDetailPage() {
  return (
    <main>
      <ArticleDetail />
      <p>
        <Link to="/">TOPへ</Link>
      </p>
    </main>
  );
}
