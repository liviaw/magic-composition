import React, { useState, useEffect } from "react";
import styles from "./ImportModal.module.css";
import { trimmedName } from "../utils";
import { AddMediaIcon } from "../AddMediaIcon/AddMediaIcon";
import character from "../../Media/character.png";
import { MediaComponent } from "./MediaComponent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import type { MediaPresenter } from "../MediaPresenter";
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';

type Props = {
  mediaPresenter: MediaPresenter;
  setMediaReady: (func: (numberReady: number) => number) => void;
};

export const ImportComponents: React.FC<Props> = ({
  mediaPresenter,
  setMediaReady,
}) => {
  const [customOrder, setCustomOrder] = useState<boolean>(false);
  return (
    <div className={styles.dotted}>
      <ListItemText id="switch-list-label-wifi" primary="Custom Order" />
      <Switch
        edge="end"
        onChange={() => {
          mediaPresenter.setCustomOrder(!customOrder);
          setCustomOrder(!customOrder);
        }}
        checked={customOrder}
        inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
      />
      {/* filename (key) to JSX element (value) mapping */}
      {mediaPresenter.getFiles().map((file: File, index: number) => {
        return (
          <div key={file.name} className={styles.filePreviewContainer}>
            <div className={styles.fileNamePreview}>
              {trimmedName(file.name)}
            </div>
            <div className={styles.previewContainer}>
              {customOrder ? (
                <Select value={index}>
                 { Array.from({length: mediaPresenter.getFilesLength()}, (item, index) => index).map((num: number) => (
                        <MenuItem key={num} value={num} >
                          {num}
                        </MenuItem>
                  ))
                }
                </Select>
                              
              ) : null }
              <MediaComponent mediaPresenter={mediaPresenter} setMediaReady={setMediaReady} index={index}/>
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
};

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
