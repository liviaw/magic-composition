import React, { useState } from "react";
import styles from "./ImportModal.module.css";
import {trimmedName, Media, AddMediaIcon} from "..";
import character from "../../Media/character.png";
import { Button } from "react-bootstrap";
type Props = {
    medias: Media[];
    removeMedia:(index: number) => void;
    createMediaElement: (attachedFiles: File[]) => void;
}
export const ViewMedia: React.FC<Props> = ({medias, removeMedia, createMediaElement}) => {
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
            <Button
                variant="danger"
                className={styles.deleteButton}
                onClick={() => removeMedia(index)}
            >
                Delete
            </Button>
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