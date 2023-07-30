import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ArticleWriter from "../components/ArticleWriter/ArticleWriter";
import { Article } from "../models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("ArticleWriter", () => {
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
  };

  it("必要な要素がレンダリングされている", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ArticleWriter
          onCreateValue={mockOnCreateValue}
          initialValue={mockInitialValue}
        />
      </QueryClientProvider>
    );

    const articleTitle = screen.getByTestId("article-title");
    const articleEditor = screen.getByTestId("article-editor");
    const articleSubmitButton = screen.getByTestId("article-submit-button");

    expect(articleTitle).toBeInTheDocument();
    expect(articleEditor).toBeInTheDocument();
    expect(articleSubmitButton).toBeInTheDocument();
  });

  it("記事のタイトルの入力", () => {
    const { debug } = render(
      <QueryClientProvider client={queryClient}>
        <ArticleWriter
          onCreateValue={mockOnCreateValue}
          initialValue={mockInitialValue}
        />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByTestId("article-title"), {
      target: { value: "New Test Title" },
    });
    expect(screen.getByDisplayValue("New Test Title")).toBeInTheDocument();
  });
});
