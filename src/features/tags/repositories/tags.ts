import { Tag } from "@/features/tags/models";
import { axios } from "@/lib/axios";

/**
 * タグをすべて取得する
 *
 * @returns タグのPromiseObject
 */
export function getALl(): Promise<Tag.Model[]> {
  return axios.get(`/tags`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY3OTA0MTQ0NCwiZXhwIjoxNjc5MDQzMjQ0fQ.oJbivXlYXGEDUDIFEd1KK16vF0cVkUE5GHzpD4lLqkM`,
    },
  });
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY3ODk3ODA3NiwiZXhwIjoxNjc4OTc5ODc2fQ.u4Rv19Y3aVn02wbLZwH_Z0HzwGGJ8exGSml_MWDacCg`,
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
  return await axios.delete(`/articles/${id}`);
}
