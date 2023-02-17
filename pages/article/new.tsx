import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ArticleEditor from "../../components/ArticleEditor";
import { Articles } from "../../domain/repositories";
import { Tag } from "../../domain/models";

export default function ArticleNew() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<Tag.Model[]>([]);
  const [checkedTagIds, setCheckedTagIds] = useState<number[]>([]);
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const data: Articles.createValue = {
        title,
        text,
        tagIds: checkedTagIds,
      };

      if (!title.length) {
        alert("titleがからです！");
        return;
      }
      Articles.create(data);
    },
    [title, text]
  );
  const onChangeTitle = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      setTitle(value);
    },
    [setTitle]
  );
  const onChangeText = useCallback((text: string) => {
    setText(text);
  }, []);
  const onChangeTagId = useCallback(
    (id: number) => {
      if (!checkedTagIds.includes(id)) {
        setCheckedTagIds([...checkedTagIds, id]);
      } else {
        setCheckedTagIds(checkedTagIds.filter((tagId) => tagId !== id));
      }
    },
    [checkedTagIds]
  );
  const fetchAndSetTags = useCallback(async () => {
    const tagsResponse = await fetch("http://13.231.5.6:4000/tags");
    const tags: Tag.Model[] = await tagsResponse.json();

    setTags(tags);
  }, []);

  useEffect(() => {
    fetchAndSetTags();
  }, []);

  return (
    <main>
      <h1>New Article</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" value={title} onChange={onChangeTitle} />
        </div>
        <ArticleEditor onChangeText={onChangeText} />

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
      <p>
        <Link href="/">Topへ</Link>
      </p>
    </main>
  );
}
