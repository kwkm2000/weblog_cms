import { useMutation } from "@tanstack/react-query";
import { Articles } from "../repositories";
// import { Article } from "../models";
import { queryClient } from "../../../lib/reactQuery";
import { QUERY_KEY } from "./queryKey";

type UpdateArticleOptions = {
  id: number;
  value: Articles.CreateValue;
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: Articles.update,
    onMutate: async (newArticleOption: UpdateArticleOptions) => {
      // const newArticle: Article.Model = {
      //   id: newArticleOption.id,

      //   tags: newArticleOption.value.tagIds,
      //   text: newArticleOption.value.text,
      //   title: newArticleOption.value.title,
      // };
      // optimistic updateを上書きしないようにリフェッチをキャンセルする
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      // snapshot
      // const previousArticle = queryClient.getQueryData<Article.Model[]>([
      //   QUERY_KEY,
      //   newArticle.id,
      // ]);

      // queryClient.setQueryData([QUERY_KEY], () => {
      //   return;
      // });

      // return { previousArticle, newArticle };
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
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
};
