import React, { useState } from "react";
import "./App.css";
import { Import, Header, Media } from "./Components/";
import ReactPlayer from "react-player";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [medias, setMedias] = useState<Media[]>([]);

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
      {/* {show ? <CreateVideo/> : <></>} */}
      <Import
        setShow={setShow}
        medias={medias}
        setMedias={setMedias}
        removeFile={removeFile}
      />
    </div>
  );
};

export default App;
