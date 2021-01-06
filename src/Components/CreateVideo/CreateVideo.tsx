import React, {useEffect, useState} from 'react';

import styles from './CreateVideo.module.css';
// import ReactPlayer from "react-player";
import ReactPlayer, { SourceProps } from 'react-player/lazy';

type Props = {
    files:File[];
  };
const CreateVideo: React.FC<Props> = ({
    files,
  }) => {

    // const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files === null) return;
    //     setVideoPath(URL.createObjectURL(event.target.files[0]));
    //   };

    return(
        <div>

            {Array.from(files).map((videoPath) => (
                <>
                    {console.log(videoPath)}
                    <div key={videoPath.name}>{videoPath}</div>
                    <img src={URL.createObjectURL(videoPath)}/>
                    <ReactPlayer url={URL.createObjectURL(videoPath)} width="100%" height="50%" playing={true} />
                </>
            ))}
            create
        </div>
    )
}

export default CreateVideo;