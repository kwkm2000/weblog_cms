import { Article, Articles } from "../models";

const url = "http://localhost:4000";

export interface createValue {
  title: string;
  text: string;
  tagIds: number[];
}

export async function getALl() {
  try {
    const articles: Articles.Model = await (
      await fetch(`${url}/articles`)
    ).json();
    return articles;
  } catch (e) {
    throw e;
  }
}

export async function getOne(id: number) {
  try {
    const article: Article.Model = await (
      await fetch(`${url}/articles/${id}`)
    ).json();
    return article;
  } catch (e) {
    throw e;
  }
}

export function create(value: createValue) {
  try {
    fetch(`${url}/articles`, {
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
