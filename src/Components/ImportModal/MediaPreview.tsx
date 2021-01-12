import React from "react";
import ReactPlayer from "react-player";
import { Button } from "react-bootstrap";
import { isImage, trimmedName, AddMediaIcon } from "..";
import styles from "./ImportModal.module.css";

type Props = {
  files: File[];
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  addMediaReady: () => void;
};

const createMediaElement: (
  file: File,
  addMediaReady: () => void
) => JSX.Element = (file: File, addMediaReady: () => void) => {
  if (isImage(file)) {
    return (
      <img
        className={styles.renderMedia}
        src={URL.createObjectURL(file)}
        onLoad={() => {
          addMediaReady();
        }}
        alt={file.name}
      />
    );
  } else {
    return (
      <ReactPlayer
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={0}
        onReady={addMediaReady}
      />
    );
  }
};

export const MediaPreview: React.FC<Props> = ({
  files,
  removeFile,
  addFile,
  addMediaReady,
}) => (
  <div className={styles.dotted}>
    {files.map((file: File, index: number) => (
      <div key={file.name} className={styles.filePreviewContainer}>
        <div className={styles.fileNamePreview}>{trimmedName(file.name)}</div>
        <div className={styles.previewContainer}>
          {/* {createMediaElement(file, addMediaReady)} */}
        </div>
        <Button
          variant="danger"
          className={styles.deleteButton}
          onClick={() => removeFile(index)}
        >
          Delete
        </Button>
      </div>
    ))}
    <AddMediaIcon addFile={addFile} />
  </div>
);
