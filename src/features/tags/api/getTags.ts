import { useQuery } from "@tanstack/react-query";
import { Tags } from "@/features/tags/repositories";
import { QUERY_KEY } from "./queryKey";

export const useTags = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => Tags.getALl(),
  });
};
