import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { MediaComponent } from "./MediaComponent";
import styles from "./VideoPlayer.module.css";
import useInterval from "./useInterval";
import playButton from "./playButton.svg";
import pauseButton from "./pauseButton.svg";
import { VideoProgressBar } from "../VideoProgressBar/VideoProgressBar";
import { Music } from "../Music/Music";

/*
 * VideoPlayer.tsx consist of the components to generate a playing video
 *  This include: progress bar, timer, play/pause buttons, the files playing/pausing
 */

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
  openSharePage: boolean;
};

export const VideoPlayer: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter, openSharePage }) => {
    const [initialDelay] = useState<number>(100);

    const playVideo = () => {
      if (outputPresenter.overallPlayedSeconds >= outputPresenter.currLength.totalDuration) {
        outputPresenter.resetVideo();
        mediaPresenter.resetAllPlayedFiles();
      }
      outputPresenter.playVideo();
    }

    useEffect(() => {
      outputPresenter.seekPlayMusic();
    }, [outputPresenter]);
    useInterval(
      () => {
        //seek each media
        mediaPresenter.incrementFilePlayed(
          outputPresenter.currPlayingMedia,
          initialDelay / 1000
        );
        let music = outputPresenter.currMusic;
        let currentMediaCounter = outputPresenter.currPlayingMedia;
        if (music.ended) {
          mediaPresenter.resetAllPlayedFiles();
        } else if (outputPresenter.currSlotLength <= currentMediaCounter) {
          outputPresenter.pauseVideo();
          mediaPresenter.resetAllPlayedFiles();
        } else {
          outputPresenter.incrementPlayedSeconds(initialDelay / 1000);
        }
      },
      outputPresenter.isPlaying ? initialDelay : null
    );

    return (
      <div className={styles.finalVideoContainer}>
        {outputPresenter.currMusicLoaded && (
          <MediaComponent
            play={outputPresenter.isPlaying}
            file={mediaPresenter.getFile(outputPresenter.currPlayingMedia)}
            playfrom={mediaPresenter.getFilePlayed(
              outputPresenter.currPlayingMedia
            )}
          />
        )}
        <VideoProgressBar outputPresenter={outputPresenter} />
        {outputPresenter.isPlaying ? (
          <img
            src={pauseButton}
            onClick={outputPresenter.pauseVideo}
            className={styles.pauseBtn}
            alt="pause button"
          />
        ) : (
          <img
            src={playButton}
            onClick={playVideo}
            className={styles.playBtn}
            alt="play button"
          />
        )}
        {!openSharePage && (
          <Music
            mediaPresenter={mediaPresenter}
            outputPresenter={outputPresenter}
          />
        )}
      </div>
    );
  }
);
