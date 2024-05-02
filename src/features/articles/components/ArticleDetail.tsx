import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Article } from "@/features/articles/models";
import { useArticle } from "../api/getArticle";
import { assertIsDefined } from "../../../utils/assert";
import ArticlePreview from "@/features/articles/components/ArticlePreview";
import ArticleWriter from "@/features/articles/components/ArticleWriter/ArticleWriter";
import { useUpdateArticle } from "../api/updateArticle";
import { useRemoveArticle } from "../api/removeArticle";

export default function ArticleDetail() {
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const useUpdateArticleMutation = useUpdateArticle();
  const removeArticleMutation = useRemoveArticle();
  assertIsDefined(id);
  const { Article, isError, isLoading } = useArticle({ id: Number(id) });

  // 記事の削除
  const removeArticle = async () => {
    await removeArticleMutation.removeArticle({ id: Number(id) });
    navigate("/");
  };

  // 記事の編集
  const editArticle = async (value: Article.CreateValue) => {
    await useUpdateArticleMutation.updateArticle({ id: Number(id), value });
    setIsEditing(false);
  };

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
