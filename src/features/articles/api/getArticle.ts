import { useQuery } from "@tanstack/react-query";
// import { Articles } from "@/features/articles/domain/models";
import { Articles } from "../repositories";

const QUERY_KEY = "articles";

// export const useArticles = () => {
//   return useQuery([QUERY_KEY], Articles.getALl);
// };

export const useArticles = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => Articles.getALl(),
  });
};
