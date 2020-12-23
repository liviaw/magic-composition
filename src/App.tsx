import React, {useState} from 'react';
import './App.css';
// import {Player} from './Components/Import/Player';


import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import ReactPlayer, { SourceProps } from 'react-player/lazy';
import FileUploader from './Components/Modal/FileUploader';


const App: React.FC = () => {
  const [videoFilePath, setVideoPath] = useState<string | string[] | SourceProps[] | MediaStream | undefined>("");
  let video1:string | string[] | SourceProps[] | MediaStream = require('./video1.mp4');
  let image1:string | string[] | SourceProps[] | MediaStream = require('./Media/image1.png');
  const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="App">
      {/* <form action="/action_page.php">
        <input type="file" onChange={handleVideoUpload}/>
        <input type="submit" value="Submit"></input>
      </form> */}
      
      {/* <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/> */}
      {/* <Player/> */}
      {/* <video width="320" height="240" controls>
        <source src="video1.MP4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video> */}
      <FileUploader/>
      {/* <ReactPlayer playing 
          url='https://www.youtube.com/watch?v=xzvd9oN5Ngw'
                height='500px'
                width='800px'
                controls={true}
            /> */}
      {/* <img alt="huh" src={sampimage1}/> */}
      {/* <ReactPlayer url="./video1.mp4" width="100%" height="50%" controls={true} playing onError={() => console.log("dsg")}/> */}
    </div>
  );
}

export default App;
