import React from "react";
import { Article } from "@/features/articles/models";
import { Descendant } from "slate";
import { Props } from "./ArticleWriter";

export const useArticleWriter = ({ initialValue, onCreateValue }: Props) => {
  const initialText = initialValue?.text || [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const initialTagIds = initialValue?.tags
    ? initialValue.tags.map((tag) => tag.id)
    : [];
  const [title, setTitle] = React.useState(initialValue?.title || "");
  const [tagIds, setTagIds] = React.useState<number[]>(initialTagIds);
  const [headerImage, setHeaderImage] = React.useState<string>("");
  const handleContentChange = (newValue: Descendant[]) => {
    setContent(newValue);
  };
  const [content, setContent] = React.useState<Descendant[]>(initialText);
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

      const data: Article.CreateValue = {
        title,
        headerImage,
        text: content,
        tagIds,
        draft: false,
      };

      try {
        Article.CreateValueSchema.parse(data);
        onCreateValue(data);
      } catch (error) {
        alert("入力値が不正です");
        console.error(error);
      }
    },
    [title, content, tagIds, onCreateValue, headerImage]
  );

  const onDraft = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      const data: Article.CreateValue = {
        title,
        headerImage,
        text: content,
        tagIds,
        draft: true,
      };

      try {
        Article.CreateValueSchema.parse(data);
        onCreateValue(data);
      } catch (error) {
        alert("入力値が不正です");
        console.error(error);
      }
    },
    [title, content, tagIds, onCreateValue, headerImage]
  );

  return {
    title,
    headerImage,
    setHeaderImage,
    setTagIds,
    handleContentChange,
    content,
    onChangeTitle,
    onSubmit,
    onDraft,
  };
};
