import { useState } from "react";
import { useCreateTag } from "@/features/tags/api/createTag";

export const useTagCreator = () => {
  const [label, setLabel] = useState("");
  const createTagMutation = useCreateTag();
  const createTag = async () => {
    await createTagMutation.createTag(label);
    setLabel("");
  };
  const onChange = (value: string) => {
    setLabel(value);
  };

  return {
    label,
    createTag,
    onChange,
  };
};
