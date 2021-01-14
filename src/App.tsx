import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header } from "./Components/";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
  // mapping of file index to original duration of video/images
  const [oriDur, setOriDur] = useState<{ [fileindex: number]: number }>({});

  const removeFile = (index: number): void => {
    const newFiles = [...files];
    if (index > -1) {
      newFiles.splice(index, 1);
    }
    setFiles(newFiles);
  };
  const addFile = (addedFiles: File[]): void => {
    let newFiles: File[] = [...files, ...addedFiles];
    setFiles(newFiles);
  };

  return (
    <div className="App">
      <Header />
      <ImportModal
        setShow={setShow}
        removeFile={removeFile}
        addFile={addFile}
        setTotalVideoDuration={setTotalVideoDuration}
        setOriDur={setOriDur}
      />
    </div>
  );
};

export default App;
