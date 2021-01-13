import React, { useState, useEffect } from "react";
import { 
    showError, 
    isImage,
    isVideo, 
    imageDuration
} from "..";
import styles from "./ImageWrapper.module.css";

type Props = {
    file: File;
    changeImage: () => void;
    addMedia: () => void;
}

export const ImageWrapper: React.FC<Props> = ({
    file,
    changeImage,
    addMedia,
}) => {
    useEffect(() => {
        const timeout = setTimeout(changeImage, imageDuration);
        return () => clearTimeout(timeout);
    }, [])
    return(<img
        className={styles.renderMedia}
        src={URL.createObjectURL(file)}
        onLoad={() => {
            alert("image wrapper done loading!");
            addMedia();
        }}
        alt={file.name}
      />);
}