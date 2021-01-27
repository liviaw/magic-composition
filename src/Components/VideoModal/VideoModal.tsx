import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Carousel } from "react-bootstrap";
import { VideoProgressBar } from "./VideoProgressBar";
import { templates, templateEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
import { MediaComponent } from "./MediaComponent";
import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";

type Props = {
  setShow: (show: boolean) => void;
  show: boolean;
  mediaPresenter: MediaPresenter;
};
export const VideoModal: React.FC<Props> = ({
  setShow,
  show,
  mediaPresenter
}) => {
  const [mediaCounter, setMediaCounter] = useState<number>(0);
  const [shuffledCounter, setShuffledCounter] = useState<number[]>(
    mediaPresenter.shuffleArray()
  );
  // default template is neutral, short
  const [currTemplate, setCurrTemplate] = useState<templateEl>(
    templates.neutral
  );
  const [music, setMusic] = useState<HTMLAudioElement>(
    new Audio(currTemplate.musicTrack)
  );
  const [musicLoaded, setMusicLoaded] = useState<boolean>(false);
  const [length, setLength] = useState<slotEl>(currTemplate.medium);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    music.addEventListener("canplaythrough", (event) => {
      setMusicLoaded(true);
    });
  }, []);

  // incrementing index of media[]
  const changeImage = (): void => {
    // if files are not attached or if video is playing, do not change interval
    if (mediaPresenter.getFiles() === []) {
      return;
    }
    // if () {
    //   // too many media or too little slots
    // } else 
    let filesLen = mediaPresenter.getFilesLength();
    if (music.ended) {
      // should never go here? Because I set up the templates to be short or equal to music lengtj
      setMediaCounter(filesLen- 1);
      console.log("music has ended");
    } else if (length.slot.length < mediaCounter) {
      setMediaCounter(filesLen  - 1);
      console.log("too many media or too little slots");
      music.pause();
    } else if (mediaCounter >= filesLen  - 1 ) {
      console.log("not enough media");
      // if(length.length === "long") {
      //   setMediaCounter(0);
      // } else {
        // clearing interval for media switching within the video
        setMediaCounter(filesLen - 1);
        music.pause();
      // }
    } else {
      // video ended
      setMediaCounter((mediaCounter) => mediaCounter + 1);
    }
  };

  const getTotalDur = (): number => {
    let totalDuration:number = 0;
    let files = mediaPresenter.getFiles();
    for (let i = 0; i < Math.min(mediaPresenter.getFilesLength(),length.slot.length); i++) {
      if(MediaPresenter.isImage(files[shuffledCounter[i]])) {
        totalDuration = totalDuration + length.slot[i];
      } else {
        totalDuration = totalDuration + Math.min(mediaPresenter.getDuration(shuffledCounter[i]),length.slot[i]);
      }
    }
    console.log("total duration is " + totalDuration);
    return Math.round(totalDuration);
  }

  const resetVideo = (): void => {
    music.load();
    music.pause();
    setMediaCounter(0);
  }

  music.play();
  console.log(music.readyState);
  console.log("shuffled arrays is");
  console.log(shuffledCounter);

  return (
    <Modal centered size="lg" show={show} onHide={() => {setShow(false);resetVideo();}}>
      <Modal.Header closeButton>
        <Modal.Title>Here is your Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Carousel>
        {musicLoaded ? (
          <Container fluid>
            <div className={styles.renderMediaContainer}>
              {/* file={shuffleArray(currentFile)} */}
              <MediaComponent
                file={mediaPresenter.getFile(shuffledCounter[mediaCounter])}
                onEnded={changeImage}
                interval={length.slot[mediaCounter]}
                mediaDur={mediaPresenter.getDuration(shuffledCounter[mediaCounter])}
              />
            </div>
            
            <VideoProgressBar
              totalVideoDuration={getTotalDur()}
            />
            <span> Playing Music: {currTemplate.musicName}</span>
            <br/>
            <span> style: {currTemplate.title}</span>
            <br/>
            <span> tempo: {length.length}</span>
            <br/>

            {Object.values(templates).map((template) => {
              return (
                <Button
                  key={template.title}
                  variant="outline-dark"
                  onClick={() => {
                    console.log("template "+ template.title + " is clicked!");
                    resetVideo();
                    setCurrTemplate(template);
                    setMusic(new Audio(template.musicTrack));
                    setShuffledCounter(mediaPresenter.shuffleArray());
                    // how do you make sure it sticks with what user picked b4?
                    setLength(template.medium);
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
          variant="info"
          onClick={() => {
            if (length.length !== "short") {
              setLength(currTemplate.short);
              setShuffledCounter(mediaPresenter.shuffleArray());
              setMediaCounter(0);
              music.load();
            }
          }}
        >
          Short
        </Button>
        <Button
          key="Medium"
          variant="info"
          onClick={() => {
            if (length.length !== "medium") {
              setLength(currTemplate.medium);
              setShuffledCounter(mediaPresenter.shuffleArray());
              setMediaCounter(0);
              music.load();
            }
          }}
        >
          Medium
        </Button>
        <Button
          key="long"
          variant="info"
          onClick={() => {
            if (length.length !== "long") {
              setLength(currTemplate.long);
              setShuffledCounter(mediaPresenter.shuffleArray());
              setMediaCounter(0);
              music.load();
            }
          }}
        >
          Long
        </Button>
        </Carousel>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-dark" 
          onClick={() => {
            resetVideo();
            setShow(false);
          }
          }>
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
};
