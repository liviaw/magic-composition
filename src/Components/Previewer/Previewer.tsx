import React from "react";
import { observer } from "mobx-react";
// import styles from "./Previewer.module.css";
import type { MediaPresenter, MediaStore } from "../../MediaPresenter";
import type { OutputPresenter } from "../../OutputPresenter";
import { MediaComponent } from "./MediaComponent";

type Props = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
};
export const Previewer: React.FC<Props> = observer(
    ({ mediaPresenter, outputPresenter }) => {
      return (<div>
        {mediaPresenter.media.map((media: MediaStore, index: number)=> {
          return(<MediaComponent file={media.file} index={index}/>);
        })}        
      </div> );
    }
  );
  