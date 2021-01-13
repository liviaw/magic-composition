import React from "react";
import ReactPlayer from "react-player";
import { Button } from "react-bootstrap";
import { isImage, trimmedName, AddMediaIcon, imageDuration } from "..";
import styles from "./ImportModal.module.css";

type Props = {
  files: File[];
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
  addDuration:(index:number, duration: number) => void;
  addMedia: () => void;
};

export const MediaPreview: React.FC<Props> = ({
  files,
  removeFile,
  addFile,
  addDuration,
  addMedia,
}) => (
  <div className={styles.dotted}>
    {files.map((file: File, index: number) => {
      const newDuration: {[filename:string]:boolean} = {[file.name]:false};
      return (
        <div key={file.name} className={styles.filePreviewContainer}>
          <div className={styles.fileNamePreview}>{trimmedName(file.name)}</div>
          <div className={styles.previewContainer}>
            {isImage(file) ?
              <img
                className={styles.renderMedia}
                src={URL.createObjectURL(file)}
                onLoad={() => {
                  if (newDuration[file.name] === false) {
                    console.log("image loads");
                    addMedia();
                    addDuration(index, imageDuration);
                    // set duration state as true so that it will not reset it again
                    newDuration[file.name] = true;
                  }
                }}
                alt={file.name}
              /> :
              <ReactPlayer
                url={URL.createObjectURL(file)}
                width="100%"
                height="50%"
                playing={true}
                onError={() => alert(file + " is unable to play")}
                id={file.name}
                volume={0}
              />
            }
          </div>
          <Button
            variant="danger"
            className={styles.deleteButton}
            onClick={() => removeFile(index)}
          >
            Delete
          </Button>
        </div>
      )}
    )}
    <AddMediaIcon addFile={addFile} />
  </div>
);
