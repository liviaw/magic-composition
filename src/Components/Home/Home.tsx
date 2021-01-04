import React, { useState, useEffect } from 'react';
import {Modal} from '../Modal/Modal';

// import styles from './'

type Props = {
  filePath: string[];
  setFilePath: React.Dispatch<React.SetStateAction<string[]>>;
};

const Home:  React.FC<Props> = ({
  filePath,
  setFilePath,
}) => {
    const [onDragState, setOnDragState] = useState<boolean>(false);
    const [onDropState, setOnDropState] = useState<boolean>(false);
    const [filesState, setFilesState] = useState<string[]>([]);

    const checkDraggedFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOnDragState(false);
      }
      const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setOnDropState(true);
        e.preventDefault();
        console.log("dropHandler");
        const dup = filePath;
        const empty = filesState;
    
        if (e.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (let i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
              let file = e.dataTransfer.items[i].getAsFile();
              if (file == null) {
                return;
              }
              empty.push(URL.createObjectURL(file.name));
              
              dup.push(file.name);
            }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              dup.push(e.dataTransfer.files[i].name);
            }
        }
        // console.log(dup.join(","));
        // console.log("from home");
        setFilePath(dup);
        setFilesState(empty);
        // setVideoPath(URL.createObjectURL(event.target.files[0]));
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
      // const handleFileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
      //   if (event.target.files === null) return;
      //   const empty= [];
      //   for (let i = 0; i < event.target.files.length; i++) {
      //       empty.push(URL.createObjectURL(event.target.files[i]));
      //   }
      //   setFilePath(empty);
    
          
      // }
      // const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
      //   if (event.target.files === null) return;
      //   setVideoPath(URL.createObjectURL(event.target.files[0]));
      // };
      return (
        <div className="App">
          <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}>
            <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} filePath={filePath} filesState={filesState}/>
          </div> 
        </div>
      );
}

export default Home;