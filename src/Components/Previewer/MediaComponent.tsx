import React, { useState, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import styles from "./Previewer.module.css";
import { MediaPresenter } from "../../MediaPresenter";
import { observer } from "mobx-react";
import { VideoComponent } from "./VideoComponent";
import { ImageComponent } from "./ImageComponent";
import { Col, Row } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { XYCoord } from "dnd-core";

type MediaProps = {
  id: any;
  file: File;
  index: number;
  mediaPresenter: MediaPresenter;
};

const style = {
  borderBottom: "1px solid var(--translucent-lightgrey)",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  cursor: "move",
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const MediaComponent: React.FC<MediaProps> = observer(
  ({ id, file, index, mediaPresenter }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const finishLoading = (duration: number) => {
      if (!loaded) {
        setLoaded(true);
        mediaPresenter.setDuration(index, duration);
        setVideoDuration(duration);
        mediaPresenter.incrementReadyMedia();
      }
    };

    const moveUp = () => {
      mediaPresenter.switchOrder(index, index - 1);
    };

    const moveDown = () => {
      mediaPresenter.switchOrder(index, index + 1);
    };
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
      accept: "mediacomponent",
      hover(item: DragItem, monitor: DropTargetMonitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        // Avoid replacing items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // get the mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        // mediaPresenter.switchOrder(dragIndex, hoverIndex);
        // moveCard(dragIndex, hoverIndex);
        mediaPresenter.switchOrder(dragIndex, hoverIndex)

        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      item: { type: "mediacomponent", id, index },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
      // className={styles.bottomLine}
      <Row ref={ref} style={{ ...style, opacity }}>
        <Col xs={1} className={styles.hamburger}>
          <svg viewBox="0 0 100 80" width="15" height="20">
            <rect width="100" height="15" rx="8" fill="#dadada"></rect>
            <rect y="30" width="100" height="15" rx="8" fill="#dadada"></rect>
            <rect y="60" width="100" height="15" rx="8" fill="#dadada"></rect>
          </svg>
        </Col>
        {MediaPresenter.isImage(file) ? (
          <ImageComponent file={file} finishLoading={finishLoading} />
        ) : (
          <VideoComponent file={file} finishLoading={finishLoading} />
        )}
        <Col xs={3} className={styles.leftAlign}>
          <p>{MediaPresenter.trimmedName(file.name)}</p>
          {MediaPresenter.isVideo(file) && (
            <p className={styles.duration}>{videoDuration.toFixed(2)} s</p>
          )}
        </Col>
        <Col xs={3} className={styles.center}>
          <p>{MediaPresenter.fileType(file.type)}</p>
        </Col>
        <Col xs={1}>
          <span onClick={moveDown}>
            <i className={styles.downArrow}></i>
          </span>
        </Col>
        <Col xs={1}>
          <span onClick={moveUp}>
            <i className={styles.upArrow}></i>
          </span>
        </Col>
        <Col xs={1}>
          <IconButton
            aria-label="delete"
            className={styles.deleteIconButton}
            onClick={() => {
              mediaPresenter.removeFile(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>
    );
  }
);
