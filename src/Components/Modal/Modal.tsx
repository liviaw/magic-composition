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
  files: File[];
};

export const Modal: React.FC<Props> = ({
  onDragState,
  onDropState,
  callBack,
  files,
}) => {

  const dragLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    callBack();
    console.log("dragLeaveHandler");
  };
{/* <a href="/create"></a> */}

  const Dropbox = () => {
    const history = useHistory();

    console.log("onDropState = "+onDropState + " onDragState = " + onDragState);
    if (!onDropState && onDragState) {
      console.log("===dragging===");
      return (
        <div className={styles.dropModal}>
          <div className={styles.dotted}>
            <img className={styles.characterIcon} src={character} alt="here" />
            <div className={styles.dropModalText}>Drop Your File Here</div>
          </div>
        </div>
      );
    } else if (onDropState && onDragState) {
      console.log("===done dropping===");
      return (
        <div className={styles.dropModal}>
          <div className={styles.dotted}>
            {/* {files.map(f => (<span dangerouslySetInnerHTML={{__html: f}}/>))} */}
            {files.map((f) => {
              if (!isImage(f) && !isVideo(f)) {
              }  else if (isImage(f)) {
                return(
                <div key={f.name+Math.random()}>
                  <img id={f.name+Math.random()} src={URL.createObjectURL(f)} alt={"image not rendering " + f.name }/>
                  {f.name}
                  </div>
                )
              }
            })}
            <Button onClick={()=> history.push("/create")} variant="info">Create Video</Button>
          </div>
        </div>
      );
    } else {
      console.log("last");
      return <></>;
    }
  };
  
  return (
    <div onDragLeave={dragLeaveHandler}>
      <Dropbox />
    </div>
  );
};
