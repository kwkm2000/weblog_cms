import styles from "../styles/Home.module.css";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

export interface Tag {
  id: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [checkedTagIds, setCheckedTagIds] = useState<number[]>([]);
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const data = {
        title,
        text,
        tagIds: checkedTagIds,
      };
      fetch("http://13.231.5.6:4000/articles", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [title, text]
  );
  const onChangeTitle = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setTitle(value);
  }, []);
  const onChangeText = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;

      setText(value);
    },
    []
  );
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
    const tags: Tag[] = await tagsResponse.json();

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
          <input type="text" onChange={onChangeTitle} />
        </div>
        <div>
          <textarea name="" id="" cols="30" rows="10" onChange={onChangeText} />
        </div>
        <div>
          {tags.map((tag: Tag) => {
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
