import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "./Dropbox.module.css";
import importLogo from "../../Media/importLogo.svg";
import type { MediaPresenter } from "../../MediaPresenter";
import { showError } from "../Toast/Toast";

type Props = {
  mediaPresenter: MediaPresenter;
};

/*
 * Drag and Drop to Import your Media
 * the App will let you know if it is not
 * a supported file
 * then lead you to preview the media imported
 */

export const Dropbox: React.FC<Props> = observer(({ mediaPresenter }) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  // creating elemenets to be displayed for preview
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      Array.from(e.dataTransfer.items).forEach((item: any) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          let file = item.getAsFile();
          if (file == null) {
            return;
          }
          if (!mediaPresenter.addFile(file)) {
            showError("Oh no! " + file.name + " is a duplicated file or unacceptable file format");
          }
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      Array.from(e.dataTransfer.files).forEach((file: File) => {
        if (!mediaPresenter.addFile(file)) {
          showError("Oh no! " + file.name + " is a duplicated file or unacceptable file format");
        }
      });
    }
    e.stopPropagation();
  };
  const dragOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dragEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!onDragState) {
      setOnDragState(true);
    }
  };
  const handleMediaUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null) return;
    const files: FileList = event.target.files;
    Array.from(files).forEach((file: File) => {
      if (!mediaPresenter.addFile(file)) {
        showError("Oh no! " + file.name + " is a duplicated file or unacceptable file format");
      }
    });
  };
  return (
    <div
      className={styles.dotted}
      onDragEnter={dragEnterHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={(e) => {
        setOnDragState(false);
        e.preventDefault();
      }}
    >
      {onDragState && (
          <p>drop your files here📥</p>
      )}
      <img src={importLogo} className={styles.importLogo} alt="import logo" />
      <br />
      <p>
        Drop Media here or
        <label htmlFor="fileUpload">
          <span className={styles.addMediaText}>browse</span>
        </label>
        <input
          hidden
          multiple
          id="fileUpload"
          type="file"
          accept="video/* image/*"
          onChange={handleMediaUpload}
        />
      </p>
      <p className={styles.smallText}>
        You can upload images, videos, svg and gifs
      </p>
    </div>
  );
});
