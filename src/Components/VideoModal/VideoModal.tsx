import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Media, VideoProgressBar, imageDuration, ImageWrapper, isImage, audioSound } from "..";
import styles from "./VideoModal.module.css";
import ReactPlayer from "react-player";

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
  const [mediaReady, setMediaReady] = useState<number>(0);
  const [medias, setMedias] = useState<Media[]>([]);
  const addMedia = () => {
    setMediaReady((m) => m + 1);
  };
  const changeImage: () => void = () => {
    console.log(mediaCounter);
    // if files are not attached or if video is playing, do not change interval
    if (files == null) {
      return;
    }
    if (mediaCounter >= files.length - 1) {
      // clearing interval for media switching within the video
      setMediaCounter(files.length - 1);
      clearInterval();
    } else {
      // video ended
      setMediaCounter((mediaCounter) => mediaCounter + 1);
    }
  };
  const initMediaElements = (): void => {
    if (files == null) {
      return;
    }
    const newMedias: Media[] = [];
    files.forEach((file) => {
      if (isImage(file)) {
        const newDuration: { [filename: string]: boolean } = {
          [file.name]: false,
        };
        let el: JSX.Element = (
          <ImageWrapper file={file} changeImage={changeImage} addMedia={addMedia}/>
        );
        let newMedia = new Media(file.name, "image", el);
        newMedias.push(newMedia);
      } else {
        const newDuration: { [filename: string]: boolean } = {
          [file.name]: false,
        };
        let el: JSX.Element = (
          <ReactPlayer
            url={URL.createObjectURL(file)}
            width="100%"
            height="50%"
            playing={true}
            onError={() => alert(file + " is unable to play")}
            id={file.name}
            volume={Math.random() * audioSound}
            onEnded={changeImage}
          />
        );
        let newMedia = new Media(file.name, "video", el);
        newMedias.push(newMedia);
      }
    });
    setMedias(newMedias);
  };

  return (
    <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className={styles.renderMediaContainer}>
          {medias[mediaCounter].element}
        </div> */}
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
