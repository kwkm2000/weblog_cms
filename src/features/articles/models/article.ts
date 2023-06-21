import { RawDraftContentState } from "draft-js";
import * as Tag from "../../tags/models/tag";
import { Descendant } from "slate";

export interface Model {
  readonly id: number;
  readonly title: string;
  readonly text: Descendant[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tags: Tag.Model[];
}

export type Value = Pick<Model, "title" | "text" | "tags">;
