import React, { useState } from "react";
import "./App.css";
import { ImportModal, Header, AddMediaIcon, VideoModal, Loading } from "./Components/";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
  // mapping of file index to original duration of video/images
  const [oriDur, setOriDur] = useState<{ [fileindex: number]: number }>({});

  // oriDur = {
  //   "gribben.mp4": 5000,
  //   "cat.mp4": 7500,
  //   "puppies.jpg": 3000,
  //    "plantvideo.mp4": 8000,
  // }
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
      {show ? (
        <VideoModal
          setShow={setShow}
          show={show}
          files={files}
          oriDur={oriDur}
          totalVideoDuration={totalVideoDuration}
        />
      ) : null}
    </div>
  );
};

export default App;
