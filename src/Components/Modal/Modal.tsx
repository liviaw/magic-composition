import React, {useState} from "react";
import styles from "./FileUpload.module.css";
import character from "../../Media/character.png";
import { Button } from 'react-bootstrap';

type Props = {
  onDragState: boolean;
  onDropState: boolean;
  callBack: any;
  files: string[];
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
            {files.map((f) => (
              <div key={f}>{f}</div>
            ))}
            <Button variant="info"><a href="/create">Create Video</a></Button>
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
