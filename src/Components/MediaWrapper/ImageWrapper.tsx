import React, { useEffect } from "react";
import { imageDuration } from "..";
import styles from "./ImageWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
  duration: number;
};
// future: add media can be optional
// if no add media, then do ot set timeout
export const ImageWrapper: React.FC<Props> = ({ file, changeImage, duration }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeImage();
    }, duration);
  }, [file]);
  return (
    <img
      className={styles.renderMedia}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
};
