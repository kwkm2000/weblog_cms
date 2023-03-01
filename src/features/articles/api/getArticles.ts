import { useQuery } from "@tanstack/react-query";
import { Articles } from "../repositories";
import { QUERY_KEY } from "./queryKey";

export const useArticles = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => Articles.getALl(),
  });
};
