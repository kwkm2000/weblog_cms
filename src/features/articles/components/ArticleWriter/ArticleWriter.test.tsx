import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArticleWriter from "./ArticleWriter";
import { Article, Articles } from "../../models";
import { Tag } from "@/features/tags/models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockArticle: Article.Model = {
  id: 1,
  title: "slate",
  headerImage: "",
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
          text: "slate",
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
          text: "slate",
        },
      ],
    },
  ],
  createdAt: "2023-06-20T12:12:55.403Z",
  updatedAt: "2023-06-20T12:12:55.403Z",
  tags: [],
};

describe("ArticleWriter", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const onCreateValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("新規作成時に初期値が空の状態でレンダリングされること", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ArticleWriter onCreateValue={onCreateValue} />
      </QueryClientProvider>
    );
    const titleInputElement = screen.getByTestId("article-title");
    expect(titleInputElement).toHaveValue("");
  });

  test("初期値が渡されたときに、渡された値でレンダリングされること", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ArticleWriter
          initialValue={mockArticle}
          onCreateValue={onCreateValue}
        />
      </QueryClientProvider>
    );

    const titleInputElement = screen.getByTestId("article-title");
    expect(titleInputElement).toHaveValue(mockArticle.title);
  });
});
