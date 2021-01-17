import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  isImage,
  isVideo,
  ErrorModal,
  showError,
  Media,
  AddMediaIcon,
  imageDuration,
  Loading,
} from "..";
import { ViewMedia, DragModal } from "./ViewMedia";
import styles from "./ImportModal.module.css";
import { Button, Container } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  files:File[];
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  setTotalVideoDuration: React.Dispatch<React.SetStateAction<number>>;
  setOriDur: React.Dispatch<
    React.SetStateAction<{ [fileindex: number]: number }>
  >;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  files,
  removeFile,
  addFile,
  setTotalVideoDuration,
  setOriDur,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [mediaReady, setMediaReady] = useState<number>(0);
 
  // creating elemenets to be displayed for preview
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDropState(true);
    const attachedFiles: File[] = [];
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          let file = e.dataTransfer.items[i].getAsFile();
          if (file == null) {
            return;
          }
          if (isImage(file) || isVideo(file)) {
            attachedFiles.push(file);
          } else {
            showError("invalid file " + file.name);
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        let file = e.dataTransfer.files[i];
        attachedFiles.push(file);
        if (isImage(file) || isVideo(file)) {
          attachedFiles.push(file);
        } else {
          showError("invalid file " + file.name);
        }
      }
    }
    addFile(attachedFiles);
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
    <Container
      fluid
      className={styles.canvaHomePage}
      onDragEnter={dragEnterHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <Loading mediasLength={files.length} mediaReady={mediaReady} />
      <ErrorModal />
      {!onDropState && onDragState && (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <DragModal />
        </div>
      )}
      {/* set drag and drop as true, even if user input using icon */}
      {(onDropState && onDragState)  || files.length !== 0 ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <ViewMedia
            files={files}
            removeFile={removeFile}
            addFile={addFile}
            setMediaReady={setMediaReady}
            setOriDur={setOriDur}
          />
          <Button
            className={styles.createVideoButton}
            onClick={() => setShow(true)}
            variant="secondary"
          >
            Create Video 🎬
          </Button>
          
        </div>
      ) : (
        <>
          <AddMediaIcon addFile={addFile} />
          <span> Or </span>
          <span className={styles.desktopOnly}>
            Drag &amp; Drop your files here 📥
          </span>
        </>
      )} 
    </Container>
  );
};
