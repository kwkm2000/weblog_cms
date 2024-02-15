import { useTags } from "@/features/tags/api/getTags";

export default function TagList() {
  const { tags, isError, isLoading } = useTags();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!tags) {
    return null;
  }

  return (
    <ul>
      {tags.map((tag) => {
        return (
          <li key={tag.id}>
            <input type="checkbox" />
            <label htmlFor="">{tag.label}</label>
          </li>
        );
      })}
    </ul>
  );
}
