import { useState } from "react";
import { Link } from "react-router-dom";
import { ArticlesList } from "@/features/articles/components/ArticlesList";
import { Descendant } from "slate";
import RichTextEditor from "@/features/articles/components/RichTextEditor";

function Home() {
  const [content, setContent] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const handleContentChange = (newValue: Descendant[]) => {
    console.log("newValue", newValue);
    setContent(newValue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>CMS</h1>
      </header>

      <p>New Article Page</p>
      <p>
        <Link to={"/article/new"}>/article/new</Link>
      </p>
      <p>New Tag Page</p>
      <p>
        <Link to={"/tag/new"}>/tag/new</Link>
      </p>
      <p>Images upload</p>
      <p>
        <Link to={"/images/upload"}>/images/upload</Link>
      </p>

      <hr />
      <RichTextEditor initialValue={content} onChange={handleContentChange} />

      <hr />
      <ArticlesList />
    </div>
  );
}

export default Home;
