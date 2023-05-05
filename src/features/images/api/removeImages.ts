import { useMutation } from "@tanstack/react-query";
import { Images } from "../repositories";
import { QUERY_KEY } from "@/features/images/api/queryKey";
import { queryClient } from "@/lib/reactQuery";

export function useRemoveImage() {
  return useMutation({
    mutationFn: Images.remove,
    onMutate: async (keyToRemove) => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousImages = queryClient.getQueryData([QUERY_KEY]);

      return { previousImages };
    },
    onError: (error, keyToRemove, context: any) => {
      queryClient.setQueryData([QUERY_KEY], context.previousImages);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
}
