import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { MediaPresenter } from "../MediaPresenter";

type MediaProps = {
  file: File;
  onEnded: () => void;
  interval: number;
  mediaDur: number;
};
export const MediaComponent: React.FC<MediaProps> = ({
  file,
  onEnded,
  interval,
  mediaDur,
}) => {
  const mediaRef: any = useRef(undefined);
  if (MediaPresenter.isImage(file)) {
    return <img src={URL.createObjectURL(file)} alt={file.name} />;
  } else if (MediaPresenter.isVideo(file)) {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
          mediaRef.current = newRef;
        }}
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={Math.random() * MediaPresenter.audioSound}
        onEnded={onEnded}
        onPlay={() => {
          console.log(interval);
          if (mediaDur > interval) {
            console.log("HELLO");
          }
          if (
            mediaDur > interval &&
            mediaRef != null &&
            mediaRef.current != null
          ) {
            mediaRef.current.seekTo(mediaDur - interval, "seconds");
            console.log("seek not null");
          }
        }}
      />
    );
  }
  return null;
};
