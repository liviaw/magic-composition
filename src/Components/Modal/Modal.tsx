import React from "react";
import { observer } from "mobx-react";
import { Button, Container, Col, Row } from "react-bootstrap";
import styles from "./Modal.module.css";
import type { MediaPresenter } from "../MediaPresenter";

type Props = {
  mediaPresenter: MediaPresenter;
};

export const Modal: React.FC<Props> = observer(({ mediaPresenter }) => {
  const openModal = (): void => {
    var modal: HTMLElement | null = document.getElementById("magicModal");
    if (modal != null) {
      modal.style.display = "block";
    }
  };
  const closeModal = (): void => {
    var modal: HTMLElement | null = document.getElementById("magicModal");
    if (modal != null) {
      modal.style.display = "none";
    }
  };
  const windowCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    var modal: HTMLElement | null = document.getElementById("magicModal");
    if (event.target === modal && modal != null) {
      modal.style.display = "none";
    }
  };
  return (
    <div>
      <Button
        variant="info"
        className={styles.createDesignBtn}
        onClick={openModal}
      >
        Create a design
      </Button>

      <div
        id="magicModal"
        className={styles.modal}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          windowCloseModal(event);
        }}
      >
        <Container fluid="sm" className={styles.modalContent}>
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <Row className={styles.leftModal}>
            <Col sm={4}>
              <Row className={styles.modalHeader}>
                <h2>Create a Video</h2>
              </Row>
              <Row className={styles.steps}>steps</Row>
            </Col>
            <Col className={styles.modalBody} sm={8}>
              {mediaPresenter.filesLength === 0 ? (
                <div>show drop box</div>
              ) : (
                <div>show player</div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
