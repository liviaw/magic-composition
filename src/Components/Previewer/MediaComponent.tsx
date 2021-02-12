import React, { useState, useRef } from "react";
import { showError } from "../ErrorToast/ErrorToast";
import ReactPlayer from "react-player";
import styles from "./Previewer.module.css";
import { MediaPresenter } from "../../MediaPresenter";
import { observer } from 'mobx-react';

type MediaProps = {
  file: File;
  index: number;
};
export const MediaComponent: React.FC<MediaProps> = observer(({
  file,
  index,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const importRef: any = useRef(undefined);
  if (MediaPresenter.isImage(file)) {
    return (
      <img
        className={styles.renderMedia}
        src={URL.createObjectURL(file)}
        onLoad={() => {
          if (!loaded) {
            setLoaded(true);
          }
        }}
        alt={file.name}
        key={index + file.name}
      />
    );
  } else {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
          importRef.current = newRef;
        }}
        className={styles.renderMedia}
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => showError(file.name + " is unable to play")}
        volume={0}
        muted={true}
        onDuration={(duration) => {
          //   // set duration state as true so that it will not reset it again
          if (!loaded) {
            setLoaded(true);
            // setMediaReady((m: number) => m + 1);
            // mediaPresenter.setDuration(index, duration);
          }
        }}
        key={index + file.name}
      />
    );
  }
});
