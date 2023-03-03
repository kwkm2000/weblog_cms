import React from "react";
import { Link } from "react-router-dom";
import ArticleWriter from "../../features/articles/components/ArticleWriter";
import { Articles } from "../../features/articles/repositories";
import { useCreateArticle } from "../../features/articles/api/createArticle";
import { useNavigate } from "react-router-dom";

export default function ArticleNewPage() {
  const navigate = useNavigate();
  const createArticlesMutation = useCreateArticle();
  const createArticle = React.useCallback(
    async (value: Articles.CreateValue) => {
      await createArticlesMutation.mutateAsync(value);
      navigate("/");
    },
    [createArticlesMutation, navigate]
  );

  return (
    <main>
      <h1>New Article</h1>
      <ArticleWriter onCreateValue={createArticle} />
      <p>
        <Link to={"/"}>Topへ</Link>
      </p>
    </main>
  );
}
