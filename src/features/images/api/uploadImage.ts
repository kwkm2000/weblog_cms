import useSWR, { mutate } from "swr";
import { Images } from "../repositories";
import { QUERY_KEY } from "@/features/images/api/queryKey";

export function useUploadImage() {
  // TODO あとでなおす
  // const uploadImage = async (newImage: any) => {
  //   const response = await Images.uploadImage(newImage);
  //   mutate([QUERY_KEY], async () => {
  //     return response.data;
  //   });
  //   return response.data;
  // };
  // return { uploadImage };
}
