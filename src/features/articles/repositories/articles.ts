import { Article, Articles } from "../models";
import { RawDraftContentState } from "draft-js";

// const url = "http://13.231.5.6:4000";
const url = "http://localhost:4000";

export interface CreateValue {
  title: Article.Model["title"];
  text: RawDraftContentState;
  tagIds: number[];
}

export interface UpdateValue {
  id: Article.Model["id"];
  value: CreateValue;
}

function rawTextBlockToString(raw: RawDraftContentState) {
  return JSON.stringify(raw, null, 2);
}

/**
 * 記事をすべて取得する
 *
 * @returns 記事一覧のPromiseObject
 */
export async function getALl(): Promise<Articles.Model> {
  const articles: Articles.Model = await (
    await fetch(`${url}/articles`)
  ).json();
  return articles;
}

export async function getOne(id: number): Promise<Article.Model> {
  try {
    const article: Article.Model = await (
      await fetch(`${url}/articles/${id}`)
    ).json();
    return article;
  } catch (e) {
    throw e;
  }
}

export async function create(value: CreateValue): Promise<void> {
  const dto = { ...value, text: rawTextBlockToString(value.text) };

  await fetch(`${url}/articles`, {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function update({ id, value }: UpdateValue): Promise<void> {
  const dto = { ...value, text: rawTextBlockToString(value.text) };
  await fetch(`${url}/articles/${id}`, {
    headers: {
      "Content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(dto),
  });
}

export async function remove(id: number) {
  await fetch(`${url}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}
