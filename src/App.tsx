import React, {useState} from 'react';
import './App.css';
// import {Player} from './Components/Import/Player';

import {Modal} from './Components/Modal/Modal'
import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import ReactPlayer, { SourceProps } from 'react-player/lazy';
import FileUploader from './Components/Modal/FileUploader';


const App: React.FC = () => {
  const [videoFilePath, setVideoPath] = useState<string | string[] | SourceProps[] | MediaStream | undefined>("");
  const [onDragState, setOnDragState] = useState<boolean>(false);
  let video1:string | string[] | SourceProps[] | MediaStream = require('./video1.mp4');
  let image1:string | string[] | SourceProps[] | MediaStream = require('./Media/image1.png');
  const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="App">
      <div className="canvaHomePage">
        <div className="canvaHomePageText">
        Canva Home Page
        </div>
        <Modal/>
      </div>
    </div>
  );
}

export default App;
