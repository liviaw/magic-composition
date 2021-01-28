import React, { useState, useEffect } from "react";
import styles from "./ImportModal.module.css";
import { trimmedName } from "../utils";
import { AddMediaIcon } from "../AddMediaIcon/AddMediaIcon";
import character from "../../Media/character.png";
import { MediaComponent } from "./MediaComponent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import type { MediaPresenter } from "../MediaPresenter";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react";
type Props = {
  mediaPresenter: MediaPresenter;
  setMediaReady: (func: (numberReady: number) => number) => void;
};

export const MediaPreviewer: React.FC<Props> = observer(
  ({ mediaPresenter, setMediaReady }) => {
    const [customOrder, setCustomOrder] = useState<boolean>(false);
    return (
      <div className={styles.dotted}>
        <Grid container component="label" spacing={2}>
          <ListItemText id="switch-list" primary="Custom Order" />
          <Grid item>Off</Grid>
          <Switch
            edge="end"
            onChange={() => {
              mediaPresenter.setCustomOrder(!customOrder);
              setCustomOrder(!customOrder);
            }}
            color="primary"
            checked={customOrder}
            inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
          />
          <Grid item>On</Grid>
        </Grid>
        {/* filename (key) to JSX element (value) mapping */}
        {mediaPresenter.files.map((file: File, index: number) => {
          return (
            <div key={file.name} className={styles.filePreviewContainer}>
              <div className={styles.fileNamePreview}>
                {trimmedName(file.name)}
              </div>
              <div className={styles.previewContainer}>
                {customOrder ? (
                  <Select
                    value={index}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      mediaPresenter.swicthOrder(index, event.target.value);
                    }}
                  >
                    {Array.from(
                      { length: mediaPresenter.filesLength },
                      (item, index) => index
                    ).map((num: number) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                ) : null}
                <MediaComponent
                  mediaPresenter={mediaPresenter}
                  setMediaReady={setMediaReady}
                  index={index}
                />
              </div>
              <IconButton
                aria-label="delete"
                className={styles.deleteIconButton}
                onClick={() => {
                  mediaPresenter.removeFile(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
        <AddMediaIcon mediaPresenter={mediaPresenter} />
      </div>
    );
  }
);

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
  );
};
