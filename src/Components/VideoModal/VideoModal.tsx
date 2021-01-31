import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Carousel } from "react-bootstrap";
import { VideoProgressBar } from "./VideoProgressBar";
import { templates } from "../Template";
import type { musicElement, trackEl, slotEl } from "../Template";
import styles from "./VideoModal.module.css";
import { MediaComponent } from "./MediaComponent";
import RotateLoader from "react-spinners/RotateLoader";
import { MediaPresenter } from "../MediaPresenter";
import { observer } from "mobx-react";
import ReactPlayer from "react-player";
import { VideoPlayer } from "./VideoPlayer";

type Props = {
  setShow: (show: boolean) => void;
  show: boolean;
  mediaPresenter: MediaPresenter;
};
export const VideoModal: React.FC<Props> = observer(
  ({ setShow, show, mediaPresenter }) => {
    const [currStyle, setCurrStyle] = useState<musicElement>(templates[0]);
    // the index of tracks
    const [trackIndex, setTrackIndex] = useState<number>(0);
    // this tells you what music its playing now
    // and what the slots for the music is
    const [currTrack, setCurrTrack] = useState<trackEl>(
      currStyle.tracks[trackIndex]
    );
    const [currSlot, setCurrSlot] = useState<slotEl>(currTrack.medium);
    const [musicLoaded, setMusicLoaded] = useState<boolean>(false);
    const [music, setMusic] = useState<HTMLAudioElement>(
      new Audio(currTrack.musicTrack)
    );

    useEffect(() => {
      music.addEventListener("canplaythrough", (event) => {
        setMusicLoaded(true);
        music.currentTime = currSlot.start;
      });
    }, []);

    useEffect(() => {
      setCurrTrack(currStyle.tracks[trackIndex]);
      music.addEventListener("canplaythrough", (event) => {
        setMusicLoaded(true);
      });
    }, [currStyle, trackIndex]);

    useEffect(() => {
      setMusic(new Audio(currTrack.musicTrack));
      setCurrSlot(currTrack.medium);
    }, [currTrack]);

    const resetVideo = (): void => {
      music.load();
      music.pause();
      setMusicLoaded(false);
    };
    const previousMusic = () => {
      resetVideo();
      if (trackIndex === 0) {
        setTrackIndex(currStyle.tracks.length - 1);
      } else {
        setTrackIndex(trackIndex - 1);
      }
    };

    const nextMusic = () => {
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
              <div className={styles.previousRound} onClick={previousMusic}>
                &#8249;
              </div>
              {musicLoaded ? (
                // whenever slot or music changes, videPlayer will re-render,
                // which resets the video
                <VideoPlayer
                  mediaPresenter={mediaPresenter}
                  slot={currSlot}
                  music={music}
                />
              ) : (
                <p>Creating video...</p>
              )}
              <div className={styles.nextRound} onClick={nextMusic}>
                &#8250;
              </div>
            </div>
            <span> Playing Music: {currTrack.musicName}</span>
            <br />
            <span> style: {currStyle.style}</span>
            <br />
            <span> tempo: {currSlot.length}</span>
            <br />
          </Container>
          <p>Moods: </p>
          {Object.values(templates).map((template) => {
            return (
              <Button
                key={template.style}
                variant="outline-dark"
                disabled={currStyle === template ? true : false}
                onClick={() => {
                  if (currStyle !== template) {
                    resetVideo();
                    setCurrStyle(template);
                    // setShuffledCounter(mediaPresenter.shuffleArray());
                    // how do you make sure it sticks with what user picked b4?

                    // uncomment this to set all tracks back to track #0
                    // setTrackIndex(0);
                  }
                }}
              >
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
            onClick={() => {
              if (currSlot.length !== "short") {
                setCurrSlot(currTrack.short);
                resetVideo();
              }
            }}
          >
            {" "}
            Short
          </Button>

          {currTrack.medium.slot.length <= mediaPresenter.filesLength ? (
            <Button
              key="Medium"
              variant="info"
              disabled={currSlot.length === "medium" ? true : false}
              onClick={() => {
                if (currSlot.length !== "medium") {
                  setCurrSlot(currTrack.medium);
                  resetVideo();
                }
              }}
            >
              Medium
            </Button>
          ) : null}

          {currTrack.medium.slot.length <= mediaPresenter.filesLength ||
          currTrack.long.slot.length <= mediaPresenter.filesLength ? (
            <Button
              key="Long"
              variant="info"
              disabled={currSlot.length === "long" ? true : false}
              onClick={() => {
                if (currSlot.length !== "long") {
                  setCurrSlot(currTrack.long);
                  resetVideo();
                }
              }}
            >
              Long
            </Button>
          ) : null}
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
