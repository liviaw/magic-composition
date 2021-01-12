import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { 
    showError, 
    isImage,
    isVideo, 
    imageDuration
} from "..";
import styles from "./ImageView.module.css";

type Props = {
    file: File;
    changeImage: () => void;
    addMedia: () => void;
}

export const ImageView: React.FC<Props> = ({
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
        onLoad={() => {console.log("image wrapper done loading!")}}
        alt={file.name}
      />);
}