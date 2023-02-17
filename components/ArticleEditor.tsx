import React from "react";
import { Editor, EditorState, convertToRaw, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import ArticlePreview from "./ArticlePreview";

interface Props {
  onChangeText: (text: string) => void;
}

export default function ArticleEditor(props: Props) {
  const [editorEnable, setEditorEnable] = React.useState(false);
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
  const onChange = React.useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
      onChangeText(JSON.stringify(raw, null, 2));
    },
    [setEditorState]
  );

  React.useEffect(() => {
    setEditorEnable(true);
  }, []);

  return (
    <>
      {editorEnable && (
        <>
          <div
            style={{
              border: "1px solid red",
              minHeight: "6em",
              cursor: "text",
            }}
            onClick={focusEditor}
          >
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={onChange}
              placeholder="Write something!"
            />
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
      )}
      <ArticlePreview text={convertToRaw(editorState.getCurrentContent())} />
    </>
  );
}
