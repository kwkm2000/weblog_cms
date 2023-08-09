import { useState, useCallback } from "react";
import { useCreateTag } from "@/features/tags/api/createTag";

export const useTagCreator = () => {
  const [label, setLabel] = useState("");
  const createTagMutation = useCreateTag();
  const createTag = useCallback(async () => {
    await createTagMutation.mutateAsync(label);
    setLabel("");
  }, [label, createTagMutation]);
  const onChange = useCallback((value: string) => {
    setLabel(value);
  }, []);

  return {
    label,
    createTag,
    onChange,
  };
};