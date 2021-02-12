import React, { useRef } from "react";
import { observer } from "mobx-react";
import { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import styles from "./VideoPlayer.module.css";
import ReactPlayer from "react-player";
import {showError} from "../ErrorToast/ErrorToast";

type Props = {
    play: boolean;
    file: File;
    playfrom: number;
  };

export const MediaComponent: React.FC<Props> = observer(({
    play,
    file,
    playfrom,
}) => {
    const mediaRef: any = useRef(undefined);
    if (MediaPresenter.isImage(file)) {
      return (
        <img
    className={play? styles.clear : styles.blur}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
    } else {
      return (
        <ReactPlayer
        className={play? styles.clear : styles.blur}
        ref={(newRef: any) => {
            mediaRef.current= newRef;
        }}
        volume={0.3}
        url={URL.createObjectURL(file)}
        playing={play}
        loop={true}
        onError={() => {
          showError(file.name + ": media unable to play");
        }}
        onStart={ () => {
          console.log("onstart: " + playfrom);
          if (mediaRef != null && mediaRef.current != null) {
            mediaRef.current.seekTo(playfrom, "seconds");
          }
        }}
        id={file.name}

      />
  
      );
    }
});
