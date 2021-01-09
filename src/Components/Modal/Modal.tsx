import React, {useState} from "react";
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'; 
import character from "../../Media/character.png";
import {isVideo, isImage} from '../utils';
import {CreateVideo} from '..';
import ReactPlayer, { SourceProps } from 'react-player';

import styles from "./Modal.module.css";

type Props = {
  onDragState: boolean;
  onDropState: boolean;
  callBack: any;
  files: File[];
  removeFile:(file: File) => void;
};

export const Modal: React.FC<Props> = ({
  onDragState,
  onDropState,
  callBack,
  files,
  removeFile,
}) => {

  const dragLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    callBack();
    console.log("dragLeaveHandler");
  };
  const MAXLEN = 30;
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);    

  const trimmedName = (filename: string) => {
    if (filename.length >= MAXLEN) {
      let splittedNames = filename.split(".");
      return filename.substr(0,MAXLEN/2) + "..." + splittedNames[splittedNames.length - 1];
    }
    return filename;
  }
    
  if(show) {
    return (
      <div>
        <CreateVideo files={files} show={show} handleClose={handleClose} handleShow={handleShow}/>
      </div>
    )
  }

  if (!onDropState && onDragState) {
    return (
      <div className={styles.dropModal} onDragLeave={dragLeaveHandler}>
        <div className={styles.dotted}>
          <img className={styles.characterIcon} src={character} alt="here" />
          <div className={styles.dropModalText}>Drop Your File Here</div>
        </div>
      </div>
    );
  } else if (onDropState && onDragState) {
    return (
      <div className={styles.dropModal} onDragLeave={dragLeaveHandler}>
        <div className={styles.dotted}>
          {files.map((f) => {
            if (isImage(f)) {
              return(
                <div key={f.name+Math.random()} className={styles.filePreviewContainer}>
                  <div className={styles.fileNamePreview }>
                      {trimmedName(f.name)} 
                  </div>
                  <div className={styles.previewContainer}>
                      <img id={f.name+Math.random()} className={styles.previewMedia} src={URL.createObjectURL(f)} alt={"image not rendering " + f.name }/>
                  </div>
                  <Button variant="danger" className={styles.deleteButton} onClick={() => removeFile(f)}>Delete</Button> 
                </div>
              )
            } else if (isVideo(f)) {
              return(
                <div key={f.name+Math.random()} className={styles.filePreviewContainer}>
                    <div className={styles.fileNamePreview }>
                      {f.name} 
                    </div>
                    <div className={styles.previewContainer}>
                      <ReactPlayer className={styles.previewMedia} url={URL.createObjectURL(f)} width="100%" height="50%" alt={"file not rendering"+ f.name}/>
                    </div>
                    <Button variant="danger" className={styles.deleteButton} onClick={() => removeFile(f)}>Delete</Button> 
                  </div>
              )
            } else {
              alert("invalid file " + f.name);
            }
          })}
          <Button className={styles.createVideoButton} onClick={()=> setShow(true)} variant="success">Create Video</Button>
        </div>
      </div>
    );
  } 
  return <></>;
};
