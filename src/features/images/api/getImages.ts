import useSWR from "swr";
import { Images } from "@/features/images/repositories";

export const useImages = () => {
  const { data, error, isLoading } = useSWR("/api/images", Images.getAll);

  return {
    images: data,
    isLoading,
    isError: error,
  };
};
