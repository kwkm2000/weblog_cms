import React from "react";
import { RawDraftContentState } from "draft-js";

interface Props {
  text: RawDraftContentState;
}

export default function ArticlePreview(props: Props) {
  const { text } = props;

  React.useEffect(() => {}, []);

  if (!text.blocks.length) {
    return <></>;
  }

  return (
    <div style={{ border: "1px solid red" }}>
      <div>preview</div>
      <p>----</p>
      {text.blocks.map((block) => {
        return <div key={block.key}>{block.text}</div>;
      })}
    </div>
  );
}
