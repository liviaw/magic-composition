import React, { useState } from "react";
import { Loading } from '../Loading/Loading';
import { AddMediaIcon } from '../AddMediaIcon/AddMediaIcon';
import { DragModal, ImportComponents } from "./MediaPreviewer";
import styles from "./ImportModal.module.css";
import { Button, Container } from "react-bootstrap";
import type { MediaPresenter } from "../MediaPresenter";
import { observer } from 'mobx-react';

type Props = {
  setShow: (show: boolean) => void;
  mediaPresenter: MediaPresenter;
};

export const ImportModal: React.FC<Props> = observer(({
  setShow,
  mediaPresenter,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  // drop state can be deleted and check files length instead
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [mediaReady, setMediaReady] = useState<number>(0);

  // creating elemenets to be displayed for preview
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDropState(true);
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      Array.from(e.dataTransfer.items).forEach((item: any) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          let file = item.getAsFile();
          if (file == null) {
            return;
          }
          mediaPresenter.addFile(file);
        }
      })
    } else {
      // Use DataTransfer interface to access the file(s)
      Array.from(e.dataTransfer.files).forEach((file: File) => {
        mediaPresenter.addFile(file);
      })
    }
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
      <Loading mediasLength={mediaPresenter.filesLength} mediaReady={mediaReady} />
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

      {(onDropState && onDragState)  || (mediaPresenter.filesLength > 0) ? (
        <div
          className={styles.dropModal}
          onDragLeave={(e) => {
            setOnDragState(false);
            e.preventDefault();
          }}
        >
          <ImportComponents mediaPresenter={mediaPresenter} setMediaReady={setMediaReady}/>
          <Button
            className={styles.createVideoButton}
            onClick={
              () => {
                if (mediaReady !== 0 && mediaReady === mediaPresenter.filesLength) {
                  setShow(true);
                }
              }
            }
            variant="secondary"
            disabled={mediaReady === 0 || mediaReady !== mediaPresenter.filesLength }
          >
            Create Video 🎬
          </Button>
          
        </div>
      ) : (
        <>
          <AddMediaIcon mediaPresenter={mediaPresenter} />
          <span> Or </span>
          <span className={styles.desktopOnly}>
            Drag &amp; Drop your files here 📥
          </span>
        </>
      )} 
    </Container>
  );
});
