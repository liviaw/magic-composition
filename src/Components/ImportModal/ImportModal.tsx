import React, { useState } from "react";
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
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  setTotalVideoDuration: React.Dispatch<React.SetStateAction<number>>;
  setOriDur: React.Dispatch<
    React.SetStateAction<{ [fileindex: number]: number }>
  >;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  removeFile,
  addFile,
  setTotalVideoDuration,
  setOriDur,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [mediaReady, setMediaReady] = useState<number>(0);
  const [medias, setMedias] = useState<Media[]>([]);
  const removeMedia = (index: number): void => {
    const newMedias = [...medias];
    removeFile(index);
    if (index > -1) {
      newMedias.splice(index, 1);
    }
    setMedias(newMedias);
  };
  const addMedia = (newMedia: Media[]): void => {
    let newMedias = [...medias, ...newMedia];
    setMedias(newMedias);
  };

  const addMediaReady = () => {
    setMediaReady((m) => m + 1);
  };
  // creating elemenets to be displayed for preview
  const createMediaElement: (attachedFiles: File[]) => void = (
    attachedFiles
  ) => {
    // set drag and drop as true, even if user input using icon
    if (attachedFiles !== []) {
      setOnDragState(true);
      setOnDropState(true);
    }
    const newMedias: Media[] = [];
    attachedFiles.forEach((file, index) => {
      if (isImage(file)) {
        const newDuration: { [filename: string]: boolean } = {
          [file.name]: false,
        };
        let el: JSX.Element = (
          <img
            className={styles.renderMedia}
            src={URL.createObjectURL(file)}
            onLoad={() => {
              if (newDuration[file.name] === false) {
                addMediaReady();
                // set duration state as true so that it will not reset it again
                newDuration[file.name] = true;
                setTotalVideoDuration((d) => d + imageDuration);
                let tempDur: { [fileindex: number]: number } = {};
                tempDur[index] = imageDuration;
                setOriDur((prevState) => ({
                  ...prevState,
                  ...tempDur,
                }));
              }
            }}
            alt={file.name}
          />
        );
        let newMedia = new Media(file.name, "image", el);
        newMedias.push(newMedia);
      } else if (isVideo(file)) {
        const newDuration: { [filename: string]: boolean } = {
          [file.name]: false,
        };
        let el: JSX.Element = (
          <ReactPlayer
            url={URL.createObjectURL(file)}
            width="100%"
            height="50%"
            playing={true}
            onError={() => alert(file.name + " is unable to play")}
            id={file.name}
            volume={0}
            loop={true}
            onDuration={(duration) => {
              if (newDuration[file.name] === false) {
                // set duration state as true so that it will not reset it again
                newDuration[file.name] = true;
                setTotalVideoDuration((d) => d + duration * 1000);
                let tempDur: { [fileindex: number]: number } = {};
                tempDur[index] = imageDuration;
                addMediaReady();
                setOriDur((prevState) => ({
                  ...prevState,
                  ...tempDur,
                }));
                // set durationState as true
                newDuration[file.name] = true;
              }
            }}
          />
        );
        let newMedia = new Media(file.name, "video", el);
        newMedias.push(newMedia);
      }
    });
    addFile(attachedFiles);
    addMedia(newMedias);
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setOnDropState(true);
    e.preventDefault();
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
          setOnDropState(true);
          if (isImage(file) || isVideo(file)) {
            attachedFiles.push(file);
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
        attachedFiles.push(file);
        if (isImage(file) || isVideo(file)) {
          attachedFiles.push(file);
        } else {
          showError("invalid file " + file.name);
        }
      }
    }

    createMediaElement(attachedFiles);
    setOnDropState(true);
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
      <Loading mediasLength={medias.length} mediaReady={mediaReady} />
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
      {onDropState && onDragState ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <ViewMedia
            medias={medias}
            removeMedia={removeMedia}
            createMediaElement={createMediaElement}
          />
          <Button
            className={styles.createVideoButton}
            onClick={() => setShow(true)}
            variant="success"
          >
            Create Video 🎬
          </Button>
        </div>
      ) : (
        <>
          <AddMediaIcon createMediaElement={createMediaElement} />
          <span> Or </span>
          <span className={styles.desktopOnly}>
            Drag &amp; Drop your files here 📥
          </span>
        </>
      )}
    </div>
  );
};
