import React from "react";
import { Articles } from "../repositories";
import { Tag } from "../../../domain/models";
import ArticleEditor from "./ArticleEditor";
import { Article } from "../models";

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
  const [tags, setTags] = React.useState<Tag.Model[]>(initialValue?.tags || []);
  const [title, setTitle] = React.useState(initialValue?.title || "");
  const [checkedTagIds, setCheckedTagIds] = React.useState<number[]>(() => {
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
  const onChangeTagId = React.useCallback(
    (id: number) => {
      if (!checkedTagIds.includes(id)) {
        setCheckedTagIds([...checkedTagIds, id]);
      } else {
        setCheckedTagIds(checkedTagIds.filter((tagId) => tagId !== id));
      }
    },
    [checkedTagIds]
  );
  const fetchAndSetTags = React.useCallback(async () => {
    const tagsResponse = await fetch("http://13.231.5.6:4000/tags");
    const tags: Tag.Model[] = await tagsResponse.json();

    setTags(tags);
  }, []);

  React.useEffect(() => {
    fetchAndSetTags();
  }, [fetchAndSetTags]);

  React.useEffect(() => {
    if (!initialValue) {
      return;
    }
  }, [initialValue]);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" value={title} onChange={onChangeTitle} />
      </div>
      <ArticleEditor
        onChangeText={(text) => {
          setText(text);
        }}
        initialValue={initialValue?.text}
      />

      <div>
        <p>Tag</p>
        {tags.map((tag: Tag.Model) => {
          return (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                onChange={() => {
                  onChangeTagId(tag.id);
                }}
              />
              {tag.label}
            </label>
          );
        })}
      </div>
      <button>Submit</button>
    </form>
  );
}
