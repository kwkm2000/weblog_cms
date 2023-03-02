import { useQuery } from "@tanstack/react-query";
import { Articles } from "../repositories";

type UseArticleOptions = {
  id: number;
};

export const useArticle = ({ id }: UseArticleOptions) => {
  return useQuery({
    queryKey: ["article"],
    queryFn: () => Articles.getOne(id),
  });
};
