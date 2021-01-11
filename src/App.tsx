import React, { useState } from "react";
import "./App.css";
import { Import, Header, Media, CreateVideo } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaReady, setMediaReady] = useState<number>(0);

  const addMedia = () => {
    let temp = mediaReady + 1;
    console.log("called! " + temp);
    setMediaReady(temp)
  }

  const removeFile: (index: number) => void = (index: number) => {
    const newMedias = [...medias];
    if (index > -1) {
      newMedias.splice(index, 1);
    }
    setMedias(newMedias);
  };
  const addFile: (file: File) => void = (file: File) => {
    let newMedias = [...medias];
    
    setMedias(newMedias);
  };
  return (
    <div className="App">
      <Header />
      drag and drop your files here :)
      {/* {medias.length !== mediaReady?<p>
        loading... {medias.length} {mediaReady}
      </p> : null} */}
      {show ? 
        <CreateVideo setShow={setShow} show={show}/> : 
        <></>}
        {mediaReady}
      <Import
        setShow={setShow}
        medias={medias}
        setMedias={setMedias}
        removeFile={removeFile}
        addMedia={addMedia}
      />
    </div>
  );
};

export default App;
