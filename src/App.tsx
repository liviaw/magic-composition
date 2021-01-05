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
  const [imagesCounter, setImagesCounter] = useState(0);
  const [duration, setDuration] = useState(10000);

  let imageFormat = new RegExp('image/*');
  let videoFormat = new RegExp('video/*');
  // medias[imageCounter].
  useEffect(()=> {
    ShowMedia();
    setInterval(changeImage, duration); 

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
        console.log(i + files[i].type);
        // 
        mediasTemp.push(<img src={URL.createObjectURL(files[i])}/>)
      }
      else if (videoFormat.test(files[i].type)) {
        console.log(i + files[i].type);
        // style={{display:"none"}} , visibilitiy doesnt work too
        mediasTemp.push(<ReactPlayer url={URL.createObjectURL(files[i])} width="100%" height="50%" playing={true} onEnded={changeImage}/>)
      }
    }
    setMedias(mediasTemp);
    return mediasTemp;
  }
  const idk = async () => {
    let file = medias[0];
    // {medias.forEach((file)=>{
      if (imageFormat.test(file.type)) {
        await setTimeout(function(){}, 1000); 
        let temp = medias;
        temp.splice(0,1);
        setMedias(temp);
        console.log(temp);

      }
    // })}
  }

  const changeImage = () => {
    let temp = medias[imagesCounter];
    // temp.style.display = "block";
    // temp.className = styles.show;
    setImagesCounter(imagesCounter + 1);
    // visibility=hidden;
  }

  
  return (
    <div className="App">
      <form>
        <input type="file" multiple onChange={handleVideoUpload}/>
        <input type="submit" value="Submit"></input>
      </form>
      {/* {ShowMedia()} */}
      {/* {idk()} */}
      {medias[imagesCounter]}
      
      {/* {medias.map(setInterval((f) => f), 1000)
      })} */}


      
      
      
      {/* <ReactPlayer url={videoFilePath} width="100%" height="50%" controls={true} playing/> */}

      {/* <Player/> */}


    </div>
  );
}

export default App;
