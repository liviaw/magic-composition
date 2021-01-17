import React, { useEffect, useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { VideoProgressBar } from "..";
import { templates, templateEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
import { shuffle } from "../utils";
import { MediaComponent } from "./MediaComponent";
import RotateLoader from "react-spinners/RotateLoader";
let duration: number = 1000;
// import templatesJson from '../../templates.json';

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  files: File[];
  oriDur: { [fileindex: number]: number };
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
  const [shuffledCounter, setShuffledCounter] = useState<number[]>(
    shuffle(files.length)
  );
  // const [seek, setSeek] = useState<boolean>(false);
  // const [played, setPlayed] = useState<number>(0);
  // default template is neutral, short
  const [defTemplate, setDefTemplate] = useState<templateEl>(
    templates["happy"]
  );
  const [music, setMusic] = useState<HTMLAudioElement>(
    new Audio(defTemplate.musicTrack)
  );
  const [musicLoaded, setMusicLoaded] = useState<boolean>(false);
  const [length, setLength] = useState<slotEl>(defTemplate.medium);
  useEffect(() => {
    music.addEventListener("canplaythrough", (event) => {
      setMusicLoaded(true);
    });
  }, []);

  // incrementing index of media[]
  const changeImage = (): void => {
    // if files are not attached or if video is playing, do not change interval
    if (files == null) {
      return;
    }
    if (mediaCounter >= files.length - 1) {
      // clearing interval for media switching within the video
      setMediaCounter(files.length - 1);
      music.pause();
      console.log("music paused");
    } else {
      // video ended
      setMediaCounter((mediaCounter) => mediaCounter + 1);
    }
  };

  console.log(music.currentSrc);
  music.play();
  console.log(music.readyState);

  return (
    <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState */}
        {musicLoaded ? (
          <Container fluid>
            <div className={styles.renderMediaContainer}>
              {/* file={shuffleArray(currentFile)} */}
              <MediaComponent
                file={files[shuffledCounter[mediaCounter]]}
                onEnded={changeImage}
                interval={length.slot[mediaCounter] * 1000}
              />
            </div>
            <VideoProgressBar
              totalVideoDuration={Math.round(length.slotLength)}
            />

            {Object.values(templates).map((template) => {
              // console.log(templates[template].title);
              return (
                <Button
                  key={template.title}
                  variant="outline-dark"
                  onClick={() => {
                    setDefTemplate(template);
                    setShuffledCounter(shuffle(files.length));
                    setMediaCounter(0);
                  }}
                >
                  {template.title}
                </Button>
              );
            })}
          </Container>
        ) : (
          // using the canva brand color
          <RotateLoader color="#00C4CC" />
        )}
        <Button
          key="Short"
          variant="light"
          onClick={() => {
            if (length.length !== "short") {
              setLength(defTemplate.short);
              setShuffledCounter(shuffle(files.length));
              setMediaCounter(0);
            }
          }}
        >
          Short
        </Button>
        <Button
          key="Medium"
          variant="light"
          onClick={() => {
            if (length.length !== "medium") {
              setLength(defTemplate.medium);
              setShuffledCounter(shuffle(files.length));
              setMediaCounter(0);
            }
          }}
        >
          Medium
        </Button>
        <Button
          key="long"
          variant="light"
          onClick={() => {
            if (length.length !== "long") {
              setLength(defTemplate.long);
              setShuffledCounter(shuffle(files.length));
              setMediaCounter(0);
            }
          }}
        >
          Long
        </Button>
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
