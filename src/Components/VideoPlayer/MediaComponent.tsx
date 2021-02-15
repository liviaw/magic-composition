import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { MediaPresenter } from "../../MediaPresenter";
import styles from "./VideoPlayer.module.css";
import ReactPlayer from "react-player";
import { showError } from "../Toast/Toast";

/*
 * Components under videoPlayer to preview videos in a timely manner
 */

type Props = {
  play: boolean;
  file: File;
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

  if (MediaPresenter.isImage(file)) {
    return (
      <img
        className={play ? styles.imageClear : styles.imageBlur}
        src={fileURL}
        alt={file.name}
      />
    );
  } else {
    return (
      <ReactPlayer
        className={play ? styles.videoClear : styles.videoBlur}
        ref={mediaRef}
        volume={0.2}
        url={fileURL}
        playing={play}
        loop={true}
        width="600px"
        height="400px"
        onError={() => {
          showError(file.name + ": media unable to play");
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
