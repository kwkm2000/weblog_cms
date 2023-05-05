import React from "react";
import {
  RawDraftContentState,
  DraftEntityType,
  DraftEntityMutability,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

type Props = {
  text: RawDraftContentState;
};

type DraftEntity = {
  type: DraftEntityType;
  mutability: DraftEntityMutability;
  data: any;
};

export default function ArticlePreview(props: Props) {
  const { text } = props;
  const customImageEntityTransform = (
    entity: DraftEntity
  ): string | undefined => {
    if (entity.type !== "IMAGE") {
      return undefined;
    }

    if (entity.data?.src?.length > 0) {
      return `<div class="image"><img src="${entity.data.src}" alt="" /></div>`;
    }
  };
  const markup = draftToHtml(
    text,
    undefined,
    undefined,
    customImageEntityTransform
  );

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
