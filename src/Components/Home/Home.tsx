import React, { useState, useEffect } from 'react';
import {Modal} from '../Modal/Modal';

// import styles from './'

type Props = {
  files: File[];
  setFiles:React.Dispatch<React.SetStateAction<File[]>>;
  removeFile:(file: File) => void;
};

const Home:  React.FC<Props> = ({
  files,
  setFiles,
  removeFile,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);

    const checkDraggedFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOnDragState(false);
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
      setOnDropState(true);
      e.preventDefault();
      console.log("====dropHandler setOnDropState=  "+ onDropState +" ===");
      const dup = [];
  
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (e.dataTransfer.items[i].kind === 'file') {
            let file = e.dataTransfer.items[i].getAsFile();
            if (file == null) {
              return;
            }
            setOnDropState(true);
            dup.push(file);
          }
          setOnDropState(true);
        }
      } else {
          // Use DataTransfer interface to access the file(s)
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            dup.push(e.dataTransfer.files[i]);
            console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          }
      }
      setOnDropState(true);
      setFiles(dup);
    }
    const dragOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log("dragOverHandler");
    }
    const dragEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!onDragState){
        setOnDragState(true);
      }
      console.log("dragEnterHandler");
    }
    console.log("onDropState = "+onDropState + " onDragState = " + onDragState);
    console.log(files);
    // history.push("/")
    return (
      <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}>
        <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} files={files} removeFile={removeFile}/>
      </div> 

    );
}

export default Home;