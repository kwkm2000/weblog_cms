import React from "react";
import { useImages } from "@/features/images/api/getImages";
import styles from "./style.module.css";

type Props = {
  onClickImage?: (path: string) => void;
};

export default function ImagesList({ onClickImage }: Props) {
  const { images, isLoading } = useImages();

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <ul className={styles.root}>
      {images?.map((image, index) => {
        return (
          <li key={index} className={styles.column}>
            <button
              onClick={(event) => {
                event.preventDefault();

                if (onClickImage) {
                  onClickImage(image);
                }
              }}
            >
              <img src={image} alt="" className={styles.img} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
