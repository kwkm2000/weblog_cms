import React from "react";
import { useImages } from "@/features/images/api/getImages";
import styles from "./style.module.css";

type Props = {
  onClickImage?: (path: string) => void;
};

export default function ImagesList({ onClickImage }: Props) {
  const imagesQuery = useImages();

  if (imagesQuery.isLoading) {
    return <p>loading...</p>;
  }

  return (
    <ul className={styles.root}>
      {imagesQuery.data?.map((image, index) => {
        return (
          <button
            className={styles.button}
            onClick={(event) => {
              event.preventDefault();

              if (onClickImage) {
                onClickImage(image);
              }
            }}
          >
            <li key={index} className={styles.column}>
              <img src={image} alt="" className={styles.img} />
            </li>
          </button>
        );
      })}
    </ul>
  );
}
