import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useInterval } from 'beautiful-react-hooks'; 

type Props = {
    totalVideoDuration: number;
}

const VideoProgressBar: React.FC<Props> = ({
    totalVideoDuration,
}) => {
    const [progressInterval, setProgressInterval] = useState<number>(1000);
    const [progress, setProgress] = useState<number>(0);
    const updateProgress = () => {
        if (progress >= totalVideoDuration) {
            // video finishes
            setProgress(100);
            clearInterval();
        } else {
            // updates progress
            console.log(totalVideoDuration+" microsecond has passed progress= " + progress + " of "+ totalVideoDuration);
            setProgress(progress + progressInterval);
        }
    }
    console.log("totalVideoDuration= " + totalVideoDuration);
    const [isCleared, clearInterval] = useInterval(updateProgress, progressInterval);
    return(
        <div>
            <ProgressBar now={progress/totalVideoDuration * 100} label={`${progress/totalVideoDuration * 100}%`} />
        </div>
    )
}

export default VideoProgressBar;