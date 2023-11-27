import useSWR from "swr";
import { axios } from "@/lib/axios";
import { Article } from "../models";

type UseArticleOptions = {
  id: number;
};

const fetcher = (url: string): Promise<Article.Model> => {
  return axios.get(url).then((res) => res.data);
};

export const useArticle = ({ id }: UseArticleOptions) => {
  const { data, error, isLoading } = useSWR(`/articles/${id}`, fetcher);

  return {
    Article: data,
    isError: error,
    isLoading,
  };
};
