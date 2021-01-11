import React, { useState } from "react";
import "./App.css";
import { Import, Header, Media, CreateVideo, Loading, AddMedia } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaReady, setMediaReady] = useState<number>(0);

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
  return (
    <div className="App">
      <Header />
      drag and drop your files here :)
      <Loading mediasLength={medias.length} mediaReady={mediaReady}/>
      {show && medias.length === mediaReady &&
        (<CreateVideo setShow={setShow} show={show} medias={medias}/>) 
      }
        
      <Import
        setShow={setShow}
        medias={medias}
        setMedias={setMedias}
        removeFile={removeFile}
        addMedia={addMedia}
        addFile={addFile}
      />
    </div>
  );
};

export default App;
