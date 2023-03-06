import { useMutation } from "@tanstack/react-query";
import { Tags } from "@/features/tags/repositories";
import { Tag } from "@/features/tags/models";
import { queryClient } from "@/lib/reactQuery";
import { QUERY_KEY } from "@/features/tags/api/queryKey";

/**
 * タグを作成するAPI
 *
 * @returns
 */
export const useCreateTag = () => {
  return useMutation({
    mutationFn: Tags.create,
    onMutate: async (newTag) => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousTags = queryClient.getQueryData<Tag.Model[]>([QUERY_KEY]);

      return previousTags;
    },
    onError: (_, __, context: any) => {
      if (context?.previousTags) {
        queryClient.setQueryData([QUERY_KEY], context.previousTags);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
};
