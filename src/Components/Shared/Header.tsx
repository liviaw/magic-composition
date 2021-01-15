import React, { useState } from "react";
import styles from "./shared.module.css";
import canvalogo from "../../Media/canvalogo.png";

export const Header: React.FC = () => (
  <div className={styles.header}>
    <img className={styles.canvalogo} src={canvalogo} alt="Canva Logo" />
    <p className={styles.heading}>Canva Magic Composition</p>
  </div>
);
