import React, { useState } from "react";
import {
  isImage,
  showError,
} from "..";
import ReactPlayer from "react-player";
import styles from "./ImportModal.module.css";

type MediaProps = {
  setMediaReady: (func: (numberReady: number) => number) => void;
  // setShow: (show: boolean) => void;
  file: File;
  index: number;
  setOriDur: React.Dispatch<
    React.SetStateAction<{ [fileindex: number]: number }>
  >;
  oriDur:{ [fileindex: number]: number };
};
export const ImportComponent: React.FC<MediaProps> = ({
  setMediaReady,
  file,
  index,
  setOriDur,
  oriDur,
}) => {
  console.log("outside import component");
  // { [filename: string]: boolean }
  const [loaded, setLoaded] = useState<boolean>(false);
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
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => showError(file.name + " is unable to play")}
        id={file.name}
        volume={0}
        loop={true}
        // onDuration={(duration) => {
        // //   // set duration state as true so that it will not reset it again
        // //   // if (!loaded) {
        // //     setLoaded(true);
        // console.log(oriDur);
				// 		// setMediaReady((m: number) => m + 1);
        //     setOriDur((prevState) => ({
        //       ...prevState,
        //       [index]: duration,
        //     }));
        //   }
        // }
      />
    );
  }
};

