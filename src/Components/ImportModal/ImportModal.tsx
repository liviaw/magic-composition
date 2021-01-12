import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  isImage,
  isVideo,
  ErrorModal,
  showError,
  trimmedName,
  Media,
  AddMediaIcon,
  imageDuration,
} from "..";
import styles from "./ImportModal.module.css";
import character from "../../Media/character.png";
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  medias: Media[];
  setMedias: React.Dispatch<React.SetStateAction<Media[]>>;
  removeFile: (index: number) => void;
  addMedia: () => void;
  addFile: (newMedia: Media[]) => void;
  setVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  addDuration: (extraDuration: number) => void;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  medias,
  setMedias,
  removeFile,
  addMedia,
  addFile,
  setVideoPlaying,
  addDuration,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [durationLoaded, setDurationLoaded] = useState<{[filename: string]:boolean}>({});
  const [videoNum, setVideoNum] = useState<number>(0);

  const mediaReadyHandler: (index:number) => void = (index:number) => {
    addMedia();
  }
  const createMediaElement: (addFiles: Media[], file: File) => void = (
    addFiles,
    file: File
  ) => {
    if (isImage(file)) {
      let el: JSX.Element = (
        <img
          className={styles.renderMedia}
          src={URL.createObjectURL(file)}
          onLoad={() => {
            addMedia();
            addDuration(imageDuration);
          }}
          alt={file.name}
        />
      );
      let newMedia = new Media(file.name, "image", el);
      addFiles.push(newMedia);
    } else if (isVideo(file)) {
      setDurationLoaded({...durationLoaded, [file.name]:false});
      let el: JSX.Element = (
        <ReactPlayer
          url={URL.createObjectURL(file)}
          width="100%"
          height="50%"
          playing={true}
          onError={() => alert(file + " is unable to play")}
          id={file.name}
          volume={0}
          onReady={addMedia}
          onStart={() => setVideoPlaying(true)}
          onEnded={() => setVideoPlaying(false)}
          onDuration={(duration) => {
            console.log("duration is " + duration);
            if (durationLoaded[file.name] === false) {
              addDuration(duration * 1000);
              // set durationState as true
              let newDurationState = {...durationLoaded};
              newDurationState[file.name] = true;
              setDurationLoaded(newDurationState);
            }
          }}
        />
      );
      let newMedia = new Media(file.name, "video", el);
      addFiles.push(newMedia);
      // increment media number for the next file index
      setVideoNum(m => m + 1);
    } else {
      showError("invalid file " + file.name);
    }
  };
  const MAXLEN = 10;

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setOnDropState(true);
    e.preventDefault();
    const dup: Media[] = [];

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
          createMediaElement(dup, file);
        }
        setOnDropState(true);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        createMediaElement(dup, e.dataTransfer.files[i]);
      }
    }
    setOnDropState(true);
    setMedias(dup);
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
          <div className={styles.dotted}>
            {/* filename (key) to JSX element (value) mapping */}
            {medias.map((media: Media, index: number) => {
              return (
                <div
                  key={media.filename}
                  className={styles.filePreviewContainer}
                >
                  <div className={styles.fileNamePreview}>
                    {trimmedName(media.filename, MAXLEN)}
                  </div>
                  <div className={styles.previewContainer}>{media.element}</div>
                  <Button
                    variant="danger"
                    className={styles.deleteButton}
                    onClick={() => removeFile(index)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
            <AddMediaIcon addFile={addFile} createMediaElement={createMediaElement} />
          </div>
            <Button
              className={styles.createVideoButton}
              onClick={() => setShow(true)}
              variant="success"
            >
              Create Video
            </Button>
        </div>
      ) : <span>Drag &amp; Drop your files here :)</span>}
    </div>
  );
};

