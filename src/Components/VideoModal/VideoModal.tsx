import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Media, VideoProgressBar, imageDuration, ImageWrapper, isImage, isVideo, audioSound } from "..";
import styles from "./VideoModal.module.css";
import ReactPlayer from "react-player";
import RotateLoader from "react-spinners/RotateLoader";

type MediaProps = {
  file: File;
  onEnded: () => void;
};
const MediaComponent: React.FC<MediaProps> = ({
  file,
  onEnded
}) => {
  if (isImage(file)) {
    return (
      <ImageWrapper key={file.name} file={file} changeImage={onEnded} />
    );
  } else if (isVideo(file)) {
    return (
      <ReactPlayer
        url={URL.createObjectURL(file)}
        width="100%"
        height="50%"
        playing={true}
        onError={() => alert(file + " is unable to play")}
        id={file.name}
        volume={Math.random() * audioSound}
        onEnded={onEnded}
      />
    );
  }
  return null;
};

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  files: File[];
  oriDur: {[fileindex: number]: number};
  totalVideoDuration: number;
};
export const VideoModal: React.FC<Props> = ({
  setShow,
  show,
  files,
  oriDur,
  totalVideoDuration,
}) => {
  const [mediaCounter, setMediaCounter] = useState<number>(0);
  const currentFile = files[mediaCounter];

  return (
    <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MediaComponent file={currentFile} onEnded={() => setMediaCounter((old) => old + 1)} />
          <VideoProgressBar totalVideoDuration={Math.round(totalVideoDuration/1000)} />
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