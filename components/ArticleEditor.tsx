import React from "react";
import { Editor, EditorState, convertToRaw, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

interface Props {
  onChangeText: (text: string) => void;
}

export default function ArticleEditor(props: Props) {
  const { onChangeText } = props;
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const editor = React.useRef(null);
  function focusEditor() {
    if (!editor.current) {
      return;
    }
    editor.current.focus();
  }
  const onSave = React.useCallback(() => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    console.log("raw", raw);
    console.log("JSONString", JSON.stringify(raw, null, 2));

    onChangeText(JSON.stringify(raw, null, 2));
  }, [editorState, onChangeText]);
  const onChange = React.useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
    },
    [setEditorState]
  );
  const toggleBold = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    },
    [setEditorState, RichUtils, editorState]
  );
  const toggleHeaderOne = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    },
    [setEditorState, RichUtils, editorState]
  );
  const toggleHeaderTwo = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
    },
    [setEditorState, RichUtils, editorState]
  );

  return (
    <>
      <div
        style={{ border: "1px solid white", minHeight: "6em", cursor: "text" }}
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something!"
        />
      </div>
      <div>
        <button onClick={onSave}>Save</button>
      </div>
      <div>
        <button onClick={toggleBold}>Bold</button>
      </div>
      <div>
        <button onClick={toggleHeaderOne}>h1</button>
      </div>
      <div>
        <button onClick={toggleHeaderTwo}>h2</button>
      </div>
    </>
  );
}
