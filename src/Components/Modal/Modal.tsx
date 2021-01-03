import React from "react";
import styles from "./FileUpload.module.css";
import character from "../../Media/character.png";
import { Link } from "react-router-dom";

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
              <div>{f}</div>
            ))}
          </div>
          <button>
            <Link to="/createVideo">Create Video</Link>
          </button>
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
