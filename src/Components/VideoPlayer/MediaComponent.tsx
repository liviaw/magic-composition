import React, { useRef } from "react";
import { observer } from "mobx-react";
import { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import styles from "./VideoPlayer.module.css";
import ReactPlayer from "react-player";
import { outputPresenter } from "../../OutputPresenter";
import {showError} from "../ErrorToast/ErrorToast";

type Props = {
    file: File;
    playfrom: number;
    outputPresenter: OutputPresenter;
  };

export const MediaComponent: React.FC<Props> = observer(({
    file,
    playfrom,
}) => {
  console.log(playfrom);
    const mediaRef: any = useRef(undefined);
    if (MediaPresenter.isImage(file)) {
      return (
        <img
    className={outputPresenter.isPlaying ? styles.clear : styles.blur}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
    } else {
      return (
        <ReactPlayer
        className={outputPresenter.isPlaying ? styles.clear : styles.blur}
        ref={(newRef: any) => {
            mediaRef.current= newRef;
        }}
        volume={0.3}
        url={URL.createObjectURL(file)}
        playing={outputPresenter.isPlaying}
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