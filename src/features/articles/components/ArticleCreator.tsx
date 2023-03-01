import React from "react";
import { useCreateArticle } from "../api/createArticle";
import { useNavigate } from "react-router-dom";
import { Articles } from "../repositories";
import { Tag } from "../../../domain/models";
import ArticleEditor from "./ArticleEditor";

export default function ArticleCreator() {
  const navigate = useNavigate();
  const [text, setText] = React.useState("");
  const [tags, setTags] = React.useState<Tag.Model[]>([]);
  const [title, setTitle] = React.useState("");
  const [checkedTagIds, setCheckedTagIds] = React.useState<number[]>([]);
  const createArticlesMutation = useCreateArticle();
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
      const data: Articles.createValue = {
        title,
        text,
        tagIds: checkedTagIds,
      };

      if (!title.length) {
        alert("titleがからです！");
        return;
      }

      await createArticlesMutation.mutateAsync(data);
      navigate("/");
    },
    [title, text, navigate, checkedTagIds, createArticlesMutation]
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

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" value={title} onChange={onChangeTitle} />
      </div>
      <ArticleEditor
        onChangeText={(text) => {
          setText(text);
        }}
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
