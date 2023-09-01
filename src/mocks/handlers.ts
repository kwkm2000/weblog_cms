// mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/auth/login", (req, res, ctx) => {
    // ここでリクエストボディの検証を行うことも可能です

    // ダミーレスポンス
    return res(ctx.status(200), ctx.json({ message: "dummy_response" }));
  }),
];
