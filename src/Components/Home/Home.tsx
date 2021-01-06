import React, { useState, useEffect } from 'react';
import {Modal} from '../Modal/Modal';

// import styles from './'

type Props = {
  files: File[];
  setFiles:React.Dispatch<React.SetStateAction<File[]>>;
};

const Home:  React.FC<Props> = ({
  files,
  setFiles,
}) => {
  const [onDragState, setOnDragState] = useState<boolean>(false);
  const [onDropState, setOnDropState] = useState<boolean>(false);
  
  // useEffect(()=> {
  //   console.log("onDropState in useffect " + onDropState)
  //   setOnDropState(true);
  // }, [onDropState])
    const checkDraggedFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOnDragState(false);
    }
    const idk = ()=> {
      setOnDropState(true);
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
            console.log("here " + file.name);
            setOnDropState(true);
            dup.push(file);
          }
          setOnDropState(true);
        }
      } else {
        console.log("second");
          // Use DataTransfer interface to access the file(s)
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            dup.push(e.dataTransfer.files[i]);
            console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          }
      }
      console.log("action");
      setOnDropState(true);
      setFiles(dup);
    }
    const dragOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      // setOnDragState(true);
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
    return (
      <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}>
        <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} files={files}/>
        <button onClick={idk}>changeStatePls</button>
      </div> 

    );
}

export default Home;