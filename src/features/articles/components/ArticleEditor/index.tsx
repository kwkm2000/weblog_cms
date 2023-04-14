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
import ArticlePreview from "@/features/articles/components/ArticlePreview";
import BlockStyleControls from "@/features/articles/components/ArticleEditor/BlockStyleControls";
import InlineStyleControls from "@/features/articles/components/ArticleEditor/InlineStyleControls";
import styles from "./index.module.css";

export interface Props {
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
  const toggleBlockType = React.useCallback(
    (type: string) => {
      setEditorState(RichUtils.toggleBlockType(editorState, type));
    },
    [setEditorState, editorState]
  );
  const toggleInlineType = React.useCallback(
    (type: string) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
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
        <div className={styles.root}>
          <div className={styles.inner}></div>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineType}
          />
          <div
            style={{
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
              data-testid="article-editor"
            />
          </div>
        </div>
      )}
      <ArticlePreview text={convertToRaw(editorState.getCurrentContent())} />
    </>
  );
}
