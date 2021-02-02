import React from "react";
import icon from "./addPhotoIcon.svg";
import styles from "./AddMediaIcon.module.css";
import type { MediaPresenter } from "../MediaPresenter";
import { showError } from "../ErrorToast/ErrorToast";

type Props = {
  mediaPresenter: MediaPresenter;
};

export const AddMediaIcon: React.FC<Props> = ({ mediaPresenter }) => {
  const handleMediaUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    const files: FileList = event.target.files;
    Array.from(files).forEach((file: File) => {
      if (!mediaPresenter.addFile(file)) {
        showError(file.name + "is not an acceptable file format");
      }
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
        onChange={handleMediaUpload}
      />
    </div>
  );
};
