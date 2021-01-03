import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';


import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import ReactPlayer, { SourceProps } from 'react-player/lazy';
import FileUploader from './Components/Modal/FileUploader';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

const App: React.FC = () => {


  // const [videoFilePath, setVideoPath] = useState<string | string[] | SourceProps[] | MediaStream | undefined>("");
  // const [filePath, setFilePath] = useState< string[] >([]);
  // const [onDragState, setOnDragState] = useState<boolean>(false);
  // const [onDropState, setOnDropState] = useState<boolean>(false);
  // useEffect(() => {
  //   checkDraggedFile();
  // })
  // const checkDraggedFile = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setOnDragState(false);
  // }
  // const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
  //   setOnDropState(true);
  //   e.preventDefault();
  //   console.log("dropHandler");
  //   const empty= filePath;

  //   if (e.dataTransfer.items) {
  //     // Use DataTransferItemList interface to access the file(s)
  //     for (let i = 0; i < e.dataTransfer.items.length; i++) {
  //       // If dropped items aren't files, reject them
  //       if (e.dataTransfer.items[i].kind === 'file') {
  //         let file = e.dataTransfer.items[i].getAsFile();
  //         if (file == null) {
  //           return;
  //         }
  //           console.log("here" + file.name);
  //               empty.push(file.name);
  //               console.log('... file[' + i + '].name = ' + file.name);
  //           }
  //       }
  //   } else {
  //     console.log("second");
  //       // Use DataTransfer interface to access the file(s)
  //       for (let i = 0; i < e.dataTransfer.files.length; i++) {
  //         empty.push(e.dataTransfer.files[i].name);
  //         console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
  //       }
  //   }
  //   setFilePath(empty);
  // }
  // const dragOverHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //   // setOnDragState(true);
  //   e.preventDefault();
  //   console.log("dragOverHandler");
  // }
  // const dragEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   if (!onDragState){
  //     setOnDragState(true);
  //   }
  //   console.log("dragEnterHandler");
  // }
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
        <Router>
      <Switch>
       <Route exact path="/">
            <Home />
          </Route>
      <Route path="/create">
      <CreateVideo/>
      </Route>
      {/* <Route component={NoMatch}/> */}
      </Switch>
  </Router>
      {/* <div className="canvaHomePage" onDragEnter={dragEnterHandler} onDrop={dropHandler} onDragOver={dragOverHandler}> */}
        {/* <Dropbox/> */}
        {/* <Modal onDragState={onDragState} onDropState={onDropState} callBack={checkDraggedFile} files={filePath}/> */}
      {/* </div>  */}
      {/* <form> */}
  {/* <input type="file" onChange={handleVideoUpload}/> */}
  {/* <input type="submit" value="Submit"></input> */}
{/* </form>  */}
    
      {/* <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/> */}
    </div>
  );
}

export default App;
