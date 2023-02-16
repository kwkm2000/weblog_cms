import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ArticleDetail() {
  const router = useRouter();
  const [id, setId] = React.useState<string>();
  const [article, setArticle] = React.useState();
  // const { id } = router.query;
  const getArticle = async () => {
    const article = await (
      await fetch(`http://localhost:4000/articles/${id}`)
    ).json();
    setArticle(article);
  };

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

  return (
    <main>
      <h2>{article.title}</h2>
      {article.text.blocks.map((block) => {
        return <p>{block.text}</p>;
      })}
      <p>
        <Link href="/">TOPへ</Link>
      </p>
    </main>
  );
}
