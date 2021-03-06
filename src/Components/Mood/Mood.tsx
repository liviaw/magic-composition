import React from "react";
import { observer } from "mobx-react";
import styles from "./Mood.module.css";
import type { MediaPresenter } from "../../MediaPresenter";
import { templates } from "../../Template";
import type { OutputPresenter } from "../../OutputPresenter";
import { showToast } from "../Toast/Toast";

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
    return (
      <div className={styles.moodContainer}>
        <p className={styles.optionHeading}>Length</p>
        <div className={styles.optionContainer}>
          {["short", "medium", "long"].map((duration) => {
            let present: boolean = outputPresenter.canShowDuration(
              mediaPresenter.filesLength,
              duration
            );
            return (
              <button
                className={
                  present
                    ? outputPresenter.templateLength === duration
                      ? styles.clickedOptionButton
                      : styles.optionButton
                    : styles.hidden
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
        <p className={styles.optionHeading}>Mood</p>
        <div className={styles.optionContainer}>
          {Object.values(templates).map((template) => {
            if (outputPresenter.templateMood !== template.style) {
              return (
                <button
                  className={styles.optionButton}
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
                  className={styles.clickedOptionButton}
                >
                  {template.style}
                </button>
              );
            }
          })}
        </div>
        <button
          className={styles.useButton}
          onClick={() => {
            outputPresenter.resetVideo();
            mediaPresenter.resetAllPlayedFiles();
            showToast("Preparing your design...");
          }}
        >
          Use in a design
        </button>
        <button className={styles.shareButton} onClick={openSharedPage}>
          Share
        </button>
      </div>
    );
  }
);
