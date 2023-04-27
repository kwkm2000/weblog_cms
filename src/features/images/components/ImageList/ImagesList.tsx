import { useImages } from "@/features/images/api/getImages";
import styles from "./style.module.css";

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
    <ul className={styles.root}>
      {imagesQuery.data.map((image, index) => {
        return (
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <li key={index} className={styles.column}>
              <img src={image} alt="" className={styles.img} />
            </li>
          </a>
        );
      })}
    </ul>
  );
}
