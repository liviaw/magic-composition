import React, { useState } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../MediaPresenter";
import { Button, Container, Col, Row } from "react-bootstrap";
import { ErrorToast } from "../ErrorToast/ErrorToast";
import styles from "./Modal.module.css";
import classnames from "classnames";
type Props = {
  mediaPresenter: MediaPresenter;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

export const Modal: React.FC<Props> = observer(
  ({ mediaPresenter, modalOpen, setModalOpen }) => {
    const closeModal = (): void => {
      setModalOpen(false);
    };
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
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            windowModal(event);
          }}
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
              <Row className={styles.steps}></Row>
            </Col>
            <Col className={styles.modalBody} sm={8}></Col>
          </Row>
        </Container>
      </div>
    );
  }
);
