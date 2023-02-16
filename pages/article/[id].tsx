import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Article from "../../domain/models/article";

export default function ArticleDetail() {
  const router = useRouter();
  const [id, setId] = React.useState<string>();
  const [article, setArticle] = React.useState<Article.Model>();
  const getArticle = async () => {
    const article: Article.Model = await (
      await fetch(`http://localhost:4000/articles/${id}`)
    ).json();
    setArticle(article);
  };
  const removeArticle = React.useCallback(async () => {
    console.log("id", id);

    try {
      await fetch(`http://localhost:4000/articles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log("DELETE Error");
      console.error(error);
    }
  }, [id, router]);

  React.useEffect(() => {
    if (router.asPath !== router.route) {
      const queryId = router.query.id;
      if (!queryId || Array.isArray(queryId)) {
        return;
      }

      setId(queryId);
    }
  }, [router]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    getArticle();
  }, [id]);

  if (!article) {
    return;
  }

  return (
    <main>
      <h2>{article.title}</h2>
      {article.text.blocks.map((block) => {
        return <p key={block.key}>{block.text}</p>;
      })}

      <div>
        <button onClick={removeArticle}>削除</button>
      </div>

      <p>
        <Link href="/">TOPへ</Link>
      </p>
    </main>
  );
}
