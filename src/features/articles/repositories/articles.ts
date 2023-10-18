import { Article, Articles } from "@/features/articles/models";
import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

const token = storage.getToken();

/**
 * 記事をすべて取得する
 *
 * @returns 記事一覧のPromiseObject
 */
export async function getALl(): Promise<Articles.Model> {
  return axios.get("/articles");
}

export async function getOne(id: number): Promise<Article.Model> {
  return axios.get(`/articles/${id}`);
}

export async function create(
  value: Article.CreateValue
): Promise<Article.Model> {
  return axios.post(
    "/articles",
    {
      title: value.title,
      text: value.text,
      tagIds: value.tagIds,
      headerImage: value.headerImage,
      draft: value.draft,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function update({
  id,
  value,
}: Article.UpdateValue): Promise<void> {
  const dto = { ...value, text: value.text };

  return axios.put(
    `/articles/${id}`,
    {
      title: dto.title,
      text: dto.text,
      tagIds: dto.tagIds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function remove(id: number) {
  return axios.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
