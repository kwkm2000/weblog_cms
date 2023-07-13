import React from "react";
import { Articles } from "../../repositories";
import { Article } from "../../models";
import RichTextEditor from "../RichTextEditor";
import TagList from "@/features/tags/components/TagList";
import ImageUploader from "@/features/images/components/ImageUpload/ImageUploader";
import { useArticleWriter } from "./hooks";

export interface Props {
  // 初期値、新規作成時は渡さず更新時に渡す、
  initialValue?: Article.Model;
  onCreateValue: (value: Articles.CreateValue) => void;
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
      <RichTextEditor initialValue={content} onChange={handleContentChange} />

      <div>
        <h2>Tag</h2>
        <TagList />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
