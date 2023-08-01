import React from "react";
import TagList from "@/features/tags/components/TagList";
import { useTagCreator } from "./hooks";

export default function TagCreator() {
  const { createTag, onChange, label } = useTagCreator();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTag();
        }}
        data-testid="tag-creator-form"
      >
        <div>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
            data-testid="tag-creator-input"
          />
        </div>
        <TagList />
        <button data-testid="tag-creator-button">Submit</button>
      </form>
    </>
  );
}
