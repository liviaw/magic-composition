import React, {useState} from 'react';
import styles from './FileUpload.module.css';
import FileUploaderPresentationalComponent from "./FileUploaderPresentationalComponent";


type Props = {
    onDragState: boolean;
    callBack: any;
  };

  type State = {
    dragging: boolean;
    file: File | null;
  }

export const Modal: React.FC<Props> = ({
        onDragState,
        callBack
    }) => {
    const [dragging, setdragging] = useState<boolean>(false);
    const [file, setFile] = useState<null|File>(null);
    const [dragEventCounter, setEventCounter] = useState<number>(0);
    const counter = 0;
    let fileUploaderInput: HTMLElement | null = null;
    const overrideEventDefaults = (event: Event | React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const onSelectFileClick = () => {
        if (fileUploaderInput) {
            // fileUploaderInput.click();
            console.log("eh")
        }
    };
    const dragenterListener = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event);
        setEventCounter(dragEventCounter + 1);
        if (event.dataTransfer.items && event.dataTransfer.items[0]) {
            setdragging(true);
        } else if (
          event.dataTransfer.types &&
          event.dataTransfer.types[0] === "Files"
        ) {
            // for IE
            setdragging(true);
        }
      };
    
    const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };
    const dragleaveListener = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event);
        setEventCounter(dragEventCounter - 1)
    
        if (dragEventCounter === 0) {
          setdragging(false);
        }
      };
    
    const dropListener = (event: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(event);
        setEventCounter(0);
        setdragging(false);
    
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
          setFile(event.dataTransfer.files[0]);
        }
      };
    const Dropbox = () => {
        if (onDragState) {
            return(
                <div className={styles.dropModal}>
                    <div className={styles.dropModalText}>
                        Drop Your File Here
                    </div>
                    <FileUploaderPresentationalComponent
                        dragging={dragging}
                        file={file}
                        onSelectFileClick={onSelectFileClick}
                        onDrag={overrideEventDefaults}
                        onDragStart={overrideEventDefaults}
                        onDragEnd={overrideEventDefaults}
                        onDragOver={overrideEventDefaults}
                        onDragEnter={dragenterListener}
                        onDragLeave={dragleaveListener}
                        onDrop={dropListener}
                    >
                        <input
                            ref={el => (fileUploaderInput = el)}
                            type="file"
                            onChange={onFileChanged}
                        />
                    </FileUploaderPresentationalComponent>
                
                </div>
            )
        } else {
            return (<></>);
        }
    }
    
    return(
        <Dropbox/>
    )
}