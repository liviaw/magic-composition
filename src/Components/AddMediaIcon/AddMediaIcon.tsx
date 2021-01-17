import React, { useRef } from "react";
import icon from "./photo.svg";
import styles from "./AddMediaIcon.module.css";
import { Media, isImage, isVideo, showError } from "..";

type Props = {
  addFile: (files: File[]) => void;
};

export const AddMediaIcon: React.FC<Props> = ({ addFile }) => {
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    let files: FileList = event.target.files;
    const addedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (isImage(files[i]) || isVideo(files[i])) {
        addedFiles.push(files[i]);
      } else {
        showError("invalid file " + files[i].name);
      }
    }
    addFile(addedFiles);
  };
  return (
    <div className={styles.addMediaIconContainer}>
      <label htmlFor="fileUpload">
        <div className={styles.addfileButton}>
          <img className={styles.icon} src={icon} alt="add file icon" />
          <p> + Add Files </p>
        </div>
      </label>
      <input
        hidden
        multiple
        id="fileUpload"
        type="file"
        accept="video/* image/*"
        onChange={handleVideoUpload}
      />
    </div>
  );
};
