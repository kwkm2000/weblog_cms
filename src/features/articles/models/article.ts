import * as Tag from "@/features//tags/models/tag";
import { Descendant } from "slate";
import { z } from "zod";

const TextSchema = z.record(z.any()).transform((v) => v as Descendant);
const TagsSchema = z.record(z.any()).transform((v) => v as Tag.Model);

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  text: z.array(TextSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(TagsSchema),
  headerImage: z.string(),
});

export const CreateValueSchema = ArticleSchema.pick({
  title: true,
  text: true,
  headerImage: true,
}).extend({
  tagIds: z.array(z.number()),
});

export const UpdateValueSchema = z.object({
  id: z.number(),
  value: CreateValueSchema,
});

export type Model = z.infer<typeof ArticleSchema>;
export type CreateValue = z.infer<typeof CreateValueSchema>;
export type UpdateValue = z.infer<typeof UpdateValueSchema>;
