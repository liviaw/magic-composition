import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import styles from "./ImportModal.module.css";
import { MediaPresenter } from "../MediaPresenter";

type MediaProps = {
  mediaPresenter: MediaPresenter;
  setMediaReady: (func: (numberReady: number) => number) => void;
  index: number;
};
export const MediaComponent: React.FC<MediaProps> = ({
  mediaPresenter,
  setMediaReady,
  index,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const importRef: any = useRef(undefined);
  if (MediaPresenter.isImage(mediaPresenter.getFile(index))) {
    return (
      <img
        className={styles.renderMedia}
        src={URL.createObjectURL(mediaPresenter.getFile(index))}
        onLoad={() => {
          if (!loaded) {
            setMediaReady((m: number) => m + 1);
            setLoaded(true);
          }
        }}
        alt={mediaPresenter.getFileName(index)}
      />
    );
  } else {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
          importRef.current = newRef;
        }}
        url={URL.createObjectURL(mediaPresenter.getFile(index))}
        width="100%"
        height="50%"
        playing={true}
        id={mediaPresenter.getFileName(index)}
        volume={0}
        muted={true}
        onDuration={(duration) => {
          //   // set duration state as true so that it will not reset it again
          if (!loaded) {
            setLoaded(true);
            setMediaReady((m: number) => m + 1);
            mediaPresenter.setDuration(index, duration);
          }
        }}
      />
    );
  }
};
