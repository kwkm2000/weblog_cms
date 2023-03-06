import { useTags } from "@/features/tags/api/getTags";

export default function TagList() {
  const tagsQuery = useTags();

  if (tagsQuery.isLoading) {
    return <p>loading...</p>;
  }

  if (!tagsQuery.data) {
    return null;
  }

  console.log(tagsQuery.data);
  return (
    <ul>
      {tagsQuery.data.map((tag) => {
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
