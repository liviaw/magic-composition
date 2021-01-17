import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Media, VideoProgressBar, ImageWrapper, isImage, isVideo, audioSound } from "..";
import {templates} from '../utils';
import styles from "./VideoModal.module.css";
import ReactAudioPlayer from 'react-audio-player';
import {MediaComponent} from './MediaComponent';
import ReactPlayer from "react-player";
let duration:number = 1000;
// let musicURL:string = "../../Audio/ocean/mp3";
let musicURL:string ="https://www.youtube.com/watch?v=-FKe4vQ4dME&list=RDLeV4u5Y-3ac&index=18";

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
  const [seek, setSeek] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);

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