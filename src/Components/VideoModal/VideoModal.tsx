import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Media, VideoProgressBar, ImageWrapper, isImage, isVideo, audioSound } from "..";
import {templates} from '../utils';
import styles from "./VideoModal.module.css";
import ReactPlayer from "react-player";
import ReactAudioPlayer from 'react-audio-player';

let duration:number = 1000;
// let musicURL:string = "../../Audio/ocean/mp3";
let musicURL:string ="https://www.youtube.com/watch?v=-FKe4vQ4dME&list=RDLeV4u5Y-3ac&index=18";

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
      <ImageWrapper file={file} changeImage={onEnded} duration={duration}/>
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
  // incrementing index of media[]
  const changeImage = (): void => {
    // if files are not attached or if video is playing, do not change interval
    if (files == null) {
      return;
    }
    if (mediaCounter >= files.length - 1) {
      // clearing interval for media switching within the video
      setMediaCounter(files.length - 1);
    } else {
      // video ended
      setMediaCounter((mediaCounter) => mediaCounter + 1);
    }
  };
  const template1 = (): void  => {
    duration = 12000;
    console.log("template 1 - Calm");
    // musicURL
    setMediaCounter(0)
  }

  const template2 = (): void  => {
    duration = 3000;
    console.log("template 2 - upbeat");
    // musicURL
    setMediaCounter(0)
  }

  const template3 = (): void  => {
    duration = 1000;
    console.log("template 3 - Adventurous");
    //musicURL=
    setMediaCounter(0)
  }

  return (
    <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className={styles.renderMediaContainer}>
      <ReactAudioPlayer
        src={musicURL}
        autoPlay
        controls={true}
        
      />
        {/* file={shuffleArray(currentFile)} */}
        <MediaComponent file={currentFile} onEnded={changeImage} />
      </div>
          <VideoProgressBar totalVideoDuration={Math.round(totalVideoDuration/1000)} />
          {templates.map((template)=> {
            console.log(template.title);
            
            return (
            <Button key={template.title} variant="outline-dark" onClick={() => {
              duration = template.minDuration * 1000;
              console.log("template " + template.title);
              // musicURL
              setMediaCounter(0)
            }}>
            {template.title}
          </Button>)
          }
          )}
          {/* <Button variant="outline-dark" onClick={template1}>
          template 1: slow/calm
        </Button>
        <Button variant="outline-dark" onClick={template2}>
          template 2: upbeat
        </Button>
        <Button variant="outline-dark" onClick={template3}>
          template 3: Adventurous
        </Button> */}
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