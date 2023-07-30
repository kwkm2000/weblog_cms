import React from "react";
import { Articles } from "../../repositories";
import { Descendant } from "slate";
import { Props } from "./ArticleWriter";

export const useArticleWriter = ({ initialValue, onCreateValue }: Props) => {
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
    (e: React.SyntheticEvent) => {
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
        if (!window) {
          return;
        }

        alert("titleがからです！");
        return;
      }

      onCreateValue(data);
    },
    [title, content, checkedTagIds, onCreateValue, headerImage]
  );

  return {
    title,
    headerImage,
    setHeaderImage,
    handleContentChange,
    content,
    onChangeTitle,
    onSubmit,
  };
};
