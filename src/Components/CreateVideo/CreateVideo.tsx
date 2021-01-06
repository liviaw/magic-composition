

import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from 'beautiful-react-hooks'; 
import { Button, Modal } from 'react-bootstrap';
import styles from './CreateVideo.module.css';
import VideoProgressBar from './VideoProgressBar';
import ReactPlayer, { SourceProps } from 'react-player/lazy';

function useInterval(callback:any, delay:number, finished: boolean) {

    const savedCallback = useRef<any>(null);
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
    function tick() {
        savedCallback.current();
    }
    let id:NodeJS.Timeout;
      if (delay !== null) {
        id = setInterval(tick, delay);
        if (finished) {
          clearInterval(id);
        }
        return () => clearInterval(id);
      }
    }, [delay]);
}
type Props = {
    files:File[];
    show: boolean;
    handleClose: () => void;
    handleShow: () => void;
};
  
const CreateVideo: React.FC<Props> = ({
    files,
    show,
    handleClose,
    handleShow
  }) => {
    const [medias, setMedias] = useState<JSX.Element[]>([]);
    const [mediaCounter, setMediaCounter] = useState<number>(0);
    const [duration, setDuration] = useState(2000);
    // const [delay, setDelay] = useState(true);
    const [progress, setProgress] = useState<number>(0);
    
    useEffect(()=> {
        ShowMedia();
        // setInterval(changeImage, 5000); 
    
      }, [files])
    const changeImage = () => {
        console.log("===mediacounter===");
        console.log(mediaCounter);
        // let temp = mediaCounter + 1;
        // console.log(temp);
        // setMediaCounter(temp);
        if (files == null) {
            console.log("files empty");
            return;
        }
        
        if (mediaCounter >= files.length) {
            setProgress(100);
            console.log("interval cleared");
        } else {
            setProgress(progress + 10);
            setMediaCounter(mediaCounter + 1);
        }
    }
    useInterval(changeImage, 2000, mediaCounter>=files.length);


    const ShowMedia:() => JSX.Element | JSX.Element[]  = () => {
        const mediasTemp:JSX.Element[] = []
        if (files == null) {
            console.log("pls wrk");
            return <></>
        }
        let imageFormat = new RegExp('image/*');
        let videoFormat = new RegExp('video/*');
        for (let i = 0; i < files.length; i++) {
            if (imageFormat.test(files[i].type)) {
            mediasTemp.push(<img className={styles.renderMedia} src={URL.createObjectURL(files[i])}/>)
            }
            else if (videoFormat.test(files[i].type)) {
            // onEnded={changeImage}
            mediasTemp.push(<ReactPlayer url={URL.createObjectURL(files[i])} width="100%" height="50%" playing={true} />)
            }
        }
        setMedias(mediasTemp);
        return mediasTemp;
    }
      
    return(
        <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            some text here
            <div className={styles.renderMediaContainer}>

                {medias[mediaCounter]}
            </div>
            <VideoProgressBar file={files[mediaCounter]} progress={progress}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleClose}>
            Save Video
          </Button>
        </Modal.Footer>
      </Modal>

    );
};

export default CreateVideo;