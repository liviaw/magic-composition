import React, { useState } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../MediaPresenter";
import { Container, Col, Row } from "react-bootstrap";
import { ErrorToast } from "../ErrorToast/ErrorToast";
import styles from "./Modal.module.css";
import classnames from "classnames";
type Props = {
  mediaPresenter: MediaPresenter;
  modalOpen: boolean;
  closeModal: () => void;
};

export const Modal: React.FC<Props> = observer(
  ({ mediaPresenter, modalOpen, closeModal}) => {
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
              </Row>
            </Col>
            <Col className={styles.modalBody} sm={8}>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
