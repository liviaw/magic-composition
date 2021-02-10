import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "./Steps.module.css";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { showError } from "../ErrorToast/ErrorToast";
import {Mood} from "../Mood/Mood";

type Props = {
  stepNumber: number;
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
};

export const Steps: React.FC<Props> = observer(
  ({ stepNumber, mediaPresenter, outputPresenter }) => {
    const handleMediaUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.files === null) return;
      const files: FileList = event.target.files;
      Array.from(files).forEach((file: File) => {
        if (!mediaPresenter.addFile(file)) {
          showError(file.name + "is not an acceptable file format");
        }
      });
    };

    const [stepOneOpen, setStepOneOpen] = useState<boolean>(true);
    const [stepTwoOpen, setStepTwoOpen] = useState<boolean>(true);
    const AddFile = () => {
      return <div></div>;
    };
    return (
      <div className={styles.stepsContainer}>
        <div
          className={styles.steppingContainer}
          onClick={() => {
            setStepOneOpen(!stepOneOpen);
          }}
        >
          <span className={styles.stepNumber}>1</span>

          <p className={styles.stepText}>Add your files</p>
          <span>
            <i className={stepOneOpen ? styles.downArrow : styles.upArrow}></i>
          </span>
        </div>

        {stepOneOpen && (
          <div className={styles.uploadBtnCont}>
            <label htmlFor="fileUpload">
              <div className={mediaPresenter.mediaReady() ? styles.clickedUploadBtn : styles.uploadBtn }>Upload media</div>
            </label>
            <input
              hidden
              multiple
              id="fileUpload"
              type="file"
              accept="video/* image/*"
              onChange={handleMediaUpload}
            />
          </div>
        )}
          {
            mediaPresenter.mediaReady() &&
        <div className={styles.uploadBtnCont}>
        <span className={styles.uploadBtn}><p>Continue</p></span>
        </div>
          }
        <div
          className={
            mediaPresenter.mediaReady()
              ? styles.steppingContainer
              : styles.disbContainer
          }
          onClick={() => {
            if (mediaPresenter.mediaReady()) {
                setStepTwoOpen(!stepTwoOpen);
            }
        }}
        >
          <div
            className={
              mediaPresenter.mediaReady()
                ? undefined
                : styles.disbSteppingContainer
            }
          >
            <span
              className={
                mediaPresenter.mediaReady()
                  ? styles.stepNumber
                  : styles.disbStepNumber
              }
            >
              2
            </span>
            <p
              className={
                mediaPresenter.mediaReady()
                  ? styles.stepText
                  : styles.disbStepText
              }
            >
              Customise your video
            </p>
            <span>
              <i
                className={
                  mediaPresenter.mediaReady()
                    ? stepTwoOpen ? styles.downArrow : styles.upArrow
                    : styles.disabledUpArrow
                }
              ></i>
            </span>
          </div>
        </div>
            {
                mediaPresenter.mediaReady() && stepTwoOpen &&
                (<Mood outputPresenter={outputPresenter} mediaPresenter={mediaPresenter}/>)
            }
      </div>
    );
  }
);
