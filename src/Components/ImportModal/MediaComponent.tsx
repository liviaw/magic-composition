import React, { useState, useRef } from "react";
import { showError } from "../ErrorToast/ErrorToast";
import ReactPlayer from "react-player";
import styles from "./ImportModal.module.css";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from 'mobx-react';

type MediaProps = {
  mediaPresenter: MediaPresenter;
  setMediaReady: (func: (numberReady: number) => number) => void;
  index: number;
};
export const MediaComponent: React.FC<MediaProps> = observer(({
  mediaPresenter,
  setMediaReady,
  index,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const importRef: any = useRef(undefined);
  if (MediaPresenter.isImage(mediaPresenter.getPreviewFile(index))) {
    return (
      <img
        className={styles.renderMedia}
        src={URL.createObjectURL(mediaPresenter.getPreviewFile(index))}
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
        url={URL.createObjectURL(mediaPresenter.getPreviewFile(index))}
        width="100%"
        height="50%"
        playing={true}
        onError={() => showError(mediaPresenter.getFileName(index) + " is unable to play")}
        id={mediaPresenter.getFileName(index)}
        volume={0}
        muted={true}
        onDuration={(duration) => {
          //   // set duration state as true so that it will not reset it again
          if (!loaded) {
            console.log("media component");
            console.log(duration);
            let temp = duration;
            console.log(temp);
            setLoaded(true);
            setMediaReady((m: number) => m + 1);
            mediaPresenter.setDuration(index, duration);
          }
        }}
      />
    );
  }
});
