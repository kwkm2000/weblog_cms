import { renderHook, act } from "@testing-library/react";
import { Descendant } from "slate";
import { useArticleWriter } from "./hooks";
import { Props } from "./ArticleWriter";
import { Article } from "@/features/articles/models";

describe("useArticleWriter", () => {
  const initialValue: Article.Model = {
    id: 1,
    title: "Old Title",
    tags: [],
    text: [
      {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
      },
    ],
    createdAt: "2023-07-13T11:31:48.170Z",
    updatedAt: "2023-07-13T11:31:48.170Z",
    headerImage: "",
    draft: false,
  };

  const initialContent: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  const newContent: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A new line of text in a paragraph." }],
    },
  ];

  it("タイトルの変更を処理できること", () => {
    const { result } = renderHook(() =>
      useArticleWriter({ initialValue, onCreateValue: jest.fn() } as Props)
    );

    expect(result.current.title).toBe("Old Title");

    act(() => {
      result.current.onChangeTitle({
        currentTarget: { value: "New Title" },
      } as React.FormEvent<HTMLInputElement>);
    });

    expect(result.current.title).toBe("New Title");
  });

  it("ヘッダー画像の変更を処理できること", () => {
    const { result } = renderHook(() =>
      useArticleWriter({ initialValue, onCreateValue: jest.fn() } as Props)
    );

    expect(result.current.headerImage).toBe("");

    act(() => {
      result.current.setHeaderImage("New Image URL");
    });

    expect(result.current.headerImage).toBe("New Image URL");
  });

  it("コンテンツの変更を処理できること", () => {
    const { result } = renderHook(() =>
      useArticleWriter({ initialValue, onCreateValue: jest.fn() } as Props)
    );

    expect(result.current.content).toEqual(initialContent);

    act(() => {
      result.current.handleContentChange(newContent);
    });

    expect(result.current.content).toEqual(newContent);
  });

  it("有効なタイトルとコンテンツで送信するときの処理", () => {
    const mockOnCreateValue = jest.fn();
    const { result } = renderHook(() =>
      useArticleWriter({
        initialValue,
        onCreateValue: mockOnCreateValue,
      } as Props)
    );

    act(() => {
      result.current.onChangeTitle({
        currentTarget: { value: "New Title" },
      } as React.FormEvent<HTMLInputElement>);
      result.current.setHeaderImage("New Image URL");
      result.current.handleContentChange(newContent);
    });

    act(() => {
      result.current.onSubmit(
        {
          preventDefault: jest.fn(),
        } as any,
        false
      );
    });

    expect(mockOnCreateValue).toHaveBeenCalled();
  });

  it("タイトルが空の場合の送信処理", () => {
    const mockOnCreateValue = jest.fn();
    const { result } = renderHook(() =>
      useArticleWriter({
        initialValue: { ...initialValue, title: "" },
        onCreateValue: mockOnCreateValue,
      } as Props)
    );

    act(() => {
      result.current.onSubmit(
        {
          preventDefault: jest.fn(),
        } as any,
        false
      );
    });

    expect(mockOnCreateValue).not.toHaveBeenCalled();
  });

  it("下書き保存の場合の送信処理", () => {
    const mockOnCreateValue = jest.fn();
    const { result } = renderHook(() =>
      useArticleWriter({
        initialValue,
        onCreateValue: mockOnCreateValue,
      } as Props)
    );

    act(() => {
      result.current.onChangeTitle({
        currentTarget: { value: "New Title" },
      } as React.FormEvent<HTMLInputElement>);
      result.current.setHeaderImage("New Image URL");
      result.current.handleContentChange(newContent);
    });

    act(() => {
      result.current.onSubmit(
        {
          preventDefault: jest.fn(),
        } as any,
        true
      );
    });

    expect(mockOnCreateValue).toHaveBeenCalled();
    console.log(
      "mockOnCreateValue.mock.calls[0][0]",
      mockOnCreateValue.mock.calls[0][0]
    );
    expect(mockOnCreateValue.mock.calls[0][0]).toEqual({
      title: "New Title",
      headerImage: "New Image URL",
      text: newContent,
      draft: true,
      tagIds: [],
    });
  });
});
