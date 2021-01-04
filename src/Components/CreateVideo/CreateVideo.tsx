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
        // <div>
        //     <p>{filePath}</p>
        //     {console.log("hi")}
        //     {console.log({filePath})}
        //     {filePath.map((videoPath) => (
        //         <>
        //             {console.log(videoPath)}
        //             <div key={videoPath}>{videoPath}</div>
        //             <img className={styles.renderImage} src={videoPath} alt={videoPath} />
        //             <ReactPlayer url={videoPath} width="100%" height="100%" controls={true} /></>
        //     ))}
        //     create
        // </div>
    return(
        <div>
            {/* {files.map(f => (<span dangerouslySetInnerHTML={{__html: f}}/>))} */}
            {filePath.map((f) => (
              <div key={f}>{f}</div>
            ))}
            <p>jhdsfkhkdj</p>
        </div>
    )
}

export default CreateVideo;