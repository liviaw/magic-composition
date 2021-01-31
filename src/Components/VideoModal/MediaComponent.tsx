import React, { useEffect, useState, useRef } from "react";
import { ImageWrapper } from "../MediaWrapper/ImageWrapper";
import ReactPlayer from "react-player";
import { MediaPresenter } from "../MediaPresenter";
import styles from "./VideoModal.module.css";

// mediaDur is how long is your video
// interval is how long is that slot
type MediaProps = {
  file: File;
  onEnded: () => void;
  interval: number;
  mediaDur:number;
  play: boolean;
};
export const MediaComponent: React.FC<MediaProps> = ({ file, onEnded, interval, mediaDur, play }) => {
  const mediaRef: any = useRef(undefined);
  if (MediaPresenter.isImage(file)) {
    return (
      <ImageWrapper file={file} changeImage={onEnded} duration={interval * 1000} key={file.name} play={play}/>
    );
  } else if (MediaPresenter.isVideo(file)) {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
            mediaRef.current= newRef;
        }}
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={play}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={Math.random() * MediaPresenter.audioSound}
        onEnded={onEnded}
        className={styles.renderMedia}
        // TODO
        // onProgress={({playedSeconds}) => {
        //   console.log(playedSeconds);
        //     setCurrProgress((curr: number) => curr + 1)
        // }}
        onPlay={ () => {
            console.log(interval);
            if (mediaDur > interval) {
              //TODO, match with music
              console.log("HELLO");
            }
            if (mediaDur > interval && mediaRef != null && mediaRef.current != null) {
              mediaRef.current.seekTo(mediaDur - interval, 'seconds');
            }
            // TODO
            // if (mediaRef != null && mediaRef.current != null ) {
            //     mediaRef.current.seekTo(0.4, "fraction");
            // }
         }
        }
      />

    );
  }
  return null;
};
