import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Import, Header, Modal, isImage, isVideo} from './Components/';
import ReactPlayer from 'react-player';

interface Media {
  [filename: string]: {
    type: string;
    element: JSX.Element;
    // time: number;
  }
}

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);  
  const [medias, setMedias] = useState<Media>({});
  

  const removeFile: (filename: string) => void = (filename:string ) => {
    let newMedias = {...medias};
    delete newMedias[filename];
    setMedias(newMedias);
  }
  const addFile: (file: File) => void = (file: File) => {
    let newMedias = {...medias};
    if(isImage(file)) {
      let el: JSX.Element = <img 
        src={URL.createObjectURL(file)}
      />;
      newMedias[file.name] = {
        type: "image",
        element:el,
      }

    } else if (isVideo(file)) {
      let el: JSX.Element = ( 
        <ReactPlayer           
          url={URL.createObjectURL(file)} 
          width="100%" height="50%" 
          playing={true} 
          onError={()=> alert(file + " is unable to play")}
          id={file.name}
        />)
        newMedias[file.name] = {
        type: "video",
        element:el,
      }
    } else {
      alert("invalid file " + file.name);
    }
    setMedias(newMedias);
  }
  return (
    <div className="App">
      {/* <Header/> */}
      <div className="canvaHomePage">

        {/* {show ? <CreateVideo/> : <></>} */}
      <Import 
        setShow={setShow} 
        medias={medias} 
        setMedias={setMedias}
        removeFile={removeFile}  
      />
      </div>
    </div>
  );
}

export default App;
