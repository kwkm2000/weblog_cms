import { Tag } from "@/features/tags/models";
import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

const token = storage.getToken();

/**
 * タグをすべて取得する
 *
 * @returns タグのPromiseObject
 */
export async function getAll(): Promise<Tag.Model[]> {
  const response = await axios.get(`/tags`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getOne(id: Tag.Model["id"]): Promise<Tag.Model> {
  return await axios.get(`/tags${id}`);
}

export async function create(label: Tag.Model["label"]): Promise<Tag.Model> {
  return await axios.post(
    `/tags`,
    {
      label,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// export async function update({ id, value }: UpdateValue): Promise<void> {
//   const dto = { ...value, text: rawTextBlockToString(value.text) };
//   await fetch(`${url}/articles/${id}`, {
//     headers: {
//       "Content-type": "application/json",
//     },
//     method: "PUT",
//     body: JSON.stringify(dto),
//   });
// }

export async function remove(id: Tag.Model["id"]) {
  return await axios.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
