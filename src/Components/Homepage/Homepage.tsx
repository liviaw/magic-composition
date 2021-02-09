import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Homepage.module.css";

type Props = {
  openModal: () => void;
};

export const Homepage: React.FC<Props> = ({ openModal }) => {
  return (
    <div className={styles.CanvaHomePage}>
      <Button
        variant="info"
        onClick={openModal}
        className={styles.createDesignBtn}
      >
        Create a design
      </Button>
    </div>
  );
};