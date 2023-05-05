import React, { useState } from "react";
import { uploadImage } from "@/features/images/repositories/images";
import ImagesList from "@/features/images/components/ImageList/ImagesList";

type Props = {
  onSelectImage?: (imgPath: string) => void;
};

export default function ImageUploader({ onSelectImage }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const response = await uploadImage(formData);

      alert("画像をアップロードしました！");
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading image");
    }

    setUploading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <ImagesList
        onClickImage={(path) => {
          if (onSelectImage) {
            onSelectImage(path);
          }
        }}
      ></ImagesList>
    </>
  );
}
