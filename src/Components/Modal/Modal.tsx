import React, { useState } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { Container, Col, Row } from "react-bootstrap";
import { ErrorToast } from "../ErrorToast/ErrorToast";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import styles from "./Modal.module.css";
import classnames from "classnames";

type Props = {
  mediaPresenter: MediaPresenter;
  modalOpen: boolean;
  closeModal: () => void;
  outputPresenter: OutputPresenter;
};

export const Modal: React.FC<Props> = observer(
  ({ mediaPresenter, modalOpen, closeModal, outputPresenter}) => {
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
                <h3>Create a Video</h3>
              </Row>
              <Row className={styles.steps}>
              <Steps
                  outputPresenter={outputPresenter}
                  mediaPresenter={mediaPresenter}
                  closePlayerModal={closePlayerModal}
                  openPlayerModal={openPlayerModal}
                />
              </Row>
            </Col>
            <Col className={styles.modalBody} sm={8}>
            {mediaPresenter.mediaReady && <VideoPlayer outputPresenter={outputPresenter} mediaPresenter={mediaPresenter}/>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
