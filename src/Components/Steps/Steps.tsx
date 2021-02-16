import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "./Steps.module.css";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { showError } from "../Toast/Toast";
import { Mood } from "../Mood/Mood";

/**
 * This folder contains components for
 * left panel of the modal
 * Showing steps to user for creating a video
 */

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
  openPlayerModal: () => void;
  closePlayerModal: () => void;
  openSharedPage: () => void;
};

export const Steps: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter, openPlayerModal, closePlayerModal, openSharedPage }) => {
    const [stepOneOpen, setStepOneOpen] = useState<boolean>(true);
    const [stepTwoOpen, setStepTwoOpen] = useState<boolean>(false);
    const handleMediaUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.files === null) return;
      const files: FileList = event.target.files;
      Array.from(files).forEach((file: File) => {
        if (!mediaPresenter.addFile(file)) {
          showError(
            "Oh no! " +
              file.name +
              " is a duplicated file or unacceptable file format"
          );
        }
      });
    };

    const onStepClick = () => {
      if (mediaPresenter.mediaReady) {
          setStepOneOpen(true);
          setStepTwoOpen(false);
        }
        closePlayerModal();
    };

    return (
      <div className={styles.stepsContainer}>
        <div className={styles.steppingContainer} onClick={onStepClick}>
          <span className={styles.stepNumber}>1</span>

          <p className={styles.stepText}>Add your files</p>
          <span
            onClick={() => {
              setStepOneOpen(!stepOneOpen);
            }}
          >
            <i className={stepOneOpen ? styles.downArrow : styles.upArrow}></i>
          </span>
        </div>

        {stepOneOpen && (
          <button className={styles.uploadButtonContainer}>
            <label htmlFor="fileUpload">
              <div
                className={
                  mediaPresenter.mediaReady
                    ? styles.clickedUploadButton
                    : styles.uploadButton
                }
              >
                Upload media
              </div>
            </label>
            <input
              hidden
              multiple
              id="fileUpload"
              type="file"
              accept="video/* image/*"
              onChange={handleMediaUpload}
            />
          </button>
        )}
        {stepOneOpen && mediaPresenter.mediaReady && (
          <button
            className={styles.continueButton}
            onClick={() => {
                setStepTwoOpen(true);
                setStepOneOpen(false);
                openPlayerModal();
                outputPresenter.resetVideo();
                mediaPresenter.resetAllPlayedFiles();
            }}
          >
            Continue
          </button>
        )}
        <div
          className={
            mediaPresenter.mediaReady
              ? styles.steppingContainer
              : styles.disabledContainer
          }
          onClick={() => {
            if (mediaPresenter.mediaReady) {
              setStepTwoOpen(true);
              setStepOneOpen(false);
              openPlayerModal();
            }
          }}
        >
          <div
            className={
              mediaPresenter.mediaReady
                ? undefined
                : styles.disabledSteppingContainer
            }
          >
            <span
              className={
                mediaPresenter.mediaReady
                  ? styles.stepNumber
                  : styles.disabledStepNumber
              }
            >
              2
            </span>
            <p
              className={
                mediaPresenter.mediaReady
                  ? styles.stepText
                  : styles.disabledStepText
              }
            >
              Customise your video
            </p>
            <span>
              <i
                className={
                  mediaPresenter.mediaReady
                    ? stepTwoOpen
                      ? styles.downArrow
                      : styles.upArrow
                    : styles.disabledUpArrow
                }
                onClick={() => {
                  setStepTwoOpen(!stepTwoOpen);
                }}
              ></i>
            </span>
          </div>
        </div>
        {mediaPresenter.mediaReady && stepTwoOpen && (
          <Mood
            outputPresenter={outputPresenter}
            mediaPresenter={mediaPresenter}
            openSharedPage={openSharedPage}
          />
        )}
      </div>
    );
  }
);
