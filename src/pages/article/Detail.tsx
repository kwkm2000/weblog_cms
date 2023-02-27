import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Article from "../../features/articles/models/article";
import { Articles } from "../../domain/repositories";

function ArticleDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = React.useState<Article.Model>();
  const removeArticle = React.useCallback(async () => {
    await Articles.remove(Number(id));
    navigate("/");
  }, [id, navigate]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const getArticle = async () => {
      console.log(id);
      const article = await Articles.getOne(Number(id));
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
