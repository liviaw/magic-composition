import React from "react";
import { observer } from "mobx-react";
import styles from "./Mood.module.css";
import type { MediaPresenter } from "../../MediaPresenter";
import { templates } from "../../Template";
import type { OutputPresenter } from "../../OutputPresenter";

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
};

export const Mood: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter }) => {
    return (
      <div className={styles.flexContainer}>
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
                      ? styles.clickedOptionBtn
                      : styles.optionBtn
                    : styles.hidden
                }
                key={duration}
                onClick={() => {
                  if (present && outputPresenter.templateLength !== duration) {
                    outputPresenter.setCurrLength(duration);
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
                  className={styles.optionBtn}
                  key={template.style}
                  onClick={() => {
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
                <button key={template.style} className={styles.clickedOptionBtn}>
                  {template.style}
                </button>
              );
            }
          })}
        </div>
        <button className={styles.useBtn} onClick={outputPresenter.resetVideo}>Use in a design</button>
        <button className={styles.shareBtn} onClick={outputPresenter.resetVideo}>Share</button>
      </div>
    );
  }
);
