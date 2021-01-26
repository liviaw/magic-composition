import React from "react";
import icon from "./addPhotoIcon.svg";
import styles from "./AddMediaIcon.module.css";
import type { MediaPresenter } from "../MediaPresenter";

type Props = {
  mediaPresenter: MediaPresenter;
};

export const AddMediaIcon: React.FC<Props> = ({ mediaPresenter }) => {
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    let files: FileList = event.target.files;
    Array.from(files).forEach((file: File) => {
      mediaPresenter.addFile(file);
      console.log("im so sad :(");
      console.log(mediaPresenter.getFilesLength());
    })
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
