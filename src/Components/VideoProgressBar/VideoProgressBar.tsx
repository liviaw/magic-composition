import React from "react";
import { observer } from "mobx-react";
import type { OutputPresenter } from "../../OutputPresenter";
import Slider from "react-input-slider";

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
      <div>
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
              width: 520,
            },
            active: {
              backgroundColor: "#8d39fa",
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

        <span>
          {formattedTime(outputPresenter.overallPlayedSeconds) +
            " / " +
            formattedTime(outputPresenter.totalVideoDuration)}
        </span>
        <br />
      </div>
    );
  }
);
