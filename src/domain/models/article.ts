import { RawDraftContentState } from "draft-js";
import * as Tag from "./tag";

export interface Model {
  readonly id: number;
  readonly title: string;
  readonly text: RawDraftContentState;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly tags: Tag.Model[];
}

export type Value = Pick<Model, "title" | "text" | "tags">;
