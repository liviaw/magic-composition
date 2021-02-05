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

  const [mediaPlayed, setMediaPlayed] = useState<number>(0);
  const [hasLooped, setHasLooped] = useState<boolean>(false);
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
        playing={true}
        onError={() => {
          showError(file.name + " is unable to play");
          onEnded(interval);
        }}
        id={file.name}
        className={play? styles.clear  : styles.blur}
        onStart={ () => {
          console.log("onstart: " + interval);
          console.log("onstart: " + playfrom);
          if (mediaRef != null && mediaRef.current != null) {
            mediaRef.current.seekTo(playfrom, "seconds");
          }
        }}
        progressInterval={100}
        onProgress={({playedSeconds})=> {
          if (mediaPlayed + playedSeconds >= interval) {
            setMediaPlayed(mediaPlayed + playedSeconds);
            setPlay(false);
            onEnded(interval);
          }
        }}
        onEnded={() => {
          console.log("on ended");
          // if slot is longer than the file, loop it
          if (mediaPlayed + mediaDur < interval) {
            console.log("setting seek to 0");
            // the first time goes to this if statement -> only add mediplayed by (mediaDur - playfrom)
            if (hasLooped) {
              setMediaPlayed(mediaPlayed + mediaDur);
            } else {
              setMediaPlayed(mediaPlayed + (mediaDur - playfrom));
            }
            setHasLooped(true);
            if (mediaRef != null && mediaRef.current != null) {
              mediaRef.current.seekTo(0, "seconds");
            }
          } else {
            onEnded(mediaPlayed + mediaDur);
          }
        }}
      />

    );
  }
};
