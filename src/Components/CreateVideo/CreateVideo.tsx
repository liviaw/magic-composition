import React, { useState } from 'react';
import { useInterval } from 'beautiful-react-hooks'; 
import { Button, Modal } from 'react-bootstrap';
import {Media} from '../';
import styles from './CreateVideo.module.css';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show:boolean;
    medias: Media[];
}
export const CreateVideo: React.FC<Props> = ({
    setShow,
    show,
    medias
}) => {
    const [mediaCounter, setMediaCounter] = useState<number>(0);
    const [imageDuration, setImageDuration] = useState<number>(5000);
    const changeImage: () => void = () => {
      console.log(mediaCounter);
      if ( medias == null) {
          return;
      }
      if (mediaCounter >= medias.length) {
          // setProgress(100);
          clearInterval();
          console.log("interval cleared");
      } else {
          console.log("videoended");
          // setProgress(progress + 10);
          setMediaCounter(mediaCounter + 1);
      }
    }
    // const [isCleared, clearInterval] = useInterval(changeImage, imageDuration);
    console.log(medias[mediaCounter]);
    console.log(mediaCounter);
    return(
        <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            some text here
            {/* {videoReady === videosNum + imagesNum ? <LoadingPage/> : <></>} */}
            <div className={styles.renderMediaContainer}>
              {medias.map((media: Media, index: number) => {
                console.log("run");
                return(
                  medias[0]["element"]
                )})
              }
              {/* {medias[0]["element"]}  */}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="info" onClick={() => {setShow(false)}}>
            Save Video
          </Button>
        </Modal.Footer>
      </Modal>
    )
}