import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';
// import styles from './App.css';
import ReactPlayer, { SourceProps } from 'react-player';
import { JsxElement } from 'typescript';

const App: React.FC = () => {
  // const [videoFilePath, setVideoPath] = useState<string[] >([]);
  const [files, setFiles] = useState<FileList>();
  const [medias, setMedias] = useState<JSX.Element[]>([]);
  const [mediaCounter, setMediaCounter] = useState(0);
  const [duration, setDuration] = useState(2000);

  let imageFormat = new RegExp('image/*');
  let videoFormat = new RegExp('video/*');
  // medias[imageCounter].
  useEffect(()=> {
    ShowMedia();
    // setInterval(changeImage, 5000); 

  }, [files])
  const handleVideoUpload = async (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    // setVideoPath([ URL.createObjectURL(event.target.files[0])]);
    setFiles(event.target.files)
    console.log(event.target.files);
    ShowMedia();
  };

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
        mediasTemp.push(<img src={URL.createObjectURL(files[i])}/>)
      }
      else if (videoFormat.test(files[i].type)) {
        // onEnded={changeImage}
        mediasTemp.push(<ReactPlayer url={URL.createObjectURL(files[i])} width="100%" height="50%" playing={true} />)
      }
    }
    setMedias(mediasTemp);
    return mediasTemp;
  }

  const changeImage = () => {
    console.log(mediaCounter);
    if (files == null) {
      console.log("files empty");
      return;
    }
    console.log(files.length);
    if (mediaCounter >= files.length) {
      // setMediaCounter(0);
      clearInterval();
      console.log("interval cleared");
    } else {

      setMediaCounter(mediaCounter + 1);
    }
  }

  
  return (
    <div className="App">
      <form>
        <input type="file" multiple onChange={handleVideoUpload}/>
        <input type="submit" value="Submit"></input>
      </form>
      <button onClick={() => setInterval(changeImage, 5000)}>start video</button>
      <br/>
      <button onClick={() => clearInterval()}>stop interval im sad :(</button>
      {medias[mediaCounter]}
      
      {/* {medias.map(setInterval((f) => f), 1000)
      })} */}


      
      
      
      {/* <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/> */}

      {/* <Player/> */}


    </div>
  );
}

export default App;
