// components/RichTextEditor.tsx
import React, { useMemo, useState } from "react";
import { createEditor, Descendant, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface RichTextEditorProps {
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Editable />
    </Slate>
  );
};

export default RichTextEditor;
