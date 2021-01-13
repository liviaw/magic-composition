import React, { useState, useEffect } from "react";
import { showError, isImage, isVideo, imageDuration } from "..";
import styles from "./MediaWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
  addMedia: () => void;
};
export const VideoWrapper: React.FC<Props> = ({
  file,
  changeImage,
  addMedia,
}) => {
  return (<div></div>)
}