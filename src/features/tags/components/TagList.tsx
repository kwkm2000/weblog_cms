import { useTags } from "@/features/tags/api/getTags";
import { Link } from "react-router-dom";

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
            <Link to={`/article/${tag.id}`}>{tag.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
