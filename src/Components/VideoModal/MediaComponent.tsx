import React, { useRef } from "react";
import { ImageWrapper } from "../MediaWrapper/ImageWrapper";
import ReactPlayer from "react-player";
import { MediaPresenter } from "../MediaPresenter";
import styles from "./VideoModal.module.css";
import { showError } from "../ErrorToast/ErrorToast";

// mediaDur is how long is your video
// interval is how long is that slot
type MediaProps = {
  file: File;
  onEnded: (playedDur: number) => void;
  interval: number;
  mediaDur:number;
  play: boolean;
  playfrom:number;
  setPlay: (value: boolean) => void;
};
export const MediaComponent: React.FC<MediaProps> = ({ file, onEnded, interval, mediaDur, play, playfrom, setPlay, }) => {


  // const resetPlayer = () => {
  //   // reset music counter
  //   // reset file counter
  // }

  const changeImage = (): void => {
    onEnded(interval);
  }
  
  
  const mediaRef: any = useRef(undefined);
  if (MediaPresenter.isImage(file)) {
    return (
      <ImageWrapper file={file} changeImage={changeImage} duration={interval * 1000} key={file.name} play={play}/>
    );
  } else {
    return (
      <ReactPlayer
        ref={(newRef: any) => {
            mediaRef.current= newRef;
        }}
        url={URL.createObjectURL(file)}
        playing={play}
        // idk if this will work
        onError={() => {
          showError(file.name + " is unable to play");
          onEnded(interval);
        }}
        id={file.name}
        volume={Math.random() * MediaPresenter.audioSound}
        onEnded={() => {onEnded(interval)}}
        className={play? styles.clear  : styles.blur}
        // TODO
        onProgress={({playedSeconds}) => {
          // console.log(playedSeconds);
          if (playedSeconds >= interval) {
            setPlay(false);
            onEnded(interval);
          }
         
        }}
        onReady={() => {
          if (mediaRef != null && mediaRef.current != null ) {
              mediaRef.current.seekTo(playfrom, "seconds");
          }
        }}
        // onPause = {() => {
        //   mediaPresenter.played += interval * 1000;
        // }}
        onPlay={ () => {
            console.log(interval);
            // mediaDur is how long your video file is
            // interval is the time inside slot:number[]
            if (mediaDur > interval) {
              //TODO, match with music
              console.log("HELLO");
            }
            // below code is to play from behind - interval
            // if (mediaDur > interval && mediaRef != null && mediaRef.current != null) {
            //   mediaRef.current.seekTo(mediaDur - interval, 'seconds');
            // }
            // if (mediaRef != null && mediaRef.current != null) {
            //   mediaRef.current.seekTo(playfrom, "seconds");
            // }
            // TODO
            // if (mediaRef != null && mediaRef.current != null ) {
            //     mediaRef.current.seekTo(0.4, "fraction");
            // }
         }
        }
      />

    );
  }
};
