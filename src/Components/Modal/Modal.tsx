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

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const history = useHistory();
    
    if(show) {
      return (
        <div>
          <CreateVideo files={files} show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
      )
    }

    console.log("onDropState = "+ onDropState + " onDragState = " + onDragState);
    if (!onDropState && onDragState) {
      console.log("===dragging===");
      return (
        <div className={styles.dropModal} onDragLeave={dragLeaveHandler}>
          <div className={styles.dotted}>
            <img className={styles.characterIcon} src={character} alt="here" />
            <div className={styles.dropModalText}>Drop Your File Here</div>
          </div>
        </div>
      );
    } else if (onDropState && onDragState) {
      console.log("===done dropping===");
      return (
        <div className={styles.dropModal} onDragLeave={dragLeaveHandler}>
          <div className={styles.dotted}>
            {files.map((f) => {
              if (isImage(f)) {
                return(
                  <div key={f.name+Math.random()} className={styles.filePreviewContainer}>
                    {f.name} 
                    <div className={styles.previewContainer}>
                    <img id={f.name+Math.random()} className={styles.previewMedia} src={URL.createObjectURL(f)} alt={"image not rendering " + f.name }/>
                    </div>
                    <Button variant="danger" className={styles.deleteButton} onClick={() => removeFile(f)}>Delete</Button> 
                  </div>
                )
              } else if (isVideo(f)) {
                return(
                  <div key={f.name+Math.random()} className={styles.filePreviewContainer}>
                      {f.name} 
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
            {/* <Button onClick={()=> history.push("/create")} variant="info">Create Video</Button> */}
        </div>
      );
    } 
    return <></>;
    
};
