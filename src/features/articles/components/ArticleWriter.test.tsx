import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArticleWriter from "./ArticleWriter";
import { Article, Articles } from "../models";
import { Tag } from "@/features/tags/models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockArticle: Article.Model = {
  id: 1,
  title: "Test title",
  text: {
    blocks: [
      {
        key: "1",
        text: "Initial text",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [
    {
      id: 1,
      label: "Test tag",
    } as Tag.Model,
  ],
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

  // test("タイトルが空の状態でSubmitボタンを押すとアラートが表示される", async () => {
  //   jest.spyOn(window, "alert").mockImplementation(() => {});
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <ArticleWriter onCreateValue={onCreateValue} />
  //     </QueryClientProvider>
  //   );

  //   await userEvent.click(screen.getByText("Submit"));

  //   expect(window.alert).toHaveBeenCalledWith("titleがからです！");
  // });

  //   test("タイトルが入力されたとき、onCreateValueが正しいデータで呼ばれること", () => {
  //     const newTitle = "New title";
  //     const newText = "New text";
  //     render(<ArticleWriter onCreateValue={onCreateValue} />);

  //     fireEvent.change(screen.getByRole("textbox"), {
  //       target: { value: newTitle },
  //     });

  //     // この部分ではArticleEditorで使用した方法を使用して、エディタの内容が変更されたことをシミュレートします。
  //     // ただし、これはテストの目的に応じて適切な方法を選択する必要があります。
  //     fireEvent.change(screen.getByRole("textbox", { name: /article-editor/i }), {
  //       target: { value: newText },
  //     });

  //     userEvent.click(screen.getByText("Submit"));

  //     expect(onCreateValue).toHaveBeenCalledWith({
  //       title: newTitle,
  //       text: newText,
  //       tagIds: [],
  //     });
  //   });
});
