import { Tag } from "@/features/tags/models";
import axios from "axios";

// // const url = "http://13.231.5.6:4000";
const url = "http://localhost:4000";

/**
 * タグをすべて取得する
 *
 * @returns タグのPromiseObject
 */
export async function getALl(): Promise<Tag.Model[]> {
  return await axios.get(`${url}/tags`);
}

export async function getOne(id: Tag.Model["id"]): Promise<Tag.Model> {
  return await axios.get(`${url}/tags${id}`);
}

export async function create(label: Tag.Model["label"]): Promise<Tag.Model> {
  return await axios.post(`${url}/tags`, {
    label,
  });
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
  return await axios.delete(`${url}/articles/${id}`);
}
