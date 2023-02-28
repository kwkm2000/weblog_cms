import { useQuery } from "@tanstack/react-query";
import { Articles } from "@/features/articles/domain/models";

const url = "http://13.231.5.6:4000";
const QUERY_KEY = "articles";

export async function getArticles(): Promise<Articles.Model> {
  const articles: Articles.Model = await (
    await fetch(`${url}/articles`)
  ).json();

  return articles;
}

export const useArticles = () => {
  return useQuery([QUERY_KEY], getArticles);
};
