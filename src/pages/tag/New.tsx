import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCreateTag } from "@/features/tags/api/createTag";
import TagList from "@/features/tags/components/TagList";

export default function TagNew() {
  const [label, setLabel] = useState("");
  const createTagMutation = useCreateTag();
  const createTag = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      await createTagMutation.mutateAsync(label);
      setLabel("");
    },
    [label, createTagMutation]
  );
  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setLabel(value);
  }, []);

  return (
    <main>
      <h1>New Tag</h1>
      <form onSubmit={createTag}>
        <div>
          <input type="text" value={label} onChange={onChange} />
        </div>
        <TagList />
        <button>Submit</button>
      </form>
      <p>
        <Link to="/">Topへ</Link>
      </p>
    </main>
  );
}
