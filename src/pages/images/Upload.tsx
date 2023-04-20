import { Link } from "react-router-dom";
import ImageUploader from "@/features/images/components/ImageUploader";

export default function ArticleNewPage() {
  return (
    <main>
      <h1>Images Upload</h1>
      <ImageUploader />
      <p>
        <Link to={"/"}>Topへ</Link>
      </p>
    </main>
  );
}
