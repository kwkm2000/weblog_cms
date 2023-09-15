/* eslint-disable testing-library/prefer-screen-queries */

import { rest } from "msw";
import { expect, test } from "./test";

const articles = [
  {
    id: 8,
    title: "こんにちは、世界",
    headerImage: "",
    text: [
      {
        type: "paragraph",
        children: [
          {
            text: "ほげほげ",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "ふがふが",
          },
        ],
      },
    ],
    createdAt: "2023-09-03T12:38:50.006Z",
    updatedAt: "2023-09-12T12:25:02.885Z",
  },
  {
    id: 7,
    title: "ブログを作り直した",
    headerImage: "",
    text: [
      {
        type: "paragraph",
        children: [
          {
            text: "Slatejsでエディターを作り直して、ブログを実装し直した",
          },
        ],
      },
    ],
    createdAt: "2023-08-06T07:29:52.580Z",
    updatedAt: "2023-08-06T07:29:52.580Z",
  },
  {
    id: 2,
    title: "headerあり",
    headerImage:
      "https://weblog-images-dev.s3.amazonaws.com/31b7aad8-0e75-4920-8c6c-41dd4fc7473a_E01LANL044T-U04LFQX8ELQ-d79c052a3dff-512.png",
    text: [
      {
        type: "paragraph",
        children: [
          {
            text: "A line of text in a paragraph.",
          },
        ],
      },
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/A_cat_on_a_motorcycle_in_the_medina_of_Tunis_20171017_131525.jpg/1200px-A_cat_on_a_motorcycle_in_the_medina_of_Tunis_20171017_131525.jpg",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
    createdAt: "2023-07-13T10:54:38.728Z",
    updatedAt: "2023-07-13T10:54:38.728Z",
  },
];

test.beforeEach(async ({ page, worker }) => {
  // mswのワーカーを開始
  worker.use(
    rest.post("/auth/login", (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({
          jwt: "dummy_token",
          user: {
            id: 1,
            username: "admin",
            createdAt: "",
            updatedAt: "",
          },
        })
      );
    })
  );

  worker.use(
    rest.get("/articles", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(articles));
    })
  );

  worker.use(
    rest.get("/articles/8", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(articles[0]));
    })
  );

  await page.goto("http://localhost:3000");
  // ログインページに移動
  await page.getByText("to Login Page").click();
  // ログイン処理
  await page.fill('input[placeholder="Username"]', "email");
  await page.fill('input[placeholder="password"]', "password");
  await page.click("text=Log in");

  // 詳細ページへ遷移
  await page.getByText("こんにちは、世界").click();
});

test.describe("articleDetail", () => {
  test.describe("編集", () => {
    test("タイトルが正しい", async ({ page }) => {
      await expect(page.getByText("こんにちは、世界")).toBeVisible();
    });

    test("編集前の値が入力されている", async ({ page }) => {
      await page.getByRole("button", { name: "編集" }).click();
      const articleTItle = page.getByTestId("article-title");
      const articleEditor = page.getByTestId("article-editor");

      // 編集前の値が入力されているかチェックする
      await expect(articleTItle).toHaveValue("こんにちは、世界");
      await expect(articleEditor).toHaveText("ほげほげ ふがふが");
    });
  });
});
