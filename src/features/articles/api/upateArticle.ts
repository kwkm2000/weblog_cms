import { useMutation } from "@tanstack/react-query";
import { Articles } from "../repositories";
import { Article } from "../models";
import { queryClient } from "../../../lib/reactQuery";
import { QUERY_KEY } from "./queryKey";

type UpdateArticleOptions = {
  id: number;
  value: Articles.CreateValue;
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: Articles.update,
    onMutate: async (newArticle: any) => {
      // optimistic updateを上書きしないように理フェッチをキャンセルする
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      // snapshot
      const previousArticle = queryClient.getQueryData<Article.Model[]>([
        "articles",
      ]);
      // queryClient.setQueryData([QUERY_KEY, newArticle.id], newArticle);

      // queryClient.setQueryData(
      //   [QUERY_KEY, id, value],
      //   previousArticles?.filer((article) => article.id !== id)
      // );

      return previousArticle;
    },
    // onError: (_, __, context: any) => {
    // if (context?.previousArticles) {
    //   queryClient.setQueryData(
    //     ["article", id, value],
    //     context.previousArticles
    //   );
    // }
    // },
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};
