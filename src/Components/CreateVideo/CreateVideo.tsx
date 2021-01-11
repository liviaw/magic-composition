import React, { useState } from "react";
import { useInterval } from "beautiful-react-hooks";
import { Button, Modal } from "react-bootstrap";
import { Media } from "../";
import styles from "./CreateVideo.module.css";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  medias: Media[];
};
export const CreateVideo: React.FC<Props> = ({ setShow, show, medias }) => {
  const [mediaCounter, setMediaCounter] = useState<number>(0);
  const [imageDuration, setImageDuration] = useState<number>(5000);
  const changeImage: () => void = () => {
    if (medias == null) {
      return;
    }
    if (mediaCounter >= medias.length) {
      // clearing interval for media switching within the video
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
