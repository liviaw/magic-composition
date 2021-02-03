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
  // const [loop, setLoop] = useState<boolean>(false);
  // const [videoVolume, setVideoVolume] = useState<number>(0.6);
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
        }}
        id={file.name}
        // Idk what volume to put :( - ask Julia?
        // I can analyse the volume of the video if i feel fancy - https://www.npmjs.com/package/react-volume-meter
        // volume={videoVolume}

        onEnded={() => {
          console.log("on ended");
          // if slot is longer than the file, loop it
          if (mediaPlayed + mediaDur < interval) {
            console.log("setting seek to 0");
            setMediaPlayed(mediaPlayed + mediaDur);
            if (mediaRef != null && mediaRef.current != null) {
              mediaRef.current.seekTo(0, "seconds");
              // must change to this
              // mediaRef.current.seekTo(playfrom, "seconds");
            }
          } else {
            console.log("changing counter");
            onEnded(mediaPlayed + mediaDur);
          }
        
        }}
        className={play? styles.clear  : styles.blur}
        onProgress={({playedSeconds}) => {
          let h = mediaPlayed+playedSeconds;
          console.log(h);
          console.log(mediaPlayed+playedSeconds);
          console.log("interval is " + interval);
          console.log("media dur is " + mediaDur);
          console.log("played seconds is " + playedSeconds);
          
          // will go here if it has looped and
          // greater than interval
          if (playedSeconds + mediaPlayed >= interval) {
            // setLoop(false);
            setMediaPlayed(mediaPlayed + playedSeconds);
            setPlay(false);
            onEnded(interval + playedSeconds + mediaPlayed);
            console.log("1: on progress " + playedSeconds);
          }

          if (playedSeconds >= mediaDur) {
            console.log("3");
            setMediaPlayed(mediaPlayed + playedSeconds);
            if (mediaRef != null && mediaRef.current != null) {
              mediaRef.current.seekTo(0, "seconds");
              // must change to this
              // mediaRef.current.seekTo(playfrom, "seconds");
            }
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
