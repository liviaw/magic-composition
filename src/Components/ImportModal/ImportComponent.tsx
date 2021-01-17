import React, { useState, useRef } from "react";
import { isImage, showError } from "..";
import ReactPlayer from "react-player";
import styles from "./ImportModal.module.css";

type MediaProps = {
  file: File;
  index: number;
  setOriDur: React.Dispatch<
    React.SetStateAction<{ [fileindex: number]: number }>
  >;
  setMediaReady: (func: (numberReady: number) => number) => void;
  oriDur: { [fileindex: number]: number };
};
export const ImportComponent: React.FC<MediaProps> = ({
  file,
  index,
  setOriDur,
  oriDur,
  setMediaReady,
}) => {
  console.log("outside import component");
  // { [filename: string]: boolean }
  const [loaded, setLoaded] = useState<boolean>(false);
  const importRef: any = useRef(undefined);
  if (isImage(file)) {
    return (
      <img
        className={styles.renderMedia}
        src={URL.createObjectURL(file)}
        onLoad={() => {
          if (!loaded) {
            setMediaReady((m: number) => m + 1);
            setLoaded(true);
          }
        }}
        alt={file.name}
      />
    );
  } else {
    console.log("import VIDEO component");
    return (
      <ReactPlayer
        ref={(newRef: any) => {
          importRef.current = newRef;
        }}
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => showError(file.name + " is unable to play")}
        id={file.name}
        volume={0}
        // onPlay={() => {
        //   if (importRef != null && importRef.current != null) {
        //     console.log(file.name + " "+importRef.current.getDuration());
        //     console.log("import ref");
        //     setOriDur((prevState) => ({
        //         ...prevState,
        //         [index]: importRef.current.getDuration(),
        //       }));
        //   }
        // }}
        // loop={true}
        onDuration={(duration) => {
          //   // set duration state as true so that it will not reset it again
          if (!loaded) {
            setLoaded(true);
            console.log(oriDur);
            setMediaReady((m: number) => m + 1);
            setOriDur((prevState) => (
              {
              ...prevState,
              [index]: duration,
              }
            )
            );
          }
        }}
      />
    );
  }
};
