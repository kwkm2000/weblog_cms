import React, { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const response = await fetch("http://localhost:4000/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading image");
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default ImageUploader;
