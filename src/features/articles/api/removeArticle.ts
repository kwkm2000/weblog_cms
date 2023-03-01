import { useMutation } from "@tanstack/react-query";
import { Articles } from "../repositories";
import { Article } from "../models";
import { queryClient } from "../../../lib/reactQuery";
import { QUERY_KEY } from "./queryKey";

type UseRemoveArticleOptions = {
  id: number;
};

/**
 * 記事を削除するAPI
 *
 * @param id 記事のID
 * @returns
 */
export const useRemoveArticle = ({ id }: UseRemoveArticleOptions) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousArticles = queryClient.getQueryData<Article.Model[]>([
        QUERY_KEY,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY, id],
        previousArticles?.filter((article) => article.id !== id)
      );

      return previousArticles;
    },
    onError: (_, __, context: any) => {
      if (context?.previousArticles) {
        queryClient.setQueryData([QUERY_KEY, id], context.previousArticles);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY, id]);
    },
    mutationFn: Articles.remove,
  });
};
