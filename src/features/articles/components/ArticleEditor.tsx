import React from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import ArticlePreview from "./ArticlePreview";

interface Props {
  onChangeText: (text: RawDraftContentState) => void;
  initialValue?: RawDraftContentState;
}

export default function ArticleEditor(props: Props) {
  const { onChangeText, initialValue } = props;
  const [editorEnable, setEditorEnable] = React.useState(false);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const editor = React.useRef<any>(null);
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
    [setEditorState, editorState]
  );
  const toggleHeaderOne = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    },
    [setEditorState, editorState]
  );
  const toggleHeaderTwo = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
    },
    [setEditorState, editorState]
  );
  const onChange = React.useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);

      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
      onChangeText(raw);
    },
    [onChangeText]
  );
  // 初期値を渡されたときに値をセットする
  const setInitialValue = React.useCallback(() => {
    if (!initialValue) {
      return;
    }
    const contentState = convertFromRaw(initialValue);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [initialValue]);

  React.useEffect(() => {
    setEditorEnable(true);
    setInitialValue();
  }, [setInitialValue]);

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
