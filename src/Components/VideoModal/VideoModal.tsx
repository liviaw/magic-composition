import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Modal } from "react-bootstrap";
import RotateLoader from "react-spinners/RotateLoader";
import { Media, VideoProgressBar, imageDuration, isImage } from "..";
import styles from "./VideoModal.module.css";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  files: File[];
};
export const VideoModal: React.FC<Props> = ({
  setShow,
  show,
  files,
}) => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaCounter, setMediaCounter] = useState<number>(0);
  const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);

  useEffect(() => {
    console.log("hello");
    initMediaElements(files);
  }, [files])
  const addMedia = () => {
    setMediaReady(m => m + 1);
  }
  const changeImage = ():void => {
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

const addDuration: (extraDuration: number) => void = (extraDuration: number) => {
  setTotalVideoDuration(oldDur => oldDur + extraDuration);
};
const initMediaElements: ( files: File[]) => void = (
  files,
) => {
  if (files == null) {
    return;
  }
  const newMedias:Media[] = [];
  files.forEach((file) =>{
    if (isImage(file)) {
      const newDuration: {[filename:string]:boolean} = {[file.name]:false};
      let el: JSX.Element = (
        <img
          className={styles.renderMedia}
          src={URL.createObjectURL(file)}
          onLoad={() => {
            if (newDuration[file.name] === false) {
              addMedia();
              addDuration(imageDuration);
              // set duration state as true so that it will not reset it again
              newDuration[file.name] = true;
            }
          }}
          alt={file.name}
        />
      );
      let newMedia = new Media(file.name, "image", el);
      newMedias.push(newMedia);
    } else {
      const newDuration: {[filename:string]:boolean} = {[file.name]:false};
      let el: JSX.Element = (
        <ReactPlayer
          url={URL.createObjectURL(file)}
          width="100%"
          height="50%"
          playing={true}
          onError={() => alert(file + " is unable to play")}
          id={file.name}
          volume={0}
          onReady={addMedia}
          onEnded={changeImage}
          onDuration={(duration) => {
            console.log("duration is " + duration);
            if (newDuration[file.name] === false) {
              addDuration(duration * 1000);
              // set durationState as true
              newDuration[file.name] = true;
            }
          }}
        />
      );
      let newMedia = new Media(file.name, "video", el);
      newMedias.push(newMedia);
    } 
  });
  setMedias(newMedias);
};

  return (
    <div>
    {show ? (<Modal centered size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Here is your Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {mediaReady}
        {medias.length }
        <div className={styles.renderMediaContainer}>
            {medias[0]["element"]}
          </div> 
          {/* if not ready, show spinner, then store files in elements */}
          {/* {mediaReady === medias.length ?
          <div className={styles.renderMediaContainer}>
            {medias[mediaCounter]["element"]}
          </div> : <RotateLoader color="#00C4CC"/>
          } */}
          
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
      ) : null
    }
    </div>
  );
};
