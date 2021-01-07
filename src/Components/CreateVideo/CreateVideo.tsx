

import React, { useState, useEffect } from 'react';
import { useInterval } from 'beautiful-react-hooks'; 
import { Button, Modal } from 'react-bootstrap';
import styles from './CreateVideo.module.css';
import VideoProgressBar from './VideoProgressBar';
import ReactPlayer from 'react-player/lazy';
// import { Player, ControlBar } from 'video-react';
// import { Slider, Direction } from 'react-player-controls';
// import {getVideoDurationInSeconds} from 'get-video-duration';

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
    const [imageDuration, setImageDuration] = useState<number>(2000);
    // const [progress, setProgress] = useState<number>(0);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    const [videosNum, setVideosNum] = useState<number>(0);
    const [imagesNum, setImagesNum] = useState<number>(0);
    const [totalVideoDuration, setTotalVideoDuration] = useState<number>(0);
    const [player, setPlayer] = useState(null);
    const changeImage: () => void = () => {
        console.log(mediaCounter);
        if (videoPlaying || files == null) {
            return;
        }
        if (mediaCounter >= files.length) {
            // setProgress(100);
            clearInterval();
            console.log("interval cleared");
        } else {
            console.log("videoended");
            // setProgress(progress + 10);
            setMediaCounter(mediaCounter + 1);
        }
    }
    const [isCleared, clearInterval] = useInterval(changeImage, imageDuration);
    
    useEffect(()=> {
        ShowMedia();
      }, [files])
    // function setFileInfo(file) {
    //     var video = document.createElement('video');
    //     video.preload = 'metadata';
    //     video.src = URL.createObjectURL(file);
    //     window.URL.revokeObjectURL(video.src);
    //     return video.duration;
      
        
    //   }
    const ShowMedia:() => JSX.Element | JSX.Element[]  = () => {
        const mediasTemp:JSX.Element[] = []
        if (files == null) {
            return <></>
        }
        let imageFormat = new RegExp('image/*');
        let videoFormat = new RegExp('video/*');
        for (let i = 0; i < files.length; i++) {
            if (imageFormat.test(files[i].type)) {
                setImagesNum(imagesNum + 1);
                mediasTemp.push(<img className={styles.renderMedia} src={URL.createObjectURL(files[i])}/>)
            }
            else if (videoFormat.test(files[i].type)) {
                setVideosNum(videosNum + 1);
                let video = new Audio(URL.createObjectURL(files[i]));
                // let video = document.createElement('video');
                video.preload = 'metadata';
                // video.src = URL.createObjectURL(files[i]);
                window.URL.revokeObjectURL(video.src);
                setTotalVideoDuration(totalVideoDuration + video.duration);
                console.log("vid dur is "+ video.duration);
                mediasTemp.push(<ReactPlayer 
                    url={URL.createObjectURL(files[i])} 
                    width="100%" height="50%" 
                    playing={true} 
                    onStart = {() => setVideoPlaying(true)} 
                    onEnded={() => setVideoPlaying(false)} 
                    onError={()=> alert(files[i] + " is unable to play")}
                    id={files[i].name}
                    // onDuration={(duration) => {
                    //     console.log("duration= "+duration);
                    //     setTotalVideoDuration(totalVideoDuration + duration)}
                    // }
                />)
                // getVideoDurationInSeconds('../../../Media/video2.mp4').then((duration:number) => {
                //     setTotalVideoDuration(totalVideoDuration + duration);
                // });

            }
        }
        setMedias(mediasTemp);
        setTotalVideoDuration(totalVideoDuration + imagesNum*imageDuration);
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
            <VideoProgressBar totalVideoDuration={totalVideoDuration}/>
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