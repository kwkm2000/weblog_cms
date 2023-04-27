import React, { useState } from "react";
import { uploadImage } from "@/features/images/repositories/images";
import ImagesList from "@/features/images/components/ImageList/ImagesList";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      setUploadedImage(response);
      console.log("hoge", response);
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
      <ImagesList></ImagesList>
      {/* {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="" />
        </div>
      )} */}
    </>
  );
}
