import React, { useMemo, useState, useCallback, useRef } from "react";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor,
  Element as SlateElement,
} from "slate";
import { withReact } from "slate-react";
import { CustomElement, ImageElement } from "../../../../slateCustomTypes";
import { Props } from "./TextEditor";

type ToggleElement = Exclude<CustomElement, ImageElement>;
const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const useTextEditor = ({ initialValue, onChange }: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [imageUrl, setImageUrl] = useState("");
  const imageUrlInputRef = useRef<HTMLInputElement>(null);

  const insertImage = (url: string) => {
    const image: ImageElement = {
      type: "image",
      url,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, image);
  };

  const handleInsertImage = (imageUrl: string) => {
    if (!imageUrl) {
      return;
    }

    insertImage(imageUrl);
    setImageUrl("");
  };

  const toggleBlock = (type: ToggleElement["type"]) => {
    const isActive = isBlockActive(type);
    const isList = LIST_TYPES.includes(type);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) ? n.type : ""
        ),
      split: true,
    });
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : type,
    });

    if (!isActive && isList) {
      const block: ToggleElement = { type, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (type: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    });

    return !!match;
  };

  return {
    toggleBlock,
    setValue,
    imageUrlInputRef,
    handleInsertImage,
    editor,
    value,
    imageUrl,
    setImageUrl,
    isBlockActive,
  };
};
