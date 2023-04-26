import { useImages } from "@/features/images/api/getImages";

export default function ImagesList() {
  const imagesQuery = useImages();

  if (imagesQuery.isLoading) {
    return <p>loading...</p>;
  }

  if (!imagesQuery.data) {
    return null;
  }

  console.log(imagesQuery.data);
  return (
    <ul>
      {imagesQuery.data.map((image, index) => {
        return (
          <li key={index}>
            <img src={image} alt="" />
          </li>
        );
      })}
    </ul>
  );
}
