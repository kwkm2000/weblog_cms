import { Link } from "react-router-dom";
import ArticleCreator from "../../features/articles/components/ArticleCreator";

function ArticleNew() {
  return (
    <main>
      <h1>New Article</h1>
      <ArticleCreator></ArticleCreator>
      <p>
        <Link to={"/article/1"}>Topへ</Link>
      </p>
    </main>
  );
}

export default ArticleNew;
