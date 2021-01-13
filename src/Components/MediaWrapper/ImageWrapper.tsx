import React, { useState, useEffect } from "react";
import { showError, isImage, isVideo, imageDuration } from "..";
import styles from "./ImageWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
};
// future: add media can be optional
// if no add media, then do ot set timeout
export const ImageWrapper: React.FC<Props> = ({ file, changeImage }) => {
  useEffect(() => {
    console.log("timer starts");
    const timeout = setTimeout(() => {
      changeImage();
      console.log("rovi kissed ivor");
    }, imageDuration);
  }, []);
  return (
    <img
      className={styles.renderMedia}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
};
