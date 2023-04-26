import { useQuery } from "@tanstack/react-query";
import { Images } from "@/features/images/repositories";
import { QUERY_KEY } from "./queryKey";

export const useImages = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => Images.getAll(),
  });
};
