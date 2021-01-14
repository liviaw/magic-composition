import React, { useState } from "react";
import { ViewMedia, DragModal } from "./ViewMedia";
import styles from "./ImportModal.module.css";
import { Button } from "react-bootstrap";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  removeFile: (index: number) => void;
  addFile: (newMedia: File[]) => void;
};

export const ImportModal: React.FC<Props> = ({
  setShow,
  removeFile,
  addFile,
}) => {
  const createMediaElement = (files: File[]) => {

  }
  return (
    <div className={styles.canvaHomePage}>
    <div className={styles.dropModal}>
      <div
        className={styles.dropModal}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
      >
        <DragModal />
      </div>
        <ViewMedia medias={[]} removeMedia={()=>{}} createMediaElement={createMediaElement}/>
        <Button
          className={styles.createVideoButton}
          onClick={() => setShow(true)}
          variant="secondary"
        >
          Create Video 🎬
        </Button>
      </div>
    <span> Or </span>
    <span className={styles.desktopOnly}>
      Drag &amp; Drop your files here 📥
    </span>
    </div>
  
  )
};
