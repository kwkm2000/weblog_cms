import React from "react";
import { Articles } from "../repositories";
import { Article } from "../models";
import ArticleEditor from "./ArticleEditor";
import TagList from "@/features/tags/components/TagList";
import ImageUploader from "@/features/images/components/ImageUpload/ImageUploader";

/**
 *
 * {@label Props
 *
 */
interface Props {
  // 初期値、新規作成時は渡さず更新時に渡す、
  initialValue?: Article.Model;
  onCreateValue: (value: Articles.CreateValue) => void;
}

export default function ArticleWriter({ initialValue, onCreateValue }: Props) {
  const [text, setText] = React.useState(initialValue?.text);
  const [title, setTitle] = React.useState(initialValue?.title || "");
  const [headerImage, setHeaderImage] = React.useState<string | null>(null);
  const [checkedTagIds] = React.useState<number[]>(() => {
    if (initialValue) {
      return initialValue.tags.map((tag) => tag.id);
    }
    return [];
  });
  const onChangeTitle = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      setTitle(value);
    },
    [setTitle]
  );
  const onSubmit = React.useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!text) {
        throw Error;
      }

      const data: Articles.CreateValue = {
        title,
        text,
        tagIds: checkedTagIds,
      };

      if (!title.length) {
        alert("titleがからです！");
        return;
      }
      onCreateValue(data);
    },
    [title, text, checkedTagIds, onCreateValue]
  );

  return (
    <form onSubmit={onSubmit}>
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

      <ArticleEditor
        data-testid="article-editor"
        onChangeText={(text) => {
          setText(text);
        }}
        initialValue={initialValue?.text}
      />

      <div>
        <h2>Tag</h2>
        <TagList />
      </div>
      <button>Submit</button>
    </form>
  );
}
