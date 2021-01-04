import React, {useEffect, useState} from 'react';

import styles from './CreateVideo.module.css';
// import ReactPlayer from "react-player";
import ReactPlayer, { SourceProps } from 'react-player/lazy';

type Props = {
    filePath:string[];
  };
const CreateVideo: React.FC<Props> = ({
    filePath,
  }) => {

    // const handleVideoUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files === null) return;
    //     setVideoPath(URL.createObjectURL(event.target.files[0]));
    //   };

    return(
        <div>

            {Array.from(filePath).map((videoPath) => (
                <>
                    {console.log(videoPath)}
                    <div key={videoPath}>{videoPath}</div>
                    <img className={styles.renderImage} src={videoPath} alt="" />
                    <ReactPlayer url={videoPath} width="100%" height="100%" controls={true} /></>
            ))}
            create
        </div>
    )
}

export default CreateVideo;