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
import replayButton from "./replayButton.png";
import type { slotEl } from "../Template";

type Props = {
  mediaPresenter: MediaPresenter;
  slot: slotEl;
  music: HTMLAudioElement;
  styleIndex: number;
};

export const VideoPlayer: React.FC<Props> = observer(
  ({ mediaPresenter, slot, music, styleIndex }) => {
    // default template is calm, short

    const [mediaCounter, setMediaCounter] = useState<number>(0);
    const [filesLength] = useState<number>(mediaPresenter.filesLength);
    const [play, setPlay] = useState<boolean>(false);

    // incrementing index of media[]
    const onEnded = (playedDur: number): void => {
      console.log(mediaCounter);
      // // if files are not attached or if video is playing, do not change interval
      if ( filesLength === 0) {
        return;
      }
      // TODO: if too many media or too little slots, manage it.
      let filesLen = mediaPresenter.filesLength;
      if (music.ended) {
        // should never go here? Because I set up the templates to be short or equal to music lengtj
        setMediaCounter(filesLen - 1);
        console.log("music has ended");
      } else if (slot.slot.length <= mediaCounter) {
        setMediaCounter(filesLen - 1);
        music.pause();
        music.load();
      } else {
        // video ended
        // set how long the video has or image has played for
        mediaPresenter.addFilePlayed(mediaCounter, playedDur);
        setMediaCounter(mediaCounter + 1);
      }
    };
   

     // if the video is the last file, lower the volume of music
     if (music.currentTime >= slot.end - 3) {
       console.log(" slot.end is " +slot.end);
       console.log("music current time " + music.currentTime);
       console.log( " seconds left")
       console.log(slot.end - music.currentTime);
      if (music.volume - 0.1 > 0) {
        console.log("before " + music.volume);
        music.volume -= 0.1;
        console.log("after " + music.volume);
      }
    }

    console.log("videplayer " + mediaPresenter.getDuration(mediaCounter, styleIndex));

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
       { mediaCounter < mediaPresenter.filesLength && 
        <MediaComponent
          file={mediaPresenter.getFile(mediaCounter, styleIndex)}
          onEnded={onEnded}
          interval={slot.slot[mediaCounter]}
          mediaDur={mediaPresenter.getDuration(mediaCounter, styleIndex)}
          play={play}
          setPlay={setPlay}
          playfrom={mediaPresenter.getFilePlayed(mediaCounter, styleIndex)}
          //  idt this is the right filename
          key={mediaPresenter.getFileName(mediaCounter)}
        />}
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

        {
          (mediaCounter >= mediaPresenter.filesLength || music.paused )&&
          (<img
            onClick={() => {
              setMediaCounter(0);
              music.load();
              music.currentTime=slot.start;
              music.play();
              setPlay(true);
            }}
            className={styles.replayButton}
            src={replayButton}
            alt="replay button"
          />) 
        }
      </div>
    );
  }
);
