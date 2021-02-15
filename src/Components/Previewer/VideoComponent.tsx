import React, { useState, useRef, useEffect } from "react";
import { showError } from "../Toast/Toast";
import ReactPlayer from "react-player";
import styles from "./Previewer.module.css";
import { observer } from "mobx-react";
import { Col } from "react-bootstrap";

type MediaProps = {
  file: File;
  finishLoading: (duration: number) => void;
};

/*
* Here is the component for showing each row of image component
* it is separated from imageComponent because of the different styling
* a react player requires
*/

export const VideoComponent: React.FC<MediaProps> = observer(
  ({ file, finishLoading, }) => {
    const [fileURL, setfileURL] = useState<string | undefined>(undefined);
    const importRef: any = useRef(undefined);

    useEffect(() => {
      const newFileURL = URL.createObjectURL(file);
      setfileURL(newFileURL);
      return () => {
        if (newFileURL != null) {
          URL.revokeObjectURL(newFileURL);
        }
      };
    }, [file]);

    return (
        <Col xs={2}>
          <div className={styles.renderContainer}>
            <ReactPlayer
              ref={importRef}
              url={fileURL}
              className={styles.renderVideo}
              playing={true}
              onError={() => showError(file.name + " is unable to play")}
              volume={0}
              width="56px"
              height="56px"
              muted={true}
              onDuration={finishLoading}
            />
          </div>
        </Col>
    );
  }
);
