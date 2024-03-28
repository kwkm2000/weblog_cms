import { mutate } from "swr";
import { Articles } from "../repositories";
import { Article } from "../models";

type UpdateArticleOptions = {
  id: number;
  value: Article.CreateValue;
};

export const useUpdateArticle = () => {
  const updateArticle = async (newArticleOption: UpdateArticleOptions) => {
    mutate(
      `/articles/${newArticleOption.id}`,
      async () => {
        const updateArticle = await Articles.update({
          id: newArticleOption.id,
          value: newArticleOption.value,
        });
        return updateArticle;
      },
      false
    );
  };

  return { updateArticle };
};
