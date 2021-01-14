import React, { useState } from "react";
import styles from "./ImportModal.module.css";
import {trimmedName, Media, AddMediaIcon} from "..";
import character from '../../Media/character.png';
import useSound from 'use-sound';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import soundUrl from '../../Audio/beep.mp3';
type Props = {
    medias: Media[];
    removeMedia:(index: number) => void;
    createMediaElement: (attachedFiles: File[]) => void;
}

export const ViewMedia: React.FC<Props> = ({medias, removeMedia, createMediaElement}) => {
    // const soundUrl = '/../../Audio/beep.mp3';
    const [playbackRate, setPlaybackRate] = useState<number>(0.75);
    const [play] = useSound('../../Audio/beep.mp3', {
        playbackRate,
        volume: 1,
    });
    const handleClick = () => {
        setPlaybackRate(playbackRate + 0.1);
        play();
        console.log("useless");
      };
    return (
        <div className={styles.dotted}>
        {/* filename (key) to JSX element (value) mapping */}
        {medias.map((media: Media, index: number) => {
        return (
            <div
            key={media.filename}
            className={styles.filePreviewContainer}
            >
            <div className={styles.fileNamePreview}>
                {trimmedName(media.filename)}
            </div>
            <div className={styles.previewContainer}>{media.element}</div>
            <IconButton 
							aria-label="delete" 
							className={styles.deleteIconButton}
							onClick={() => {
								handleClick();
								removeMedia(index);
						}}>
            <DeleteIcon />
            </IconButton>
            
            {/* <Button
                variant="light"
                className={styles.deleteButton}
                onClick={() => {
                    handleClick();
                    removeMedia(index);
                }}
            >
                <p>Delete 🗑 </p>
            </Button> */}
            </div>
        );
        })}
        <AddMediaIcon createMediaElement={createMediaElement} />
    </div>
    );
}

export const DragModal: React.FC = () => {
    return (
    <div className={styles.dotted}>
        <img
          className={styles.characterIcon}
          src={character}
          alt="drag file here"
        />
        <div className={styles.dropModalText}>Drop Your File Here</div>
    </div>
    )
}