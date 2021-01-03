import React, {useState} from 'react';
import styles from './FileUpload.module.css';
import FileUploaderPresentationalComponent from "./FileUploaderPresentationalComponent";
import character from '../../Media/character.png';

type Props = {
    onDragState: boolean;
    onDropState: boolean;
    callBack: any;
    files:string[];
  };

export const Modal: React.FC<Props> = ({
        onDragState,
        onDropState,
        callBack,
        files
    }) => {
    const [dragging, setdragging] = useState<boolean>(false);
    const [file, setFile] = useState<null|File>(null);
    const [dragEventCounter, setEventCounter] = useState<number>(0);

  const dragLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    callBack();
    console.log("dragLeaveHandler");
  }

  const idk = (e: React.DragEvent<HTMLDivElement>) => {

  }
  const Dropbox = () => {
    if (!onDropState && onDragState) {
        return(
            <div className={styles.dropModal}>
                <div className={styles.dotted}>
                <img className={styles.characterIcon} src={character} alt="here"/>
                <div className={styles.dropModalText}>
                    Drop Your File Here
                </div>  
                </div>          
            </div>
        )
    } else if (onDropState && onDragState) {
        console.log("hello" + files);
        return(
            <div className={styles.dropModal}>
                <div className={styles.dotted}>
                    {/* {files.map(f => (<span dangerouslySetInnerHTML={{__html: f}}/>))} */}
                    {files.map(f => (<div>{f}</div>))}
                </div>  
                <button>Create Video</button>
            </div>          
        )
    } else {
        return (<></>);
    }
}
    return(
        <div onDragLeave={dragLeaveHandler}>
            <Dropbox/>
        </div>
    )
}