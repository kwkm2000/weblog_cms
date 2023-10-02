import React from "react";
import { Article } from "@/features/articles/models";
import TextEditor from "@/features/articles/components/TextEditor/TextEditor";
import TagList from "@/features/tags/components/TagList";
import ImageUploader from "@/features/images/components/ImageUpload/ImageUploader";
import { useArticleWriter } from "./hooks";

export interface Props {
  // 初期値、新規作成時は渡さず更新時に渡す、
  initialValue?: Article.Model;
  // 記事の新規作成 or 記事に更新時に呼ばれる関数
  onCreateValue: (value: Article.CreateValue) => void;
}

export default function ArticleWriter({ initialValue, onCreateValue }: Props) {
  const {
    title,
    headerImage,
    setHeaderImage,
    handleContentChange,
    content,
    onChangeTitle,
    onSubmit,
    onDraft,
  } = useArticleWriter({
    initialValue,
    onCreateValue,
  });

  return (
    <>
      <h2>Header Image</h2>
      {headerImage ? (
        <p>
          <img src={headerImage} alt="" />
        </p>
      ) : (
        <>
          <p>HeaderImageがないです</p>
          <ImageUploader
            onSelectImage={(imgPath) => {
              setHeaderImage(imgPath);
            }}
          />
        </>
      )}

      <h2>Heading</h2>
      <div>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={onChangeTitle}
          data-testid="article-title"
        />
      </div>
      <h2>Body</h2>
      <TextEditor initialValue={content} onChange={handleContentChange} />

      <div>
        <h2>Tag</h2>
        <TagList />
      </div>

      <div>
        <button onClick={onSubmit} data-testid="article-submit-button">
          Submit
        </button>
      </div>
      <div>
        <button onClick={onDraft} data-testid="article-draft-button">
          draft
        </button>
      </div>
    </>
  );
}
