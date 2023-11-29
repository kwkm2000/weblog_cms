import useSWR from "swr";
import { Tags } from "@/features/tags/repositories";
import { QUERY_KEY } from "@/features/tags/api/queryKey";

export const useCreateTag = () => {
  const {
    data: previousTags = [],
    error,
    mutate,
  } = useSWR(QUERY_KEY, Tags.getAll);

  const createTag = async (newTagLabel: string) => {
    // 楽観的更新

    const tmpNewTag = {
      id: previousTags.length + 1,
      label: newTagLabel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("[...previousTags, tmpNewTag]", [...previousTags, tmpNewTag]);
    mutate([...previousTags, tmpNewTag], false);

    try {
      const newTagCreated = await Tags.create(newTagLabel);

      // キャッシュ更新
      mutate([...previousTags, newTagCreated]);

      return newTagCreated;
    } catch (error) {
      console.error(error);
      // On error, roll back to the previous value
      mutate(previousTags, false);

      throw error;
    }
  };

  return { createTag, error };
};
