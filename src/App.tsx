import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { ImportModal, Header, VideoModal, Loading } from "./Components/";
import WebViewer from '@pdftron/webviewer';
import { initializeVideoViewer, renderControlsToDOM } from '@pdftron/webviewer-video';


const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
  // mapping of file index to original duration of video/images
  const [oriDur, setOriDur] = useState<{ [fileindex: number]: number }>({});
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        selectAnnotationOnCreation: true,
      },
      viewer.current,
    ).then(async instance => {
      // Extends WebViewer to allow loading HTML5 videos (.mp4, ogg, webm).
      const {
          loadVideo,
      } = await initializeVideoViewer(
          instance,
          '---- Insert commercial license key here after purchase ----',
      );

      // Load a video at a specific url. Can be a local or public link
      // If local it needs to be relative to lib/ui/index.html.
      // Or at the root. (eg '/video.mp4')
      const videoUrl = 'https://pdftron.s3.amazonaws.com/downloads/pl/video/video.mp4';
      loadVideo(videoUrl);

      instance.docViewer.on('documentLoaded', () => {
        const customContainer =
            instance.iframeWindow.document.querySelector('.custom-container');

        // Inject the video Controls into WebViewer
        renderControlsToDOM(instance, customContainer);
      });
    });
  }, []);
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
      <div className="webviewer" ref={viewer} />
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
