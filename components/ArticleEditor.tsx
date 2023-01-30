import React from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function ArticleEditor() {
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
  const onPress = React.useCallback(() => {
    const contentState = editorState.getCurrentContent();

    const raw = convertToRaw(contentState);
    console.log("raw", raw);

    console.log(JSON.stringify(raw, null, 2));
  }, [editorState]);

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
      <button onClick={onPress}>Save</button>
    </>
  );
}
