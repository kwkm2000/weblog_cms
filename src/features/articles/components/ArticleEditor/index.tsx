import React from "react";
import {
  EditorState,
  convertToRaw,
  RichUtils,
  convertFromRaw,
  RawDraftContentState,
  AtomicBlockUtils,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import "draft-js/dist/Draft.css";
import ArticlePreview from "@/features/articles/components/ArticlePreview";
import BlockStyleControls from "@/features/articles/components/ArticleEditor/BlockStyleControls";
import InlineStyleControls from "@/features/articles/components/ArticleEditor/InlineStyleControls";
import styles from "./index.module.css";
import createImagePlugin from "@draft-js-plugins/image";
import ImageUploader from "@/features/images/components/ImageUpload/ImageUploader";

export interface Props {
  onChangeText: (text: RawDraftContentState) => void;
  initialValue?: RawDraftContentState;
}

export default function ArticleEditor(props: Props) {
  const imagePlugin = createImagePlugin();
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
      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
      console.log("raw", raw);

      if (!Object.keys(raw.entityMap).length) {
        console.log("return!!!");
        return;
      }
      setEditorState(editorState);
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

  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  // const handleKeyCommand = (command: string, editorState: EditorState) => {
  //   console.log("command", command);
  //   if (command === "split-block") {
  //     const contentState = editorState.getCurrentContent();
  //     const entityMap = contentState.getEntityMap();

  //     if (Object.keys(entityMap).length === 0) {
  //       return "handled";
  //     }
  //   }
  //   return "not-handled";
  // };

  React.useEffect(() => {
    setEditorEnable(true);
    setInitialValue();
  }, [setInitialValue]);

  return (
    <>
      {editorEnable && (
        <div className={styles.root}>
          <div className={styles.inner}></div>
          <ImageUploader
            onSelectImage={(imgPath: string) => {
              insertImage(imgPath);
            }}
          />
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
              plugins={[imagePlugin]}
              // handleKeyCommand={handleKeyCommand}
            />
          </div>
        </div>
      )}
      <ArticlePreview text={convertToRaw(editorState.getCurrentContent())} />
    </>
  );
}
