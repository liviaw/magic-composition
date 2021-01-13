import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header, VideoModal } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  // mapping of file index to original duration of video/images
  const [oriDur, setOriDur] = useState<{ [fileindex: number]: number }>({});

  const removeFile = (index: number): void => {
    const newFiles = [...files];
    if (index > -1) {
      newFiles.splice(index, 1);
    }
    setFiles(newFiles);
  };
  const addFile = (newFiles: File[]): void => {
    let newMedias = [...files, ...newFiles];
    setFiles(newMedias);
  };
  // duration in seconds
  const addDuration = (index: number, duration: number): void => {
    let newDur = { index: duration };
    setOriDur({ ...oriDur, ...newDur });
  };
  return (
    <div className="App">
      <Header />
      <ImportModal
        setShow={setShow}
        files={files}
        setFiles={setFiles}
        removeFile={removeFile}
        addFile={addFile}
        addDuration={addDuration}
      />
      <VideoModal setShow={setShow} show={show} files={files} /> : null
    </div>
  );
};

export default App;
