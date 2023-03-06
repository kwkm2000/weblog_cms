import { useMutation } from "@tanstack/react-query";
import { Articles } from "../repositories";
import { Article } from "../models";
import { queryClient } from "../../../lib/reactQuery";
import { QUERY_KEY } from "./queryKey";

/**
 * 記事を作成するAPI
 *
 * @returns
 */
export const useCreateArticle = () => {
  return useMutation({
    mutationFn: Articles.create,
    onMutate: async (newArticle) => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousArticles = queryClient.getQueryData<Article.Model[]>([
        QUERY_KEY,
      ]);

      return previousArticles;
    },
    onError: (_, __, context: any) => {
      if (context?.previousArticles) {
        queryClient.setQueryData([QUERY_KEY], context.previousArticles);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
};
