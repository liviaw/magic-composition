import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useInterval } from 'beautiful-react-hooks'; 
import styles from './CreateVideo.module.css';

type Props = {
    totalVideoDuration: number;
}

const VideoProgressBar: React.FC<Props> = ({
    totalVideoDuration,
}) => {
    const [progressInterval, setProgressInterval] = useState<number>(100);
    const [currentProgressTime, setCurrentProgressTime] = useState<number>(0);
    // const [progressSeconds, setProgressSeconds] = useState<number>(0);
    // const [progressMinutes, setProgressMinutess] = useState<number>(0);
    // const [progressHours, setProgressHours] = useState<number>(0);
    const [videoOver, setVideoOver] = useState<boolean>(false);

    const [barProgress, setBarProgress] = useState<number>(0);

    const updateProgress = () => {
        if (currentProgressTime >= totalVideoDuration) {
            // video finishes
            setBarProgress(100);
            setVideoOver(true);
            clearInterval();
        } else {
            let currentSec = currentProgressTime + progressInterval/1000;
            setCurrentProgressTime(currentSec);
            setBarProgress(Math.round(currentSec / totalVideoDuration * 100));
        }
    }
    const [isCleared, clearInterval] = useInterval(updateProgress, progressInterval);


    const formattedTime:(duration: number) => string = (duration) => 
    {   
        // Hours, minutes and seconds
        var hrs = Math.floor(duration / 3600);
        var mins = Math.floor((duration % 3600) / 60);
        var secs = Math.floor(duration % 60);

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    return(
        <div>
            {/* {videoOver ? {styles.showBar} : {styles.hideBar} */}
            <ProgressBar now={barProgress} label={formattedTime(currentProgressTime) + " / " + formattedTime(totalVideoDuration)} />
        </div>
    )
}

export default VideoProgressBar;