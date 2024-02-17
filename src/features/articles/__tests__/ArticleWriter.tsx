import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ArticleWriter from "../components/ArticleWriter/ArticleWriter";
import { Article } from "../models";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("ArticleWriter", () => {
  const handlers = [
    rest.get("http://api.mizuiro-lab.tokyo/tags", (req, res, ctx) => {
      return res(ctx.json([]));
    }),
    rest.get("http://api.mizuiro-lab.tokyo/images", (req, res, ctx) => {
      return res(
        ctx.json([
          "https://dummyimage.com/600x400/000/fff",
          "https://dummyimage.com/600x400/000/fff",
        ])
      );
    }),
  ];
  const server = setupServer(...handlers);
  const mockOnCreateValue = jest.fn();
  const mockInitialValue: Article.Model = {
    id: 6,
    tags: [],
    title: "TextEditor",
    headerImage: "",
    text: [
      {
        type: "paragraph",
        children: [
          {
            text: "Texdt Editor",
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
        type: "image",
        url: "https://upmostly.com/wp-content/uploads/react-onchange.jpg",
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
            text: "",
          },
        ],
      },
    ],
    createdAt: "2023-07-18T12:32:56.014Z",
    updatedAt: "2023-07-18T12:32:56.014Z",
    draft: false,
  };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("必要な要素がレンダリングされている", () => {
    render(
      <ArticleWriter
        onCreateValue={mockOnCreateValue}
        initialValue={mockInitialValue}
      />
    );

    const articleTitle = screen.getByTestId("article-title");
    const articleEditor = screen.getByTestId("article-editor");
    const articleSubmitButton = screen.getByTestId("article-submit-button");
    const articleDraftButton = screen.getByTestId("article-draft-button");

    expect(articleTitle).toBeInTheDocument();
    expect(articleEditor).toBeInTheDocument();
    expect(articleSubmitButton).toBeInTheDocument();
    expect(articleDraftButton).toBeInTheDocument();
  });

  it("記事のタイトルの入力", () => {
    const { debug } = render(
      <ArticleWriter
        onCreateValue={mockOnCreateValue}
        initialValue={mockInitialValue}
      />
    );

    fireEvent.change(screen.getByTestId("article-title"), {
      target: { value: "New Test Title" },
    });
    expect(screen.getByDisplayValue("New Test Title")).toBeInTheDocument();
  });
});
