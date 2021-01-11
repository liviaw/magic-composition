import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  isImage,
  isVideo,
  ErrorModal,
  showError,
  trimmedName,
  Media,
} from "..";
import styles from "./Import.module.css";
import character from "../../Media/character.png";
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  medias: Media[];
  setMedias: React.Dispatch<React.SetStateAction<Media[]>>;
  removeFile: (index: number) => void;
  addMedia:() => void;
  mediaReady: number;
  setMediaReady: React.Dispatch<React.SetStateAction<number>>;
};

const App: React.FC<Props> = ({ 
  setShow, 
  medias, 
  setMedias, 
  removeFile, 
  mediaReady,
  setMediaReady,
  addMedia }) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
 

  const mediaElement: (addFiles: Media[], file: File) => void = (
    addFiles,
    file: File
  ) => {
    if (isImage(file)) {
      let el: JSX.Element = (
        <img className={styles.renderMedia} src={URL.createObjectURL(file)} onLoad={() => addMedia()}/>
      );
      let newMedia = new Media(file.name, "image", el);
      addFiles.push(newMedia);
    } else if (isVideo(file)) {
      let el: JSX.Element = (
        <ReactPlayer
          url={URL.createObjectURL(file)}
          width="100%"
          height="50%"
          playing={true}
          onError={() => alert(file + " is unable to play")}
          id={file.name}
          onReady={() => addMedia()}
          onLoad={addMedia}
        />
      );
      let newMedia = new Media(file.name, "video", el);
      addFiles.push(newMedia);
    } else {
      showError("invalid file " + file.name);
    }
  };
  const MAXLEN = 30;

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
          mediaElement(dup, file);
        }
        setOnDropState(true);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        mediaElement(dup, e.dataTransfer.files[i]);
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
      {!onDropState && onDragState ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <div className={styles.dotted}>
            <img className={styles.characterIcon} src={character} alt="here" />
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
                  key={media["filename"]}
                  className={styles.filePreviewContainer}
                >
                  <div className={styles.fileNamePreview}>
                    {trimmedName(media["filename"], MAXLEN)}
                  </div>
                  <div className={styles.previewContainer}>
                    {media["element"]}
                  </div>
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
            <Button
              className={styles.createVideoButton}
              onClick={() => setShow(true)}
              variant="success"
            >
              Create Video
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
