import React, { useState } from "react";
import { useInterval } from "beautiful-react-hooks";
import { Button, Modal } from "react-bootstrap";
import { Media, VideoProgressBar, imageDuration } from "..";
import styles from "./VideoModal.module.css";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  medias: Media[];
  videoPlaying: boolean;
  totalVideoDuration: number;
};
export const VideoModal: React.FC<Props> = ({
  setShow,
  show,
  medias,
  videoPlaying,
  totalVideoDuration,
}) => {
  const [mediaCounter, setMediaCounter] = useState<number>(0);
  const changeImage: () => void = () => {
    console.log(mediaCounter);
    // if files are not attached or if video is playing, do not change interval
    if (videoPlaying || medias == null) {
      return;
    }
    if (mediaCounter >= medias.length - 1) {
      // clearing interval for media switching within the video
      setMediaCounter(medias.length - 1);
      clearInterval();
    } else {
      // video ended
      setMediaCounter((mediaCounter) => mediaCounter + 1);
    }
  };
  const [isCleared, clearInterval] = useInterval(changeImage, imageDuration);

  return (
    <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.renderMediaContainer}>
          {medias[mediaCounter]["element"]}
        </div>
        <VideoProgressBar totalVideoDuration={totalVideoDuration/1000} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button
          variant="info"
          onClick={() => {
            setShow(false);
          }}
        >
          Save Video
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
