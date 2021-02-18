import React, { useState } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { Container, Col, Row } from "react-bootstrap";
import { Toast } from "../Toast/Toast";
import { Dropbox } from "../Dropbox/Dropbox";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Steps } from "../Steps/Steps";
import styles from "./Modal.module.css";
import classnames from "classnames";
import { Previewer } from "../Previewer/Previewer";
import { SharedPage } from "../SharedPage/SharedPage";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import shuffle from "./ShuffleIcon.svg";

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
  modalOpen: boolean;
  closeModal: () => void;
};

/**
 * This Modal contains the steps, preview imported media
 * and the video player. It is also wrapped from react-bootstrap modal
 */

export const Modal: React.FC<Props> = observer(
  ({ mediaPresenter, outputPresenter, modalOpen, closeModal }) => {
    const [openPlayer, setOpenPlayer] = useState<boolean>(false);
    const [openSharePage, setOpenSharePage] = useState<boolean>(false);
    const windowModal = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      event.stopPropagation();
    };

    const openPlayerModal = () => {
      setOpenPlayer(true);
    };

    const closePlayerModal = () => {
      outputPresenter.pauseVideo();
      setOpenPlayer(false);
    };

    const openSharedPage = () => {
      outputPresenter.pauseVideo();
      setOpenSharePage(true);
    };

    const closeSharedPage = () => {
      setOpenSharePage(false);
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
          <Toast />
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <Row className={styles.leftModal}>
            <Col sm={4}>
              <Row className={styles.modalHeader}>
                {openSharePage ? (
                  <h2>
                    <ArrowBackIcon
                      onClick={closeSharedPage}
                      className={styles.backArrow}
                    />
                    Share
                  </h2>
                ) : (
                  <h2>Create a Video</h2>
                )}
              </Row>
              {openSharePage ? (
                <SharedPage />
              ) : (
                <Row className={styles.steps}>
                  {/* // TODO, I'm aware that Steps is quite bloated and will refctor in the future */}
                  {mediaPresenter.mediaReady && !openPlayer && (
                    <button
                      className={styles.shuffleBtn}
                      onClick={mediaPresenter.shuffleArray}
                    >
                      <img src={shuffle} alt="shuffle" /> Shuffle order
                    </button>
                  )}
                  <Steps
                    outputPresenter={outputPresenter}
                    mediaPresenter={mediaPresenter}
                    closePlayerModal={closePlayerModal}
                    openPlayerModal={openPlayerModal}
                    openSharedPage={openSharedPage}
                  />
                </Row>
              )}
            </Col>
            <Col className={styles.modalBody} sm={8}>
              {mediaPresenter.mediaReady ? (
                openPlayer ? (
                  <VideoPlayer
                    outputPresenter={outputPresenter}
                    mediaPresenter={mediaPresenter}
                    openSharePage={openSharePage}
                  />
                ) : (
                  <Previewer mediaPresenter={mediaPresenter} />
                )
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
