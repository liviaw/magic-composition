import React, { useState } from "react";
import {
  isImage,
  isVideo,
  ErrorModal,
  showError,
  Loading,
  MediaPreview
} from "..";
import styles from "./ImportModal.module.css";
import character from "../../Media/character.png";
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  addDuration: (extraDuration: number) => void;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  files,
  setFiles,
  removeFile,
  addFile,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [mediaReady, setMediaReady] = useState<number>(0);

  const addMediaReady: () => void = () => {
    setMediaReady(media => media + 1);
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setOnDropState(true);
    e.preventDefault();
    const newFiles: File[] = [];

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          let file = e.dataTransfer.items[i].getAsFile();
          if (file == null) {
            return;
          }
          setOnDropState(true);
          if (isImage(file) || isVideo(file)) {
            newFiles.push(file);
          } else {
            showError("invalid file " + file.name);
          }
        }
        setOnDropState(true);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        let file = e.dataTransfer.files[i];
        if (isImage(file) || isVideo(file)) {
          newFiles.push(file);
        } else {
          showError("invalid file " + file.name);
        }
      }
    }
    setOnDropState(true);
    setFiles(newFiles);
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

  return (
    <div
      className={styles.canvaHomePage}
      onDragEnter={dragEnterHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <ErrorModal />
      {!onDropState && onDragState ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <div className={styles.dotted}>
            <img
              className={styles.characterIcon}
              src={character}
              alt="drag file here"
            />
            <div className={styles.dropModalText}>Drop Your File Here</div>
          </div>
        </div>
      ) : null}
      {onDropState && onDragState ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          {/* <Loading mediasLength={files.length} mediaReady={mediaReady}/> */}
          <MediaPreview files={files} removeFile={removeFile} addFile={addFile} addMediaReady={addMediaReady}/> 
          <Button
            className={styles.createVideoButton}
            onClick={() => setShow(true)}
            variant="success"
          >
            Create Video
          </Button>
        </div>
      ) : (
        <span>Drag &amp; Drop your files here :)</span>
      )}
    </div>
  );
};
