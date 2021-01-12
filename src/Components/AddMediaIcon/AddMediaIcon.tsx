import React, { useRef } from "react";
import icon from "./photo.svg";
import styles from "./AddMediaIcon.module.css";
import { Media } from "..";

type Props = {
  addFile: (newMedia: Media[]) => void;
  createMediaElement: (addFiles: Media[], file: File) => void;
};

export const AddMediaIcon: React.FC<Props> = ({ addFile, createMediaElement }) => {
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    let files: FileList = event.target.files;
    const newMedia: Media[] = [];
    for (let i = 0; i < files.length; i++) {
      createMediaElement(newMedia, files[i]);
    }
    addFile(newMedia);
  };
  return (
      <div className={styles.addMediaIconContainer}>
        <label htmlFor="fileUpload">
          <div className={styles.addfileButton}>
            <img className={styles.icon} src={icon} alt="add file icon" />
            <p> Add Files </p>
          </div>
        </label>
        <input
          hidden
          id="fileUpload"
          type="file"
          accept="video/* image/*"
          onChange={handleVideoUpload}
        />
      </div>
  );
};
