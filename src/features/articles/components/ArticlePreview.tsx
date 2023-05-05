import React from "react";
import { RawDraftContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

interface Props {
  text: RawDraftContentState;
}

export default function ArticlePreview(props: Props) {
  const { text } = props;
  const markup = draftToHtml(text);

  if (!text.blocks.length) {
    return <></>;
  }

  return (
    <div style={{ border: "1px solid red" }}>
      <h2>preview</h2>
      <p>----</p>
      <div dangerouslySetInnerHTML={{ __html: markup }}></div>
    </div>
  );
}
