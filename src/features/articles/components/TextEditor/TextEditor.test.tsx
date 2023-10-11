import { renderHook, act } from "@testing-library/react";
import { Props } from "./TextEditor";
import { Editor, Element as SlateElement, Transforms } from "slate";
import { useTextEditor } from "./hooks";
import { Article } from "../../models";

// Slate の一部のメソッドをモックします
jest.mock("slate", () => ({
  ...jest.requireActual("slate"),
  Transforms: {
    insertNodes: jest.fn(),
    unwrapNodes: jest.fn(),
    setNodes: jest.fn(),
    wrapNodes: jest.fn(),
  },
  Editor: {
    nodes: jest.fn(),
  },
}));

describe("useTextEditor", () => {
  let props: Props;
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

  beforeEach(() => {
    props = {
      initialValue: initialValue.text,
      onChange: jest.fn(),
    };
  });

  it("初期値の設定", () => {
    const { result } = renderHook(() => useTextEditor(props));
    expect(result.current.value).toEqual(initialValue.text);
  });

  it("handleInsertImage", () => {
    const { result } = renderHook(() => useTextEditor(props));
    act(() => result.current.handleInsertImage("hoge.png"));

    expect(Transforms.insertNodes).toBeCalledTimes(1);
    expect(result.current.imageUrl).toBe("");
  });

  it("toggleBlock", () => {
    const { result } = renderHook(() => useTextEditor(props));
    (Editor.nodes as jest.Mock).mockReturnValueOnce([false]);

    act(() => result.current.toggleBlock("paragraph"));

    expect(Editor.nodes).toBeCalledTimes(1);
    expect(Transforms.unwrapNodes).toBeCalledTimes(1);
    expect(Transforms.setNodes).toBeCalledTimes(1);
  });

  it("isBlockActive", () => {
    const { result } = renderHook(() => useTextEditor(props));
    (Editor.nodes as jest.Mock).mockReturnValueOnce([false]);

    act(() => result.current.isBlockActive("paragraph"));

    expect(Editor.nodes).toBeCalledTimes(1);
  });
});
