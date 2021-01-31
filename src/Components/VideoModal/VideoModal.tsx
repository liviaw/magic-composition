import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Carousel } from "react-bootstrap";
import { VideoProgressBar } from "./VideoProgressBar";
import { templates } from "../Template";
import type { musicElement, templateEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
import { MediaComponent } from "./MediaComponent";
import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from 'mobx-react';
import ReactPlayer from "react-player";
import {VideoPlayer} from './VideoPlayer';

type Props = {
  setShow: (show: boolean) => void;
  show: boolean;
  mediaPresenter: MediaPresenter;
};
export const VideoModal: React.FC<Props> = observer(({
  setShow,
  show,
  mediaPresenter
}) => {

  // useEffect(() => {
  //   music.addEventListener("canplaythrough", (event) => {
  //     setMusicLoaded(true);
  //   });
  // }, []);
  const resetVideo = (): void => {
  }

  return (
    <Modal centered size="lg" show={show} onHide={() => {setShow(false);resetVideo();}}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VideoPlayer mediaPresenter={mediaPresenter}/>        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" 
          onClick={() => {
            resetVideo();
            setShow(false);
          }}>
          Close
        </Button>
        <Button
          variant="info"
          onClick={() => {
            resetVideo();
            setShow(false);
          }}
        >
          Save Video
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
