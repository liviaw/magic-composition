import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import type { MediaPresenter } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { MediaComponent } from "./MediaComponent";
import styles from "./VideoPlayer.module.css";
import useInterval from "./useInterval";
import playButton from "./playButton.svg";
import pauseButton from "./pauseButton.svg";
import { VideoProgressBar } from "../VideoProgressBar/VideoProgressBar";
import { Music } from "../Music/Music";

type Props = {
    mediaPresenter: MediaPresenter;
    outputPresenter: OutputPresenter;
};

export const VideoPlayer: React.FC<Props> = observer(({
    mediaPresenter,
    outputPresenter,
}) => {
    const [delay, setDelay] = useState<number>(100);
    const [hover, setHover] = useState<boolean>(false);
    useEffect(() => {
        outputPresenter.seekPlayMusic();
      }, []);
    useInterval(
        () => {           
            //seek each media
            mediaPresenter.incrementFilePlayed(outputPresenter.currPlayingMedia, delay / 1000);
            let music = outputPresenter.currMusic;
            let currentMediaCounter = outputPresenter.currPlayingMedia;
            if (music.ended) {
                mediaPresenter.resetFilePlayed();
            } else if (outputPresenter.currSlotLength <= currentMediaCounter) {
                outputPresenter.pauseVideo();
                mediaPresenter.resetFilePlayed();
            } else {
                outputPresenter.increPlayedSeconds(delay / 1000);
            }
        },
        outputPresenter.isPlaying ? delay : null,
    )
    return (
        <div className={styles.finalVideoContainer}>
            {outputPresenter.currMusicLoaded &&
            (<MediaComponent file={mediaPresenter.getFile(outputPresenter.currPlayingMedia)} outputPresenter={outputPresenter} playfrom={mediaPresenter.getFilePlayed(outputPresenter.currPlayingMedia)}/>)
            }
            <VideoProgressBar outputPresenter={outputPresenter}/>
            { outputPresenter.isPlaying ?
                (<img src={pauseButton} onClick={() => outputPresenter.pauseVideo()} className={styles.pauseBtn} alt="pause button"/>) : 
                (<img src={playButton} onClick={() => outputPresenter.playVideo()} className={styles.playBtn} alt="play button"/>)
            }
            <Music mediaPresenter={mediaPresenter} outputPresenter={outputPresenter}/>

      </div>
    );
});