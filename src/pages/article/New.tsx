import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleEditor from "../../components/ArticleEditor";
import { Articles } from "../../domain/repositories";
import { Tag } from "../../domain/models";

function ArticleNew() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<Tag.Model[]>([]);
  const [checkedTagIds, setCheckedTagIds] = useState<number[]>([]);
  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
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
      await Articles.create(data);
      navigate("/");
    },
    [title, text, navigate, checkedTagIds]
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
  }, [fetchAndSetTags]);

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
        <Link to={"/article/1"}>Topへ</Link>
      </p>
    </main>
  );
}

export default ArticleNew;
