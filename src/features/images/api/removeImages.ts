import useSWR from "swr";
import { Images } from "../repositories";
import { QUERY_KEY } from "@/features/images/api/queryKey";

export function useRemoveImage() {
  const {
    data: images = [],
    error,
    mutate,
  } = useSWR([QUERY_KEY], Images.getAll);

  const removeImage = async (key: string) => {
    const previousImages = images;

    mutate(
      images.filter((image) => image !== key),
      false
    );
    try {
      await Images.remove(key);
    } catch (error) {
      mutate(previousImages, false);
      throw error;
    }
  };

  // const remove = async (keyToRemove) => {
  //   const previousImages = images;

  //   try {
  //     await Images.remove(keyToRemove);
  //     mutate(
  //       [QUERY_KEY],
  //       images.filter((image) => image.key !== keyToRemove),
  //       false
  //     );
  //   } catch (error) {
  //     mutate([QUERY_KEY], previousImages, false);
  //     throw error;
  //   }
  // };

  return { images, error, removeImage };
}
