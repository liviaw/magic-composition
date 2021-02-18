import React from "react";
import { observer } from "mobx-react";
import type { OutputPresenter } from "../../OutputPresenter";
import Slider from "react-input-slider";
import styles from "./VideoProgressBar.module.css";
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

type Props = {
  outputPresenter: OutputPresenter;
};

export const VideoProgressBar: React.FC<Props> = observer(
  ({ outputPresenter }) => {
    const formattedTime = (duration: number): string => {
      // Hours, minutes and seconds
      var hrs = Math.floor(duration / 3600);
      var mins = Math.floor((duration % 3600) / 60);
      var secs = Math.floor(duration % 60);

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";

      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    };
    
    return (
      <div className={styles.progressBar}>
        {/* #d4d9ddf8 */}
        {/* 8d39fa */}
        <PauseIcon className={styles.grey}/>
        <Slider
          axis="x"
          x={
            (outputPresenter.overallPlayedSeconds /
              outputPresenter.totalVideoDuration) *
            100
          }
          onChange={({ x }) => {
            const result = (x / 100) * outputPresenter.totalVideoDuration;
            outputPresenter.seekVideo(result);
          }}
          styles={{
            track: {
              backgroundColor: "#d4d9ddf8",
              width: "31vw",
              height: "7px",
              marginRight: "7px",
            },
            active: {
              backgroundColor: "#ffffff",
            },
            thumb: {
              width: 15,
              height: 15,
            },
            disabled: {
              opacity: 0.5,
            },
          }}
        />
        <span className={styles.grey}>
          {formattedTime(outputPresenter.overallPlayedSeconds) +
            " / " +
            formattedTime(outputPresenter.totalVideoDuration)}
        </span>
            <VolumeUpIcon className={styles.grey}/>

      </div>
    );
  }
);
