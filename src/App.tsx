import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';

import ReactPlayer, { SourceProps } from 'react-player';
import { JsxElement } from 'typescript';

const App: React.FC = () => {
  // const [videoFilePath, setVideoPath] = useState<string[] >([]);
  const [files, setFiles] = useState<FileList>();
  const [media, setMedias] = useState<JSX.Element[]>([]);

  const newFun = async (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    // setVideoPath([ URL.createObjectURL(event.target.files[0])]);
    setFiles(event.target.files)
    console.log(event.target.files);
  }
  const handleVideoUpload = async (event:React.ChangeEvent<HTMLInputElement>) => {
    await newFun(event);
    console.log(files);
    ShowMedia();
  };
  
  // 
  const ShowMedia:() => JSX.Element | JSX.Element[]  = () => {
    const mediasTemp:JSX.Element[] = []
    if (files == null) {
      console.log("empty files");
      return <></>
    }
    let imageFormat = new RegExp('image/*');
    let videoFormat = new RegExp('video/*');
    for (let i = 0; i < files.length; i++) {
      if (imageFormat.test(files[i].type)) {
        console.log(i + files[i].type);
        mediasTemp.push(<img src={URL.createObjectURL(files[i])}/>)
      }
      else if (videoFormat.test(files[i].type)) {
        console.log(i + files[i].type);
        mediasTemp.push(<ReactPlayer url={URL.createObjectURL(files[i])} width="100%" height="50%" playing={true}/>)
      }
    }
    setMedias(mediasTemp);
    return mediasTemp;
  }

  return (
    <div className="App">
      <form>
        <input type="file" multiple onChange={handleVideoUpload}/>
        <input type="submit" value="Submit"></input>
      </form>
      {/* {ShowMedia()} */}
      {media}


      
      
      
      {/* <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/> */}

      {/* <Player/> */}


    </div>
  );
}

export default App;
