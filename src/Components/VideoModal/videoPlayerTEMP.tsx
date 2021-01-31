import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Carousel } from "react-bootstrap";
import { VideoProgressBar } from "./VideoProgressBar";
import { templates } from "../Template";
import type { musicElement, templateEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
import { MediaComponent } from "./MediaComponent";
import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from 'mobx-react';
import ReactPlayer from "react-player";

type Props = {
  mediaPresenter: MediaPresenter;
}

export const VideoPlayer: React.FC<Props> = observer(({
  mediaPresenter
}) => {
   // default template is calm, medium
    const [styleIndex, setStyleIndex] = useState<number>(0);
    const [currStyle, setCurrStyle] = useState<musicElement>(templates[styleIndex]);
    const [trackIndex, setTrackIndex] = useState<number>(0);
    const [currTemplate, setCurrTemplate] = useState<templateEl>(currStyle.tracks[trackIndex]);
    const [music, setMusic] = useState<HTMLAudioElement>(new Audio(currTemplate.musicTrack));
    // not sure if it's called blue
    const canvaBlue = "#00C4CC";
    const [mediaCounter, setMediaCounter] = useState<number>(0);
    const [shuffledCounter, setShuffledCounter] = useState<number[]>(mediaPresenter.shuffleArray());
    const [musicLoaded, setMusicLoaded] = useState<boolean>(false);
    const [length, setLength] = useState<slotEl>(currTemplate.medium);
  
    const [play, setPlay] = useState<boolean>(false);
    const [imageInterval, setImageInterval] = useState<number>(0);

     // incrementing index of media[]
  const changeImage = (): void => {
    // // if files are not attached or if video is playing, do not change interval
    // if (mediaPresenter.filesLength === 0) {
    //   return;
    // }
    // // TODO: if too many media or too little slots, manage it.
    // let filesLen = mediaPresenter.filesLength;
    // if (music.ended) {
    //   // should never go here? Because I set up the templates to be short or equal to music lengtj
    //   setMediaCounter(filesLen- 1);
    //   console.log("music has ended");
    // } else if (length.slot.length < mediaCounter) {
    //   setMediaCounter(filesLen  - 1);
    //   music.pause();
    // } else if (mediaCounter >= filesLen  - 1 ) {
    //   console.log("not enough media");
    //     // clearing interval for media switching within the video
    //     setMediaCounter(filesLen - 1);
    //     music.pause();
    //   // }
    // } else {
    //   // video ended
    //   setMediaCounter((mediaCounter) => mediaCounter + 1);
    // }
    setMediaCounter((mediaCounter) => mediaCounter + 1);
  };

  const onPause = () => {
    setPlay(false);
    setImageInterval(length.slot[mediaCounter]);
  }

    return (
      <div>
        <Container fluid className={play? styles.frame  : styles.blur}>
          <MediaComponent
            file={mediaPresenter.getFile(mediaCounter)}
            onEnded={changeImage}
            interval={imageInterval}
            mediaDur={mediaPresenter.getDuration(mediaCounter)}
            play={play}
          />

          
        </Container>
        {play ? 
          <Button onClick={() => {
            setPlay(false);
          }}> Pause </Button>
        :
        <Button onClick={() => {
          setPlay(true);
        }}> Play </Button>
        }
      </div>
    )
})