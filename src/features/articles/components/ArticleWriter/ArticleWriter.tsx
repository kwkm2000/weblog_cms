import React from "react";
import { Articles } from "../../repositories";
import { Article } from "../../models";
import RichTextEditor from "../RichTextEditor";
import TagList from "@/features/tags/components/TagList";
import ImageUploader from "@/features/images/components/ImageUpload/ImageUploader";
import { Descendant } from "slate";

interface Props {
  // 初期値、新規作成時は渡さず更新時に渡す、
  initialValue?: Article.Model;
  onCreateValue: (value: Articles.CreateValue) => void;
}

export default function ArticleWriter({ initialValue, onCreateValue }: Props) {
  const [title, setTitle] = React.useState(initialValue?.title || "");
  const [headerImage, setHeaderImage] = React.useState<string>("");
  const handleContentChange = (newValue: Descendant[]) => {
    setContent(newValue);
  };
  const [content, setContent] = React.useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
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

      if (!content) {
        throw Error;
      }

      const data: Articles.CreateValue = {
        title,
        headerImage,
        text: content,
        tagIds: checkedTagIds,
      };

      if (!title.length) {
        alert("titleがからです！");
        return;
      }

      onCreateValue(data);
    },
    [title, content, checkedTagIds, onCreateValue, headerImage]
  );

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
