import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header, Media, VideoModal, Loading } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
    // mapping of file index to original duration of video/images
    const [oriDur, setOriDur] = useState<{[fileindex: number]: number}>({});

    const removeFile = (index: number): void => {
      const newFiles = [...files];
      if (index > -1) {
        newFiles.splice(index, 1);
      }
      setFiles(newFiles);
    };
    const addFile = (addedFiles: File[]): void => {
      let newFiles:File[] = [...files, ...addedFiles];
      setFiles(newFiles);
    };
    // duration in seconds
    const addDuration = (index:number, duration: number):void => {
      let newDur = {index: duration};
      setOriDur({...oriDur, ...newDur});
    }

  return (
    <div className="App">
      <Header />
      
      <ImportModal
        setShow={setShow}
        files={files}
        removeFile={removeFile}
        addFile={addFile}
        setVideoPlaying={setVideoPlaying}
        addDuration={addDuration}
      /> 
      {/* {show ?
        <VideoModal setShow={setShow} show={show} medias={medias} videoPlaying={videoPlaying} totalVideoDuration={totalVideoDuration}/> : null
        } */}
    </div>
  );
};

export default App;
