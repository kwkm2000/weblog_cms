import useSWR from "swr";
import { axios } from "@/lib/axios";
import { Article } from "../models";

const fetcher = async (url: string): Promise<Article.Model[]> => {
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const useArticles = () => {
  const { data, error, isLoading } = useSWR("/articles", fetcher);

  return {
    articles: data,
    isError: error,
    isLoading,
  };
};
