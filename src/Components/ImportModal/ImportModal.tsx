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
  Loading,
} from "..";
import styles from "./ImportModal.module.css";
import character from "../../Media/character.png";
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  files: File[];
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  setVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  addDuration: (index: number, duration: number) => void;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  files,
  removeFile,
  addFile,
  setVideoPlaying,
  addDuration,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [mediaReady, setMediaReady] = useState<number>(0);
  const [medias, setMedias] = useState<Media[]>([]);
  const [counter, setCounter] = useState<number>(0);
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
  const createMediaElement: (attachedFiles: File[]) => void = (
    attachedFiles
  ) => {
    const newMedias: Media[] = [];
    attachedFiles.forEach((file) => {
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
                addDuration(counter, imageDuration);
                // set duration state as true so that it will not reset it again
                newDuration[file.name] = true;
              }
            }}
            alt={file.name}
          />
        );
        let newMedia = new Media(file.name, "image", el);
        newMedias.push(newMedia);
        setCounter((c) => c + 1);
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
            onError={() => alert(file + " is unable to play")}
            id={file.name}
            volume={0}
            loop={true}
            onReady={addMediaReady}
            onStart={() => setVideoPlaying(true)}
            onEnded={() => setVideoPlaying(false)}
            onDuration={(duration) => {
              if (newDuration[file.name] === false) {
                addDuration(counter, duration * 1000);
                // set durationState as true
                newDuration[file.name] = true;
              }
            }}
          />
        );
        let newMedia = new Media(file.name, "video", el);
        newMedias.push(newMedia);
        setCounter((c) => c + 1);
      }
    });
    addFile(attachedFiles);
    addMedia(newMedias);
  };
  const MAXLEN = 10;

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
          <Loading mediasLength={medias.length} mediaReady={mediaReady} />
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
                    onClick={() => removeMedia(index)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
            <AddMediaIcon createMediaElement={createMediaElement} />
          </div>
          <Button
            className={styles.createVideoButton}
            onClick={() => setShow(true)}
            variant="success"
          >
            Create Video
          </Button>
        </div>
      ) : (
        <span>Drag &amp; Drop your files here 📥</span>
      )}
    </div>
  );
};
