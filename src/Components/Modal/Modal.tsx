import React, { useState } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { Container, Col, Row } from "react-bootstrap";
import { ErrorToast } from "../ErrorToast/ErrorToast";
import { Dropbox } from "../Dropbox/Dropbox";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Steps } from "../Steps/Steps";
import styles from "./Modal.module.css";
import classnames from "classnames";

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
  modalOpen: boolean;
  closeModal: () => void;
};

export const Modal: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter, modalOpen, closeModal}) => {
    const [stepNumber, setStepNumber] = useState<number>(1);
    const windowModal = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      event.stopPropagation();
    };
    return (
      <div
        className={classnames(styles.modal, { [styles.open]: modalOpen })}
        onClick={closeModal}
      >
        <Container
          fluid="sm"
          className={styles.modalContent}
          onClick={windowModal}
        >
          <ErrorToast />
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <Row className={styles.leftModal}>
            <Col sm={4}>
              <Row className={styles.modalHeader}>
                <h2>Create a Video</h2>
              </Row>
              <Row className={styles.steps}>
                <Steps
                  outputPresenter={outputPresenter}
                  stepNumber={stepNumber}
                  mediaPresenter={mediaPresenter}
                />
              </Row>
            </Col>
            <Col className={styles.modalBody} sm={8}>
              {mediaPresenter.mediaReady() ? (
                <VideoPlayer outputPresenter={outputPresenter} mediaPresenter={mediaPresenter} />
              ) : (
                <Dropbox mediaPresenter={mediaPresenter} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
