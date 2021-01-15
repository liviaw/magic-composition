import React from "react";
import { ViewMedia, DragModal } from "./ViewMedia";
import styles from "./ImportModal.module.css";
import { Button } from "react-bootstrap";


type Props = {
  setShow: (show: boolean) => void;
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  removeFile,
  addFile,
}) => {
  //TODO
  const createMediaElement = () => {

  }

  return (
    <div className={styles.canvaHomePage}>
    <div className={styles.dropModal}>
      <div
        className={styles.dropModal}
        onDragLeave={(e) => {e.preventDefault()}}
      >
        <DragModal />
      </div>
        <ViewMedia medias={[]} removeMedia={removeFile} createMediaElement={createMediaElement}/>
        <Button
          className={styles.createVideoButton}
          onClick={() => setShow(true)}
          variant="secondary"
        >
          Create Video 🎬
        </Button>
      </div>
    <span>Or</span>
    <span className={styles.desktopOnly}>
      Drag & Drop your files here 📥
    </span>
    </div>
  
  )
};
