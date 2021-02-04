import React, { useEffect, useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
// import { VideoProgressBar } from "./VideoProgressBar";
import { templates } from "../Template";
import type { musicElement, trackEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
// import { MediaComponent } from "./MediaComponent";
// import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from "mobx-react";
// import ReactPlayer from "react-player";
import { VideoPlayer } from "./VideoPlayer";
import shuffleButton from "./shuffleButton.png";


type Props = {
  setShow: (show: boolean) => void;
  show: boolean;
  mediaPresenter: MediaPresenter;
};
export const VideoModal: React.FC<Props> = observer(
  ({ setShow, show, mediaPresenter }) => {
    const [currStyleIndex, setCurrStyleIndex] = useState<number>(0);
    const [currStyle, setCurrStyle] = useState<musicElement>(templates[0]);
    // the index of tracks
    const [trackIndex, setTrackIndex] = useState<number>(0);
    // this tells you what music its playing now
    // and what the slots for the music is
    const [currTrack, setCurrTrack] = useState<trackEl>(
      currStyle.tracks[trackIndex]
    );
    const [currSlot, setCurrSlot] = useState<slotEl>(currTrack.short);
    const [musicLoaded, setMusicLoaded] = useState<boolean>(false);
    const [music, setMusic] = useState<HTMLAudioElement>(
      new Audio(currTrack.musicTrack)
    );

    useEffect(() => {
      mediaPresenter.initTemplates(templates.length);
    }, [mediaPresenter]);

    // useEffect(() => {
    //   mediaPresenter.initTemplates(templates.length);
    //   music.addEventListener("canplaythrough", (event) => {
    //     setMusicLoaded(true);
    //     console.log("init music");
    //   });
    // }, []);

    useEffect(() => {
      setCurrTrack(currStyle.tracks[trackIndex]);
      music.currentTime=currSlot.start;
      music.addEventListener("canplaythrough", (event) => {
        if (music.readyState >= 3){
          setMusicLoaded(true);
        }
      });
    }, [currStyle, trackIndex, music, music.readyState, currSlot.start]);

    useEffect(() => {
      setMusic(new Audio(currTrack.musicTrack));
      // we can make it same as before, don't always go back to medium
      setCurrSlot(currTrack.short);
    }, [currTrack]);

    const resetVideo = (): void => {
      music.load();
      // music.pause();
      setMusicLoaded(false);
    };
    const previousMusic = () => {
      if (currStyle.tracks.length === 1) {
        return;
      }
      resetVideo();
      if (trackIndex === 0) {
        setTrackIndex(currStyle.tracks.length - 1);
      } else {
        setTrackIndex(trackIndex - 1);
      }
    };

    const nextMusic = () => {
      if (currStyle.tracks.length === 1) {
        return;
      }
      resetVideo();
      if (trackIndex === currStyle.tracks.length - 1) {
        setTrackIndex(0);
      } else {
        setTrackIndex(trackIndex + 1);
      }
    };

    return (
      <Modal
        centered
        size="xl"
        show={show}
        onHide={() => {
          setShow(false);
          resetVideo();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Here is your Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className={styles.frame}>
              <div
                className={
                  currStyle.tracks.length <= 1
                  ? styles.disabledPreviousRound
                  : styles.previousRound
                }
                onClick={previousMusic}
              >
                &#8249;
              </div>
              {musicLoaded ? (
                // whenever slot or music changes, videPlayer will re-render,
                // which resets the video
                <VideoPlayer
                mediaPresenter={mediaPresenter}
                slot={currSlot}
                music={music}
                styleIndex={currStyleIndex}
                />
                ) : (
                  <p>Creating video...</p>
                  )}
              <div
                className={
                  currStyle.tracks.length <= 1
                  ? styles.disabledNextRound
                  : styles.nextRound
                }
                onClick={nextMusic}
              >
                &#8250;
              </div>
                <img
                  className={styles.shuffleButton}
                  onClick={() => {
                    resetVideo();
                    mediaPresenter.resetSeed(currStyleIndex);
                    music.pause();
                  }}
                  src={shuffleButton}
                  alt="shuffle button"
                />
            </div>
                  

            <span> Playing Music: {currTrack.musicName}</span>
            <br />
            <span> style: {currStyle.style}</span>
            <br />
            <span> tempo: {currSlot.length}</span>
            <br />
          </Container>
          <p>Moods: </p>
          {Object.values(templates).map((template, index) => {
            return (
              <Button
                key={template.style}
                variant="outline-dark"
                disabled={currStyle === template ? true : false}
                className={styles.tooltip}
                onClick={() => {
                  if (currStyle !== template) {
                    resetVideo();
                    setCurrStyle(template);
                    setCurrStyleIndex(index);
                    // how do you make sure it sticks with what user picked b4?

                    // uncomment this to set all tracks back to track #0
                    // setTrackIndex(0);
                  }
                }}
              >
                {currStyle === template ? <span className={styles.tooltiptext}>Currently Playing {template.style}</span>:null}
                {template.style}
              </Button>
            );
          })}
          <br />
          <br />
          <p>Lengths: </p>

          <Button
            key="Short"
            variant="info"
            disabled={currSlot.length === "short" ? true : false}
            className={styles.tooltip}
            onClick={() => {
              if (currSlot.length !== "short") {
                setCurrSlot(currTrack.short);
                resetVideo();
              }
            }}
          >
            {currSlot.length === "short" ? <span className={styles.tooltiptext}>Currently Playing Short</span>:null}
            {"Short"}
          </Button>


          {currTrack.medium.slot.length <= mediaPresenter.filesLength * 1.5 && (
            <Button
              key="Medium"
              variant="info"
              disabled={currSlot.length === "medium" ? true : false}
              className={styles.tooltip}
              onClick={() => {
                if (currSlot.length !== "medium") {
                  setCurrSlot(currTrack.medium);
                  resetVideo();
                }
              }}
            >
              {currSlot.length === "medium" ? <span className={styles.tooltiptext}>Currently Playing Medium</span>:null}
              {"Medium"}
            </Button>
          )}

          {currTrack.medium.slot.length <= mediaPresenter.filesLength * 1.5 &&
          currTrack.long.slot.length <= mediaPresenter.filesLength * 1.5 && (
            <Button
              key="Long"
              variant="info"
              className={styles.tooltip}
              disabled={currSlot.length === "long" ? true : false}
              onClick={() => {
                if (currSlot.length !== "long") {
                  setCurrSlot(currTrack.long);
                  resetVideo();
                }
              }}
            >
              {currSlot.length === "long" ? <span className={styles.tooltiptext}>Currently Playing Long</span>:null}
              {"Long"}
            </Button>
          ) }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              resetVideo();
              setShow(false);
            }}
          >
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
  }
);
