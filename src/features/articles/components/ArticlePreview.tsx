import React, { FC } from "react";
import { Descendant, Element as SlateElement, Text } from "slate";

// 各ノードをHTMLに変換する関数
const nodeToHTML = (node: Descendant): string => {
  if (Text.isText(node)) {
    return node.text;
  }

  const element = node as SlateElement;
  const children = serialize(element.children);

  switch (element.type) {
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "image":
      return `<img src="${element.url}">`;
    // 他のノードタイプもここで処理します...
    default:
      return children;
  }
};

// ノードを再帰的に処理してHTMLを生成する関数
const serialize = (nodes: Descendant[]): string => {
  return nodes.map(nodeToHTML).join("");
};

interface SlateToHtmlProps {
  value: Descendant[];
}

// Descendant[]を受け取り、それをHTMLに変換して描画するReactコンポーネント
const SlateToHtml: FC<SlateToHtmlProps> = ({ value }) => {
  const html = serialize(value);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SlateToHtml;
