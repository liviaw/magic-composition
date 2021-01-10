import React, { useState, useEffect } from 'react';
import { useInterval } from 'beautiful-react-hooks'; 
import { Button, Modal } from 'react-bootstrap';
import styles from './CreateVideo.module.css';
import VideoProgressBar from './VideoProgressBar';
import ReactPlayer from 'react-player/lazy';
import {isVideo, isImage} from '../utils';
// import { Player, ControlBar } from 'video-react';
// import {getVideoDurationInSeconds} from 'get-video-duration';

interface Media {
    [filename: string]: {
      type: string;
      element: JSX.Element;
      // time: number;
    }
  }

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    medias: Media;
};
  
const CreateVideo: React.FC<Props> = ({
    show,
    setShow,
    medias,
  }) => {
    const [mediaCounter, setMediaCounter] = useState<number>(0);
    const [imageDuration, setImageDuration] = useState<number>(5000);
    // const [progress, setProgress] = useState<number>(0);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    const [videoReady, setVideoReady] = useState<number>(0);
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
    const ShowMedia = () => {
        const mediasTemp:JSX.Element[] = []
        let combinedVideoDuration = 0;
        if (files == null) {
            return <></>
        }
        let newImagesNum = imagesNum;
        let newVideosNum = videosNum;
        for (let i = 0; i < files.length; i++) {
            if (isImage(files[i])) {
                newImagesNum = newImagesNum + 1;
                mediasTemp.push(<img className={styles.renderMedia} src={URL.createObjectURL(files[i])}/>)
            }
            else if (isVideo(files[i])) {
                newVideosNum = newVideosNum + 1;
                combinedVideoDuration = combinedVideoDuration + 5000;
                
                // var video: HTMLMediaElement  = document.createElement("video");
                // video.setAttribute("src", URL.createObjectURL(files[i]));
                // video.load();
                // video.onloadedmetadata = async function() {
                //     console.log('metadata loaded!');
                //     console.log(video.duration * 1000);
                //     combinedVideoDuration = combinedVideoDuration + (video.duration * 1000);
                // };


                // var video: HTMLMediaElement = document.createElement('video');
                // video.preload = 'metadata';
                // video.setAttribute("src", URL.createObjectURL(files[i]));
                // video.src = URL.createObjectURL(files[i]);
                // window.URL.revokeObjectURL(video.src);
                // video.load();
                // combinedVideoDuration = combinedVideoDuration + (video.duration * 1000);
                // console.log("SETTING "+ combinedVideoDuration);
                // video.onloadedmetadata = function() {
                //     console.log('metadata loaded!');
                //     console.log(video.duration * 1000);
                //     combinedVideoDuration = combinedVideoDuration + (video.duration * 1000);
                // };
                
                
                const videoFile = <ReactPlayer 
                
                    url={URL.createObjectURL(files[i])} 
                    width="100%" height="50%" 
                    playing={true} 
                    onStart = {() => setVideoPlaying(true)} 
                    onEnded={() => setVideoPlaying(false)} 
                    onError={()=> alert(files[i] + " is unable to play")}
                    id={files[i].name}
                    config={{
                        file: {
                            attributes: {
                                preload: 'metadata',
                            },
                        }
                    }}
                    // onDuration={(duration) => {
                    //     console.log("duration= "+duration);
                    //     setTotalVideoDuration(totalVideoDuration + duration)}
                    // }
                />

                // console.log(videoFile.config.file.attributes);
                mediasTemp.push(videoFile)

            }
        }
        setImagesNum(newImagesNum);
        setVideosNum(newVideosNum);
        setMedias(mediasTemp);
        
        combinedVideoDuration = combinedVideoDuration + newImagesNum*imageDuration
        setTotalVideoDuration(combinedVideoDuration);
    }
    // console.log("in cerate vid, totalVideoDuration: "+totalVideoDuration + " imagesNum " + imagesNum + " imageDuration " + imageDuration);
    //   console.log("maths wow " + totalVideoDuration + imagesNum*imageDuration);

    const playVideo = (<div className={styles.renderMediaContainer}>
                            {medias[mediaCounter]}
                        </div>)
    return(
        <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            some text here
            {/* {videoReady === videosNum + imagesNum ? <LoadingPage/> : <></>} */}
            <div className={styles.renderMediaContainer}>
                            {medias[mediaCounter]}
                        </div>

            <VideoProgressBar totalVideoDuration={totalVideoDuration/1000}/>
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