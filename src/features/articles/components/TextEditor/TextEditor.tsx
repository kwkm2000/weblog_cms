import React from "react";
import { Descendant } from "slate";
import { Slate, Editable, RenderElementProps } from "slate-react";
import { useTextEditor } from "./hooks";

export interface Props {
  initialValue: Descendant[];
  onChange: (newValue: Descendant[]) => void;
}

const TextEditor: React.FC<Props> = ({ initialValue, onChange }) => {
  const {
    toggleBlock,
    editor,
    value,
    setValue,
    imageUrlInputRef,
    handleInsertImage,
    imageUrl,
    setImageUrl,
  } = useTextEditor({
    initialValue,
    onChange,
  });

  return (
    <div>
      <div>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("heading-one");
          }}
        >
          H1
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("heading-two");
          }}
        >
          H2
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("block-quote");
          }}
        >
          Blockquote
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("numbered-list");
          }}
        >
          Numbered List
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("bulleted-list");
          }}
        >
          Bulleted List
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleBlock("preformatted");
          }}
        >
          Code Block
        </button>
      </div>
      <div>
        <input
          type="text"
          value={imageUrl}
          onChange={(event) => {
            setImageUrl(event.target.value);
          }}
          placeholder="Image URL"
          ref={imageUrlInputRef}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            handleInsertImage(imageUrl);
          }}
        >
          Insert Image
        </button>
      </div>

      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value) => {
          onChange(value);
          setValue(value);
        }}
      >
        <Editable
          data-testid="article-editor"
          renderElement={({
            attributes,
            children,
            element,
          }: RenderElementProps) => {
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
              case "image":
                return <img {...attributes} src={element.url} alt="" />;
              default:
                return <p {...attributes}>{children}</p>;
            }
          }}
          placeholder="Write some rich text here..."
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
