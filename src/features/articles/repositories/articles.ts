import { Article, Articles } from "@/features/articles/models";
import { RawDraftContentState } from "draft-js";
import { axios } from "@/lib/axios";
import storage from "@/utils/storage";
import { Descendant } from "slate";

export interface CreateValue {
  title: Article.Model["title"];
  text: Descendant[];
  tagIds: number[];
}

export interface UpdateValue {
  id: Article.Model["id"];
  value: CreateValue;
}

const token = storage.getToken();

function rawTextBlockToString(raw: RawDraftContentState) {
  return JSON.stringify(raw, null, 2);
}

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

export async function create(value: CreateValue): Promise<Article.Model> {
  const dto = { ...value, text: value.text };

  return axios.post(
    "/articles",
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

export async function update({ id, value }: UpdateValue): Promise<void> {
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
