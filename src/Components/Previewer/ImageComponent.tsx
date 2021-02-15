import React, { useState, useEffect } from "react";
import styles from "./Previewer.module.css";
import { observer } from "mobx-react";
import { Col } from "react-bootstrap";

type MediaProps = {
  file: File;
  finishLoading: (duration: number) => void;
};

/*
 * Here is the component for showing each row of image component
 * it is separated from videoComponent because of the different styling
 * a react player requires
 */

export const ImageComponent: React.FC<MediaProps> = observer(
  ({ file, finishLoading }) => {
    const [fileURL, setfileURL] = useState<string | undefined>(undefined);

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
      <Col xs={2} className={styles.leftAlign}>
        <img
          className={styles.renderMedia}
          src={fileURL}
          onLoad={() => {
            finishLoading(0);
          }}
          alt={file.name}
        />
      </Col>
    );
  }
);
