import React, { useEffect, useState, useRef } from "react";
import { Media, VideoProgressBar, ImageWrapper, isImage, isVideo, audioSound } from "..";
import ReactPlayer from "react-player";

type MediaProps = {
  file: File;
  onEnded: () => void;
  interval: number;
  mediaDur:number;
  setCurrProgress: (func: (progress: number) => number) => void;
};
export const MediaComponent: React.FC<MediaProps> = ({ file, onEnded, interval, mediaDur, setCurrProgress }) => {
    const mediaRef: any = useRef(undefined);
    if (isImage(file)) {
    return (
      <ImageWrapper file={file} changeImage={onEnded} duration={interval * 1000} key={file.name}/>
    );
  } else if (isVideo(file)) {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
            mediaRef.current= newRef;
        }}
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={Math.random() * audioSound}
        onEnded={onEnded}
        // onProgress={({playedSeconds}) => {
        //     setCurrProgress((curr: number) => curr + playedSeconds)
        // }}
        onPlay={ () => {
            // console.log("NULLLLLLLL " + mediaRef + " fsdsd " + mediaRef.current);
            console.log(interval);
            if (mediaDur > interval) {
                console.log("HELLO");
            }
            if (mediaDur > interval && mediaRef != null && mediaRef.current != null) {
                mediaRef.current.seekTo(mediaDur - interval, 'seconds');
                console.log("seek not null");
            }
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
