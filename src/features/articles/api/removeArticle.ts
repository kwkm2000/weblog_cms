import useSWR from "swr";
import { Articles } from "@/features/articles/repositories";
import { QUERY_KEY } from "./queryKey";

type UseRemoveArticleOptions = {
  id: number;
};

export const useRemoveArticle = ({ id }: UseRemoveArticleOptions) => {
  const {
    data: previousArticles = [],
    error,
    mutate,
  } = useSWR(QUERY_KEY, Articles.getALl);

  const removeArticle = async () => {
    const newArticles = previousArticles.filter((article) => article.id !== id);

    // Optimistically update cache
    mutate(newArticles, false);

    // Send delete request
    await Articles.remove(id);
  };

  return { removeArticle, error };
};
