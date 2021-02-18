import React from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import disk from "../../Media/disk.svg";
import styles from "./Music.module.css";
import classnames from "classnames";
import type { OutputPresenter } from "../../OutputPresenter";

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
};

export const Music: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter }) => {
    const prevTrack = () => {
      outputPresenter.prevCurrTrack(mediaPresenter.filesLength);
      mediaPresenter.resetAllPlayedFiles();
    };

    const nextTrack = () => {
      outputPresenter.nextCurrTrack(mediaPresenter.filesLength);
      mediaPresenter.resetAllPlayedFiles();
    };

    return (
      <div className={styles.flexContainer}>
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>Previous Track </span>
          <span
            onClick={prevTrack}
            className={
              outputPresenter.currMoodLen > 1 ? classnames(styles.arrow, styles.previous) : undefined
            }
          ></span>
        </div>
        <div className={styles.musicContainer}>
          <img
            src={disk}
            className={classnames(styles.disk, {
              [styles.playingDisk]: outputPresenter.isPlaying,
            })}
            alt="music logo"
          />
          {outputPresenter.musicName}
        </div>
        <div className={styles.tooltip}>
          <span className={styles.tooltiptext}>Next Track </span>
          <span
            onClick={nextTrack}
            className={
              outputPresenter.currMoodLen > 1 ? classnames(styles.next, styles.arrow) : undefined
            }
          ></span>
        </div>
      </div>
    );
  }
);
