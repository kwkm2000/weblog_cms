import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Images } from "../repositories";
import { AxiosError } from "axios";
import { QUERY_KEY } from "@/features/images/api/queryKey";
import { queryClient } from "@/lib/reactQuery";

export function useUploadImage() {
  return useMutation(Images.uploadImage, {
    onMutate: async (newImage) => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousImages = queryClient.getQueryData<string[]>([QUERY_KEY]);

      return { previousImages };
    },
    onError: (error, newImage, context: any) => {
      queryClient.setQueryData([QUERY_KEY], context.previousImages);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
}
