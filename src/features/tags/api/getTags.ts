import useSWR from "swr";
import { Tags } from "@/features/tags/repositories";

export const useTags = () => {
  const { data, error, isLoading } = useSWR("/tags", Tags.getAll);
  return {
    tags: data,
    isError: error,
    isLoading,
  };
};
