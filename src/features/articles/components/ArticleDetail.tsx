import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRemoveArticle } from "../api/removeArticle";
import { Article } from "@/features/articles/models";
import { useArticle } from "../api/getArticle";
import { assertIsDefined } from "../../../utils/assert";
import ArticlePreview from "@/features/articles/components/ArticlePreview";
import ArticleWriter from "@/features/articles/components/ArticleWriter/ArticleWriter";
import { useUpdateArticle } from "../api/updateArticle";

export default function ArticleDetail() {
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const useUpdateArticleMutation = useUpdateArticle();
  const removeArticleMutation = useRemoveArticle({ id: Number(id) });
  assertIsDefined(id);
  const { Article, isError, isLoading } = useArticle({ id: Number(id) });
  const removeArticle = React.useCallback(async () => {
    await removeArticleMutation.mutateAsync(Number(id));
    navigate("/");
  }, [id, navigate, removeArticleMutation]);
  const editArticle = React.useCallback(
    async (value: Article.CreateValue) => {
      await useUpdateArticleMutation.mutateAsync({ id: Number(id), value });
      // Article.refetch(); // TODO キャッシュを更新するべきな気がするので直す
      setIsEditing(false);
    },
    [useUpdateArticleMutation, id]
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !Article) {
    throw new Error("エラーです");
  }

  return (
    <>
      {isEditing ? (
        <ArticleWriter onCreateValue={editArticle} initialValue={Article} />
      ) : (
        <>
          <h2>{Article.title}</h2>
          <ArticlePreview value={Article.text} />
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
      <div>
        <button onClick={removeArticle}>削除</button>
      </div>
    </>
  );
}
