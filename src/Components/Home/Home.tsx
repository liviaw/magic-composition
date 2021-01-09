import React, { useState, useEffect } from 'react';
import {Modal} from '../Modal/Modal';

const Home:  React.FC = ({}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);

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
  }

  return (
    <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}>
      <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} files={files} removeFile={removeFile}/>
    </div> 

  );
}

export default Home;