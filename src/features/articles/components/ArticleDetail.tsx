import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRemoveArticle } from "../api/removeArticle";
import { useArticle } from "../api/getArticle";
import { assertIsDefined } from "../../../utils/assert";
import ArticlePreview from "./ArticlePreview";
import ArticleWriter from "./ArticleWriter";
import { Articles } from "../repositories";
import { useUpdateArticle } from "../api/updateArticle";

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
      articlesQuery.refetch(); // TODO キャッシュを更新するべきな気がするので直す
      setIsEditing(false);
    },
    [useUpdateArticleMutation, id, articlesQuery]
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
          <ArticlePreview value={articlesQuery.data.text} />
        </>
      )}

      {isEditing ? (
        <div>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            キャンセル
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
