import { Article, Articles } from "../models";

const url = "http://13.231.5.6:4000";

export interface createValue {
  title: string;
  text: string;
  tagIds: number[];
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

export async function create(value: createValue) {
  try {
    await fetch(`${url}/articles`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(value),
    });
  } catch (e) {
    throw e;
  }
}

export async function update(id: number) {}

export async function remove(id: number) {
  try {
    await fetch(`${url}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (e) {
    throw e;
  }
}
