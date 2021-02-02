import React, { useRef, useState } from "react";
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
  const [mediaPlayed, setMediaPlayed] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(true);
  const [videoVolume, setVideoVolume] = useState<number>(0.6);
  const changeImage = (): void => {
    onEnded(interval);
  }
  // mediaDur is how long your video file is
  // interval is the time inside slot:number[]
  
  const mediaRef: any = useRef(undefined);
  console.log("hmmmm :,,,(");
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
        // loop={loop}
        // idk if this will work, how to test it - how to get a broken video
        onError={() => {
          showError(file.name + " is unable to play");
          onEnded(interval);
          // setLoop(false);
        }}
        id={file.name}
        // Idk what volume to put :( - ask Julia?
        // I can analyse the volume of the video if i feel fancy - https://www.npmjs.com/package/react-volume-meter
        volume={videoVolume}
        onEnded={() => {
          console.log("on ended");
          // if slot is longer than the file, loop it
          if (mediaPlayed + mediaDur < interval) {
            setMediaPlayed(mediaPlayed + mediaDur);
            // setLoop(true);
          } else {
            // setLoop(false);
            onEnded(mediaPlayed + mediaDur);
          }
        
        }}
        className={play? styles.clear  : styles.blur}
        onProgress={({playedSeconds}) => {
          if (playedSeconds >= interval) {
            setPlay(false);
            onEnded(interval);
            console.log("1: on progress " + playedSeconds);
          }
          // will go here if it has looped
          if (playedSeconds + mediaPlayed >= interval) {
            setPlay(false);
            onEnded(interval + playedSeconds + mediaPlayed);
            console.log("2: on progress " + playedSeconds);
          }
          // first loop - video starts
          // incrementally increase video volume for the first MediaPresenter.audioSound seconds
          if (mediaPlayed === 0 && playedSeconds < MediaPresenter.audioSound && videoVolume + 0.1 <= 1) {
            setVideoVolume(videoVolume + 0.1);
            console.log("3: on progress " + playedSeconds);
          } 
          // incrementally increase video volume for the last MediaPresenter.audioSound seconds 
          if (playedSeconds + mediaPlayed + MediaPresenter.audioSound >= interval&& videoVolume - 0.1 <= 0) {
            setVideoVolume(videoVolume - 0.1);
            console.log("4: on progress " + playedSeconds);
          }  
         
        }}
        onStart={ () => {
            console.log(interval);
            // below code is to play from behind - interval
            // if (mediaDur > interval && mediaRef != null && mediaRef.current != null) {
            //   mediaRef.current.seekTo(mediaDur - interval, 'seconds');
            // }
            if (mediaRef != null && mediaRef.current != null) {
              mediaRef.current.seekTo(playfrom, "seconds");
            }
         }
        }
      />

    );
  }
};
