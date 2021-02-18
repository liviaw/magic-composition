import React, { useState, useRef, useEffect } from "react";
import { MediaPresenter } from "../../MediaPresenter";
import styles from "./VideoPlayer.module.css";
import ReactPlayer from "react-player";
// import { showError } from "../Toast/Toast";

/*
 * Components under videoPlayer to preview videos in a timely manner
 */

type Props = {
  play: boolean;
  file: File | undefined;
  playfrom: number;
};

export const MediaComponent: React.FC<Props> = ({ play, file, playfrom }) => {
  const mediaRef: any = useRef(undefined);
  const [fileURL, setfileURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    const newFileURL = URL.createObjectURL(file);
    setfileURL(newFileURL);
    return () => {
      if (newFileURL != null) {
        URL.revokeObjectURL(newFileURL);
      }
    };
  }, [file, play]);

  if (!file) {
    return null;
  }

  if (MediaPresenter.isImage(file)) {
    return (
      <div className={styles.fadeIn}>
        <img
          className={play ? styles.clear : styles.blur}
          src={fileURL}
          alt={file.name}
        />
      </div>
    );
  } else {
    return (
      <ReactPlayer
        className={play ? styles.clear : styles.blur}
        ref={mediaRef}
        volume={0.2}
        url={fileURL}
        playing={play}
        loop={true}
        width="40vw"
        height="51vh"
        onError={() => {
          // showError(file.name + ": media unable to play");
        }}
        onStart={() => {
          if (mediaRef != null && mediaRef.current != null) {
            mediaRef.current.seekTo(playfrom, "seconds");
          }
        }}
        id={file.name}
      />
    );
  }
};


{/* <ReactPlayer
className={play ? styles.clear : styles.blur}
ref={mediaRef}
volume={0.2}
url={fileURL}
playing={play}
loop={true}
width="36vw"
height="43vh"
onError={() => {
  // showError(file.name + ": media unable to play");
}}
onStart={() => {
  if (mediaRef != null && mediaRef.current != null) {
    mediaRef.current.seekTo(playfrom, "seconds");
  }
}}
id={file.name}
/> */}