import { RawDraftContentState } from "draft-js";

export interface Model {
  readonly id: number;
  readonly title: string;
  readonly text: RawDraftContentState;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  tags: [];
}
