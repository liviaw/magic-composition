import React, { useEffect, useState, useRef } from "react";
import { Media, VideoProgressBar, ImageWrapper, isImage, isVideo, audioSound } from "..";
import ReactPlayer from "react-player";

type MediaProps = {
  file: File;
  onEnded: () => void;
};
let duration:number = 1000;
export const MediaComponent: React.FC<MediaProps> = ({ file, onEnded }) => {
    const temp: any = useRef(undefined);
    if (isImage(file)) {
    return (
      <ImageWrapper file={file} changeImage={onEnded} duration={duration} />
    );
  } else if (isVideo(file)) {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
            temp.current= newRef;
        }}
        url={URL.createObjectURL(file)}
        width="100%"
        controls={true}
        height="50%"
        playing={false}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={Math.random() * audioSound}
        onEnded={onEnded}
        onPlay={ () => {
            console.log("NULLLLLLLL " + temp + " fsdsd " + temp.current);
            if (temp != null && temp.current != null ) {
                temp.current.seekTo(0.4, "fraction");
                console.log("seek not null");
            } }
        }
      />

    );
  }
  return null;
};
