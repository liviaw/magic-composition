import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { ErrorToast } from "../ErrorToast/ErrorToast";
import type { MediaPresenter } from "../MediaPresenter";
import styles from "./Modal.module.css";
import classnames from "classnames";
type Props = {
  mediaPresenter: MediaPresenter;
};

export const Modal: React.FC<Props> = observer(({ mediaPresenter }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = (): void => {
    setModalOpen(true);
  };
  const closeModal = (): void => {
    var modal: HTMLElement | null = document.getElementById("magicModal");
    if (modal != null) {
      // modal.style.display = "none";
      setModalOpen(false);
    }
  };
  const windowCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    var modal: HTMLElement | null = document.getElementById("magicModal");
    if (event.target === modal && modal != null) {
      // modal.style.display = "none";
      setModalOpen(false);
    }
  };
  return (
    <div>
      <Button
        variant="info"
        onClick={openModal}
        className={styles.createDesignBtn}
      >
        Create a design
      </Button>

      <div
        id="magicModal"
        // className={modalOpen? styles.modalOpen : styles.modalClose }
        className={classnames(styles.modal, { [styles.open]: modalOpen })}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          windowCloseModal(event);
        }}
      >
        <Container fluid="sm" className={styles.modalContent}>
          <ErrorToast />
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <Row className={styles.leftModal}>
            <Col sm={4}>
              <Row className={styles.modalHeader}>
                <h3>Create a Video</h3>
              </Row>
              <Row className={styles.steps}></Row>
            </Col>
            <Col className={styles.modalBody} sm={8}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
