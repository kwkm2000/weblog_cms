import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ArticleEditor, { Props } from "./";
import { RawDraftContentState } from "draft-js";
import userEvent from "@testing-library/user-event";

describe("ArticleEditor", () => {
  const initialText: RawDraftContentState = {
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
  };

  const setup = (props: Partial<Props> = {}) => {
    const onChangeText = jest.fn();
    render(<ArticleEditor onChangeText={onChangeText} {...props} />);
    const editor = screen.getByRole("textbox");

    return {
      onChangeText,
      editor,
    };
  };

  test("コンポーネントが初期値なしでレンダリングされること", () => {
    const { editor } = setup();
    expect(editor).toBeInTheDocument();
  });

  test("コンポーネントが初期値付きでレンダリングされること", () => {
    const { editor } = setup({ initialValue: initialText });
    expect(editor).toBeInTheDocument();
  });

  test("コンテナがクリックされたときにエディタにフォーカスが移ること", () => {
    const { editor } = setup();
    fireEvent.click(editor);
    expect(editor).toHaveFocus();
  });
});
