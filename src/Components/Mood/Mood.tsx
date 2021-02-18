import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "./Mood.module.css";
import type { MediaPresenter } from "../../MediaPresenter";
import { templates } from "../../Template";
import type { OutputPresenter } from "../../OutputPresenter";
import { showToast } from "../Toast/Toast";
import classnames from "classnames";

/**
 * Mood.tsx contains all mood options a user can pick
 * following the media imported by the user
 */

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
  openSharedPage: () => void;
};

export const Mood: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter, openSharedPage }) => {
    const [showLength, setShowLength] = useState<boolean>(true);
    const [showMood, setShowMood] = useState<boolean>(true);

    const toggleLengthContainer = () => {
      setShowLength(!showLength);
    }
    const toggleMoodContainer = () => {
      setShowMood(!showMood);
    }
    return (
      <div className={styles.moodContainer}>
        <span onClick={toggleLengthContainer}>
          {/* arrow points downward when the container is open */}
            <i className={classnames(styles.arrow, {[styles.down]: showLength, [styles.up]: !showLength})}></i>
          </span>
        <p className={styles.optionHeading}>Length</p>
        { showLength &&
          <div className={styles.optionContainer}>
          {["short", "medium", "long"].map((duration) => {
            let present: boolean = outputPresenter.canShowDuration(
              mediaPresenter.filesLength,
              duration
              );
              return (
                <button
                className={ classnames(styles.option,
                  present
                  ? outputPresenter.templateLength === duration
                  ? styles.clickedOption
                  : styles.optionButton
                  : styles.hidden
                  )
                }
                key={duration}
                onClick={() => {
                  if (present && outputPresenter.templateLength !== duration) {
                    outputPresenter.setCurrLength(duration);
                    mediaPresenter.resetAllPlayedFiles();
                  }
                }}
                >
                <span>{duration}</span>
              </button>
            );
          })}
        </div>
        }
        <br/>
        <span onClick={toggleMoodContainer}>
            <i className={classnames(styles.arrow, {[styles.down]: showMood, [styles.up]: !showMood})}></i>
          </span>
        <p className={styles.optionHeading}>Mood</p>
        {showMood &&
          <div className={styles.optionContainer}>
          {Object.values(templates).map((template) => {
            if (outputPresenter.templateMood !== template.style) {
              return (
                <button
                className={classnames(styles.option, styles.optionButton)}
                key={template.style}
                onClick={() => {
                  mediaPresenter.resetAllPlayedFiles();
                  outputPresenter.setCurrMood(
                    template,
                    mediaPresenter.filesLength
                    );
                  }}
                  >
                  {template.style}
                </button>
              );
            } else {
              return (
                <button
                key={template.style}
                className={classnames(styles.option, styles.clickedOption)}
                >
                  {template.style}
                </button>
              );
            }
          })}
        </div>
        }
        <button
          className={classnames(styles.button, styles.use)}
          onClick={() => {
            outputPresenter.resetVideo();
            mediaPresenter.resetAllPlayedFiles();
            showToast("Preparing your design...");
          }}
        >
          Use in a design
        </button>
        <button className={classnames(styles.button, styles.share)} onClick={openSharedPage}>
          Share
        </button>
      </div>
    );
  }
);
