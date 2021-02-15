import React from "react";
import { observer } from "mobx-react";
import styles from "./Previewer.module.css";
import type { MediaPresenter, MediaStore } from "../../MediaPresenter";
import { MediaComponent } from "./MediaComponent";
import { Container } from "react-bootstrap";
import shuffle from "./ShuffleIcon.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  mediaPresenter: MediaPresenter;
};

export const Previewer: React.FC<Props> = observer(({ mediaPresenter }) => {
  return (
    <Container className={styles.previewerContainer}>
      <DndProvider backend={HTML5Backend}>
        {mediaPresenter.media.map((media: MediaStore, index: number) => {
          return (
            <MediaComponent
              id={index}
              file={media.file}
              index={index}
              mediaPresenter={mediaPresenter}
              key={media.file.name}
            />
          );
        })}
      </DndProvider>
      <button
        className={styles.shuffleBtn}
        onClick={mediaPresenter.shuffleArray}
      >
        <img src={shuffle} alt="shuffle" /> Shuffle order
      </button>
    </Container>
  );
});
