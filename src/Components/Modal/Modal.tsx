import React from "react";
import { Button } from 'react-bootstrap';
import character from "../../Media/character.png";
import {trimmedName} from '../utils';

import styles from "./Modal.module.css";

interface Media {
  [filename: string]: {
    type: string;
    element: JSX.Element;
    // time: number;
  }
}

type Props = {
  onDragState: boolean;
  onDropState: boolean;
  callBack: any;
  medias: Media;
  removeFile:(file: string) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({
  onDragState,
  onDropState,
  callBack,
  medias,
  removeFile,
  setShow,
}) => {

  const dragLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    callBack();
    console.log("dragLeaveHandler");
  };
  const MAXLEN = 30;
    
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
        {/* filename (key) to JSX element (value) mapping */}
          {Object.keys(medias).map((filename:string) => (
            <div key={filename} className={styles.filePreviewContainer}> 
              <div className={styles.fileNamePreview }>
                {trimmedName(filename, MAXLEN)} 
              </div>
              <div className={styles.previewContainer}>
                {medias[filename]["element"]} 
              </div>
              <Button variant="danger" className={styles.deleteButton} onClick={() => removeFile(filename)}>Delete</Button> 
            </div> 
          ))} 
          <Button className={styles.createVideoButton} onClick={()=> setShow(true)} variant="success">Create Video</Button>
        </div>
      </div>
    )
  }
  return <></>;
};
