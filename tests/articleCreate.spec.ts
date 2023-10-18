/* eslint-disable testing-library/prefer-screen-queries */

import { rest } from "msw";
import { expect, test } from "./test";

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

  await page.goto("http://localhost:3000");
  // ログインページに移動
  await page.getByText("to Login Page").click();
  // ログイン処理
  await page.fill('input[placeholder="Username"]', "email");
  await page.fill('input[placeholder="password"]', "password");
  await page.click("text=Log in");
  //  記事作成ページに遷移
  await page.getByText("/article/new").click();
});

test.describe("articleCreate", () => {
  test("タイトルが正しい", async ({ page }) => {
    await expect(page.getByText("New Article")).toBeVisible();
  });

  test("正しい記事の値を送信している", async ({ page, worker }) => {
    worker.use(
      rest.post("/articles", (req, res, ctx) => {
        const { title, text } = req.body;

        if (
          title !== "記事タイトル" ||
          text[0].children[0].text !== "記事本文"
        ) {
          return res(ctx.status(400));
        }

        return res(
          ctx.status(201),
          ctx.json({
            title: "aaa",
            text: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "てすとです",
                  },
                ],
              },
            ],
            headerImage: "",
            createdAt: "2023-09-01T14:32:17.584Z",
            updatedAt: "2023-09-01T14:32:17.584Z",
            tags: [],
            id: 10,
          })
        );
      })
    );
    await page.fill('input[placeholder="title"]', "記事タイトル");
    await page.getByTestId("article-editor").fill("記事本文");
    // 記事本文が正しく入力されていること
    await expect(page.getByTestId("article-editor")).toHaveText("記事本文");

    await page.click("text=Submit");

    // 記事一覧ページに遷移していること
    await expect(page.getByText("CMS")).toBeVisible();
  });
});
