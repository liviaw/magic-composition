import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo, Modal, isImage, isVideo} from './Components/';

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  const [medias, setMedias] = useState<JSX.Element[]>([]);

  const removeFile: (file: File) => void = (file:File ) => {
    const newFiles = [...files]
    const index = newFiles.indexOf(file);
    if (index > -1) {
      newFiles.splice(index, 1);
    }
    
    setFiles(newFiles);
    console.log(newFiles);
  }
  const addFile = () => {
    
  }
  const mediaElement: JSX.Element = (file: File) => {
    if(isImage(file)) {
        return (<img className={styles.renderMedia} src={URL.createObjectURL(files[i])}/>)
    }

    return (<></>)
}

  const checkDraggedFile = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOnDragState(false);
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setOnDropState(true);
    e.preventDefault();
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
          if(isImage(e.dataTransfer.files[i]) {

          }
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
  }

  return (
    <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}>
      <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} files={files} removeFile={removeFile}/>
    </div> 

  );
}

export default App;
