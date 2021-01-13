import React, { useState, useEffect } from "react";
import { showError, isImage, isVideo, imageDuration } from "..";
import styles from "./ImageWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
  addMedia: () => void;
};
// future: add media can be optional
// if no add media, then do ot set timeout
export const ImageWrapper: React.FC<Props> = ({
  file,
  changeImage,
  addMedia,
}) => {
  useEffect(() => {
    const timeout = setTimeout(changeImage, 1000);
	}, []);
	const [loaded, setLoaded] = useState(false);
  return (
    <img
      className={styles.renderMedia}
      src={URL.createObjectURL(file)}
      onLoad={() => {
				if (loaded === false) {
					setLoaded(true);
					addMedia();
				}
      }}
      alt={file.name}
    />
  );
};
