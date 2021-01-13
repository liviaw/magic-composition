import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header, VideoModal} from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const removeFile: (index: number) => void = (index: number) => {
    const newFiles = [...files];
    if (index > -1) {
      newFiles.splice(index, 1);
    }
    setFiles(newFiles);
  };
  const addFile: (newFiles: File[]) => void = (newFiles: File[]) => {
    let newMedias = [...files, ...newFiles];
    setFiles(newMedias);
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
      /> 
      <VideoModal setShow={setShow} show={show} files={files}/> : null
    </div>
  );
};

export default App;
