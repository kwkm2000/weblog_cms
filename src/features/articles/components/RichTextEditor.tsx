import React, { useMemo, useState, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";
import { CustomElement } from "../../../slateCustomTypes";

interface Props {
  initialValue: Descendant[];
  onChange: (newValue: Descendant[]) => void;
}

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextEditor: React.FC<Props> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback(
    ({ attributes, children, element }: RenderElementProps) => {
      switch (element.type) {
        case "block-quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
          return <ul {...attributes}>{children}</ul>;
        case "heading-one":
          return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
          return <h2 {...attributes}>{children}</h2>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        case "numbered-list":
          return <ol {...attributes}>{children}</ol>;
        case "paragraph":
          return <p {...attributes}>{children}</p>;
        case "preformatted":
          return <pre {...attributes}>{children}</pre>;
        default:
          return <p {...attributes}>{children}</p>;
      }
    },
    []
  );

  const toggleBlock = (type: CustomElement["type"]) => {
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
      const block = { type, children: [] };
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

  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("heading-one");
        }}
      >
        H1
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("heading-two");
        }}
      >
        H2
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("block-quote");
        }}
      >
        Blockquote
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("numbered-list");
        }}
      >
        Numbered List
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("bulleted-list");
        }}
      >
        Bulleted List
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("preformatted");
        }}
      >
        Code Block
      </button>
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value) => {
          onChange(value);
          setValue(value);
        }}
      >
        <Editable
          renderElement={renderElement}
          placeholder="Write some rich text here..."
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
