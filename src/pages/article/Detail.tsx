import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Article from "../../features/articles/models/article";
import { getOne } from "../../features/articles/repositories/articles";
import { useRemoveArticle } from "../../features/articles/api/removeArticle";

function ArticleDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = React.useState<Article.Model>();
  const removeArticleMutation = useRemoveArticle({ id: Number(id) });
  const removeArticle = React.useCallback(async () => {
    await removeArticleMutation.mutateAsync(Number(id));
    navigate("/");
  }, [id, navigate, removeArticleMutation]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const getArticle = async () => {
      const article = await getOne(Number(id));
      setArticle(article);
    };
    getArticle();
  }, [id]);

  if (!article) {
    return <></>;
  }

  return (
    <main>
      <h2>{article.title}</h2>
      {article.text.blocks.map((block) => {
        return <p key={block.key}>{block.text}</p>;
      })}

      <div>
        <button onClick={removeArticle}>削除</button>
      </div>

      <p>
        <Link to="/">TOPへ</Link>
      </p>
    </main>
  );
}

export default ArticleDetail;
