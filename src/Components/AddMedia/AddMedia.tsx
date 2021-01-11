import React, { useRef } from "react";
import icon from "./photo.svg";
import styles from "./AddMedia.module.css";
import { Media } from "..";

type Props = {
  addFile: (newMedia: Media[]) => void;
  mediaElement: (addFiles: Media[], file: File) => void;
};

export const AddMedia: React.FC<Props> = ({ addFile, mediaElement }) => {
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    let files: FileList = event.target.files;
    const newMedia: Media[] = [];
    for (let i = 0; i < files.length; i++) {
      mediaElement(newMedia, files[i]);
    }
    addFile(newMedia);
  };
  return (
    <>
      <div>
        <label htmlFor="fileUpload">
          <div className={styles.addfileButton}>
            <img className={styles.icon} src={icon} alt="add file icon" />
            <span> Add Files </span>
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
    </>
  );
};
