import React, { useEffect } from "react";
import { imageDuration } from "..";
import styles from "./ImageWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
};
// future: add media can be optional
// if no add media, then do ot set timeout
export const ImageWrapper: React.FC<Props> = ({ file, changeImage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeImage();
    }, imageDuration);
  }, [file]);
  return (
    <img
      className={styles.renderMedia}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
};
