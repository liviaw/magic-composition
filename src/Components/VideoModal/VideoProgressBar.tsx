import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useInterval } from 'beautiful-react-hooks'; 

type Props = {
    totalVideoDuration: number;
    currProgress: number;
}

export const VideoProgressBar: React.FC<Props> = ({
    totalVideoDuration,currProgress,
}) => {
    const [progressInterval, setProgressInterval] = useState<number>(100);
    const [currentProgressTime, setCurrentProgressTime] = useState<number>(0);
    const [videoOver, setVideoOver] = useState<boolean>(false);

    const formattedTime = (duration: number):string => 
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
    // let ReplayButton:() => JSX.Element = () => <svg id="Layer_1" enable-background="new 0 0 516 516" height="200" viewBox="0 0 516 516" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m258 516c-68.228 0-132.572-27.397-181.182-77.145-23.427-23.976-41.84-51.788-54.729-82.664-13.33-31.935-20.089-65.644-20.089-100.191 0-11.046 8.954-20 20-20s20 8.954 20 20c0 121.309 96.897 220 216 220s216-96.897 216-216c0-121.309-96.897-220-216-220-57.404 0-111.88 23.748-153.392 66.87-7.661 7.958-20.321 8.199-28.279.538-7.958-7.66-8.198-20.321-.538-28.278 23.644-24.562 51.089-43.925 81.573-57.553 32.027-14.317 65.886-21.577 100.636-21.577 68.228 0 132.572 27.397 181.182 77.145 23.427 23.976 41.84 51.788 54.729 82.664 13.33 31.935 20.089 65.644 20.089 100.191 0 68.38-26.629 132.668-74.98 181.02-48.353 48.351-112.64 74.98-181.02 74.98zm-119-353c0-11.046-8.954-20-20-20h-57c-11.028 0-20-8.972-20-20v-57c0-11.046-8.954-20-20-20s-20 8.954-20 20v57c0 33.084 26.916 60 60 60h57c11.046 0 20-8.954 20-20z" fill="#0023c4"/><path d="m235.057 350.046c-8.517 0-17.041-2.216-24.849-6.656-15.785-8.976-25.208-25.135-25.208-43.225v-90.33c0-18.09 9.423-34.249 25.208-43.225 15.909-9.047 34.794-8.862 50.518.492l75.915 45.165c15.253 9.076 24.359 25.05 24.359 42.733s-9.106 33.657-24.36 42.732l-75.915 45.165c-8.006 4.763-16.833 7.149-25.668 7.149zm.046-150.043c-2.333 0-4.188.848-5.123 1.379-1.86 1.058-4.98 3.562-4.98 8.453v90.33c0 4.892 3.12 7.396 4.98 8.453 1.556.886 5.677 2.65 10.293-.098l75.915-45.165c4.187-2.49 4.812-6.304 4.812-8.355s-.625-5.865-4.812-8.355l-75.915-45.165c-1.847-1.1-3.614-1.477-5.17-1.477z" fill="#ff5cf3"/></g></svg>
    return(
        <div>
            {/* {videoOver ? <ReplayButton/> : <></>} */}
            <span>{formattedTime(currentProgressTime) + " / " + formattedTime(totalVideoDuration)}</span>
            <br/>
            <ProgressBar now={currProgress/totalVideoDuration} />
        </div>
    )
}
