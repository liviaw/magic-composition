import React from 'react';

import styles from './FileUpload.module.css';
// import './FileUpload.module.css';

type PresentationalProps = {
  dragging: boolean;
  file: File | null;
  onSelectFileClick: () => void;
  onDrag: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};
const filesString:string = "Drag & Drop File\n or";
export const FileUploaderPresentationalComponent: React.SFC<
  PresentationalProps
> = props => {
  const {
    dragging,
    file,
    onSelectFileClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop
  } = props;

  let uploaderClasses = "fileUploader";
  if (dragging) {
    uploaderClasses += " fileUploaderDragging";
  }

  const fileName = file ? file.name : "No File Uploaded!";

  return (
    <div
      className={uploaderClasses}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={styles.fileUploaderContents}>
        <span className={styles.fileUploaderFileName}>{fileName}</span>
        <span dangerouslySetInnerHTML={{__html: filesString}}></span>
        <span onClick={onSelectFileClick}>
          Select File
        </span>
      </div>
      {props.children}
    </div>
  );
};

export default FileUploaderPresentationalComponent;