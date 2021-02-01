import React, { useState } from "react";
// import { VideoProgressBar } from "./VideoProgressBar";
import styles from "./VideoModal.module.css";
import { MediaComponent } from "./MediaComponent";
// import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from "mobx-react";
// import ReactPlayer from "react-player";
import playButton from "./playButton.png";
import pauseButton from "./pauseButton.png";
import type { slotEl } from "../Template";

type Props = {
  mediaPresenter: MediaPresenter;
  slot: slotEl;
  music: HTMLAudioElement;
  styleIndex: number;
};

export const VideoPlayer: React.FC<Props> = observer(
  ({ mediaPresenter, slot, music, styleIndex }) => {
    // default template is calm, medium

    const [mediaCounter, setMediaCounter] = useState<number>(0);

    const [play, setPlay] = useState<boolean>(false);

    // incrementing index of media[]
    const changeImage = (playedDur: number): void => {
      // // if files are not attached or if video is playing, do not change interval
      if (mediaPresenter.filesLength === 0) {
        return;
      }
      // TODO: if too many media or too little slots, manage it.
      let filesLen = mediaPresenter.filesLength;
      if (music.ended) {
        // should never go here? Because I set up the templates to be short or equal to music lengtj
        setMediaCounter(filesLen - 1);
        console.log("music has ended");
      } else if (slot.slot.length < mediaCounter) {
        setMediaCounter(filesLen - 1);
        music.pause();
      } else if (mediaCounter >= filesLen - 1) {
        console.log("not enough media");
        // clearing interval for media switching within the video
        setMediaCounter(filesLen - 1);
        music.pause();
        // }
      } else {
        // video ended
        // set how long the video has or image has played for
        mediaPresenter.played[mediaCounter] += playedDur;
        setMediaCounter((mediaCounter) => mediaCounter + 1);
      }
    };

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MediaComponent
          file={mediaPresenter.getFile(mediaCounter, styleIndex)}
          onEnded={changeImage}
          interval={slot.slot[mediaCounter]}
          mediaDur={mediaPresenter.getDuration(mediaCounter)}
          play={play}
          setPlay={setPlay}
          playfrom={mediaPresenter.played[mediaCounter]}
        />
        {play ? (
          <img
            className={styles.pauseButton}
            onClick={() => {
              setPlay(false);
              music.pause();
            }}
            src={pauseButton}
            alt="pause button"
          />
        ) : (
          <img
            onClick={() => {
              // music.currentTime=slot.start;
                music.play();
                setPlay(true);
            }}
            className={styles.playButton}
            src={playButton}
            alt="play button"
          />
        )}
      </div>
    );
  }
);
