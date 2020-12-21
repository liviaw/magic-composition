import React, {useState} from 'react';
import './App.css';
// import {Player} from './Components/Import/Player';


import ReactPlayer, { SourceProps } from 'react-player';


const App: React.FC = () => {
  const [videoFilePath, setVideoPath] = useState<string | string[] | SourceProps[] | MediaStream | undefined>("");
  const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setVideoPath(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="App">
      quiz!
      <form action="/action_page.php">
        <input type="file" onChange={handleVideoUpload}/>
        <input type="submit" value="Submit"></input>
      </form>
      <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/>
      {/* <Player/> */}
    </div>
  );
}

export default App;
