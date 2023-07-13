import * as Tag from "../../tags/models/tag";
import { Descendant } from "slate";

export interface Model {
  readonly id: number;
  readonly title: string;
  readonly text: Descendant[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tags: Tag.Model[];
  readonly headerImage: string;
}

export type CreateValue = {
  title: Model["title"];
  text: Model["text"];
  tagIds: number[];
  headerImage: Model["headerImage"];
};
