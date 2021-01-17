import React, { useState, useEffect } from "react";
import styles from "./ImportModal.module.css";
import { trimmedName, Media, AddMediaIcon } from "..";
import character from "../../Media/character.png";
import useSound from "use-sound";
import { ImportComponent } from "./ImportComponent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// import soundUrl from '../../Audio/beep.mp3';
type Props = {
  files: File[];
  removeFile: (index: number) => void;
  addFile: (attachedFiles: File[]) => void;
  setMediaReady: (func: (numberReady: number) => number) => void;
  setOriDur: (
    func: (prevDur: {
      [fileindex: number]: number;
    }) => { [fileindex: number]: number }
  ) => void;
  oriDur: { [fileindex: number]: number };
};

export const ViewMedia: React.FC<Props> = ({
  files,
  removeFile,
  addFile,
  setMediaReady,
  setOriDur,
  oriDur,
}) => {
  console.log("files length is " + files.length);
  return (
    <div className={styles.dotted}>
      {/* filename (key) to JSX element (value) mapping */}
      {files.map((file: File, index: number) => {
        return (
          <div key={file.name} className={styles.filePreviewContainer}>
            <div className={styles.fileNamePreview}>
              {trimmedName(file.name)}
            </div>
            <div className={styles.previewContainer}>
              <ImportComponent
                file={file}
                index={index}
                setOriDur={setOriDur}
                oriDur={oriDur}
                setMediaReady={setMediaReady}
              />
            </div>
            <IconButton
              aria-label="delete"
              className={styles.deleteIconButton}
              onClick={() => {
                removeFile(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
      <AddMediaIcon addFile={addFile} />
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
