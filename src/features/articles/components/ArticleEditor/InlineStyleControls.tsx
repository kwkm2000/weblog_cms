import React from "react";
import StyleButton from "@/features/articles/components/ArticleEditor/StyleButton";
import { EditorState } from "draft-js";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
] as const;

interface Props {
  editorState: EditorState;
  onToggle: (type: any) => void;
}

export default function BlockStyleControls(props: Props) {
  const { editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          isActive={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}
