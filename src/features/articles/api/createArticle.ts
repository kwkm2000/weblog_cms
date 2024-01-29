import useSWR from "swr";
import { Articles } from "@/features/articles/repositories";
import { Article } from "@/features/articles/models";
import { QUERY_KEY } from "./queryKey";

/**
 * 記事を作成するAPI
 *
 * @returns
 */
export const useCreateArticle = () => {
  const {
    data: previousArticles = [],
    error,
    mutate,
  } = useSWR(QUERY_KEY, Articles.getALl);

  const createArticle = async (newArticle: Article.CreateValue) => {
    // 楽観的更新
    const tmpNewArticle = {
      id: previousArticles.length + 1,
      title: newArticle.title,
      text: newArticle.text,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO キャッシュを更新しているが表示が更新されないため修正する
    // mutate([...previousArticles, tmpNewArticle], false);

    try {
      const newArticleCreated = await Articles.create(newArticle);

      // キャッシュ更新
      mutate([...previousArticles, newArticleCreated]);

      return newArticleCreated;
    } catch (error) {
      console.error(error);
      // On error, roll back to the previous value
      mutate(previousArticles, false);

      throw error;
    }
  };

  return { createArticle, error };
};
