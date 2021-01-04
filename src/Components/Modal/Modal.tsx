import React, {useState} from "react";
import styles from "./FileUpload.module.css";
import character from "../../Media/character.png";
import { Button } from 'react-bootstrap';
import {isVideo, isImage} from '../utils';

import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'; 

type Props = {
  onDragState: boolean;
  onDropState: boolean;
  callBack: any;
  // files: Set<string>;
  filePath: string[];
  filesState:string[];
};

export const Modal: React.FC<Props> = ({
  onDragState,
  onDropState,
  callBack,
  filePath,
  filesState,
}) => {
  let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", "mp4", ".mov", "wmv", "flv"];    
  
  const dragLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    callBack();
    console.log("dragLeaveHandler");
  };
{/* <a href="/create"></a> */}

  const Dropbox = () => {
    const history = useHistory();

  
    if (!onDropState && onDragState) {
      return (
        <div className={styles.dropModal}>
          <div className={styles.dotted}>
            <img className={styles.characterIcon} src={character} alt="here" />
            <div className={styles.dropModalText}>Drop Your File Here</div>
          </div>
        </div>
      );
    } else if (onDropState && onDragState) {
      return (
        <div className={styles.dropModal}>
          <div className={styles.dotted}>
            {/* {files.map(f => (<span dangerouslySetInnerHTML={{__html: f}}/>))} */}
            {filesState.map((f) => {
              if (!isImage(f) && !isVideo(f)) {
                alert("Sorry, " + f + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
              }  else if (isImage(f)) {
                return(
                <div key={f+Math.random()}>
                  <img id={f+Math.random()} src={f} alt={"image not rendering " + f }/>
                  {f}
                  </div>
                )
              }
            })}
            <Button onClick={()=> history.push("/create")} variant="info">Create Video</Button>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div onDragLeave={dragLeaveHandler}>
      <Dropbox />
    </div>
  );
};
