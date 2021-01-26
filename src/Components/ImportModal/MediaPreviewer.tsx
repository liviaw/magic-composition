import React, { useState, useEffect } from "react";
import styles from "./ImportModal.module.css";
import { trimmedName } from "../utils";
import { AddMediaIcon } from "../AddMediaIcon/AddMediaIcon";
import character from "../../Media/character.png";
import { MediaComponent } from "./MediaComponent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import type { MediaPresenter } from "../MediaPresenter";

type Props = {
  mediaPresenter: MediaPresenter;
  setMediaReady: (func: (numberReady: number) => number) => void;
};

export const ImportComponents: React.FC<Props> = ({
  mediaPresenter,
  setMediaReady,
}) => {
  return (
    <div className={styles.dotted}>
      {/* filename (key) to JSX element (value) mapping */}
      {mediaPresenter.getFiles().map((file: File, index: number) => {
        return (
          <div key={file.name} className={styles.filePreviewContainer}>
            <div className={styles.fileNamePreview}>
              {trimmedName(file.name)}
            </div>
            <div className={styles.previewContainer}>
              <MediaComponent mediaPresenter={mediaPresenter} setMediaReady={setMediaReady} index={index}/>
            </div>
            <IconButton
              aria-label="delete"
              className={styles.deleteIconButton}
              onClick={() => {
                mediaPresenter.removeFile(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
      <AddMediaIcon mediaPresenter={mediaPresenter} />
    </div>
  );
};

export const DragModal: React.FC = () => {
  return (
    <div className={styles.dotted}>
      <img
        className={styles.characterIcon}
        src={character}
        alt="drag file here"
      />
      <div className={styles.dropModalText}>Drop Your File Here</div>
    </div>
  );
};
