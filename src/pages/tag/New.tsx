import { Link } from "react-router-dom";
import TagCreator from "@/features/tags/components/TagCreator/TagCreator";

export default function TagNew() {
  return (
    <main>
      <h1>New Tag</h1>
      <TagCreator />
      <p>
        <Link to="/">Topへ</Link>
      </p>
    </main>
  );
}
