import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header, Media, VideoModal, Loading } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaReady, setMediaReady] = useState<number>(0);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
  const addMedia = () => {
    setMediaReady(m => m + 1);
  }
  const removeFile: (index: number) => void = (index: number) => {
    const newMedias = [...medias];
    if (index > -1) {
      newMedias.splice(index, 1);
    }
    setMedias(newMedias);
  };
  const addFile: (newMedia: Media[]) => void = (newMedia: Media[]) => {
    let newMedias = [...medias, ...newMedia];
    setMedias(newMedias);
  };
  const addDuration: (extraDuration: number) => void = (extraDuration: number) => {
    setTotalVideoDuration(oldDur => oldDur + extraDuration);
  };
  return (
    <div className="App">
      <Header />
      <Loading mediasLength={medias.length} mediaReady={mediaReady}/>
      {show ?
        <VideoModal setShow={setShow} show={show} medias={medias} videoPlaying={videoPlaying} totalVideoDuration={totalVideoDuration}/> :
        <ImportModal
          setShow={setShow}
          medias={medias}
          setMedias={setMedias}
          removeFile={removeFile}
          addMedia={addMedia}
          addFile={addFile}
          setVideoPlaying={setVideoPlaying}
          addDuration={addDuration}
        /> 
        }
    </div>
  );
};

export default App;
