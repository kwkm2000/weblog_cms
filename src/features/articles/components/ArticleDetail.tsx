import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRemoveArticle } from "../api/removeArticle";
import { useArticle } from "../api/getArticle";
import { assertIsDefined } from "../../../lib/assert";
import ArticlePreview from "./ArticlePreview";
import ArticleWriter from "./ArticleWriter";
import { Articles } from "../repositories";
import { useUpdateArticle } from "../../articles/api/upateArticle";

export default function ArticleDetail() {
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const useUpdateArticleMutation = useUpdateArticle();
  const removeArticleMutation = useRemoveArticle({ id: Number(id) });
  assertIsDefined(id);
  const articlesQuery = useArticle({ id: Number(id) });
  const removeArticle = React.useCallback(async () => {
    await removeArticleMutation.mutateAsync(Number(id));
    navigate("/");
  }, [id, navigate, removeArticleMutation]);
  const editArticle = React.useCallback(
    async (value: Articles.CreateValue) => {
      await useUpdateArticleMutation.mutateAsync({ id: Number(id), value });
    },
    [useUpdateArticleMutation, id]
  );

  if (articlesQuery.isLoading) {
    return <p>loading...</p>;
  }

  if (articlesQuery.isError || !articlesQuery.data) {
    throw new Error("エラーです");
  }

  return (
    <>
      <div>
        <button onClick={removeArticle}>削除</button>
      </div>

      {isEditing ? (
        <ArticleWriter
          onCreateValue={editArticle}
          initialValue={articlesQuery.data}
        />
      ) : (
        <>
          <h2>{articlesQuery.data.title}</h2>
          <ArticlePreview text={articlesQuery.data.text} />
        </>
      )}

      {isEditing ? (
        <div>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            確定
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            編集
          </button>
        </div>
      )}
    </>
  );
}
