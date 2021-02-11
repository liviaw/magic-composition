import * as mobx from "mobx";

const MAXLEN = 10;

export class MediaStore {
  file: File;
  duration: number = 0;
  played: number = 0;
  constructor(newFile: File) {
    this.file = newFile;
    // duration of each media attached
    this.duration = 0;
    // played list shows how long each of the file have been played
    this.played = 0;
  }
}

export class MediaPresenter {
  constructor() {
    mobx.makeObservable(this);
  }

  @mobx.observable.deep
  media: MediaStore[] = [];

  static isImage(file: File): boolean {
    const imageFormat = new RegExp("image/*");
    return imageFormat.test(file.type);
  }

  static isVideo(file: File): boolean {
    const videoFormat = new RegExp("video/*");
    return videoFormat.test(file.type);
  }

  @mobx.action
  addFile(newFile: File): boolean {
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.media.push(new MediaStore(newFile));
      return true;
    }
    return false;
  }

  @mobx.action
  removeFile(fileIndex: number): void {
    if (this.media.length === 0) {
      return;
    }
    let index = fileIndex % this.filesLength;
    if (index > -1) {
      this.media.splice(index, 1);
    }
  }

  @mobx.action
  setDuration(fileIndex: number, duration: number): void {
    // make sure that accessing files is % filesLength,
    // so that it loops back to the start of the file if the video is too long
    const modIndex = fileIndex % this.filesLength;
    this.media[modIndex].duration = duration;
  }

  getDuration(fileIndex: number): number {
    // make sure that accessing files is % filesLength,
    // so that it loops back to the start of the file if the video is too long
    const modIndex = fileIndex % this.filesLength;
    return this.media[modIndex].duration;
  }

  // get the name of a file
  // if index is out of bound, fileindex go to the front of the files
  getFileName(fileIndex: number): string {
    if (this.media.length === 0) {
      return "";
    }
    return this.media[fileIndex % this.filesLength].file.name;
  }

  getFile(fileIndex: number): File {
    return this.media[fileIndex % this.filesLength].file;
  }

  @mobx.computed
  get filesLength(): number {
    return this.media.length;
  }

  // shows how long each media has played
  @mobx.action
  incrementFilePlayed(fileIndex: number, seconds: number): void {
    let index = fileIndex % this.filesLength;
    this.media[index].played =
      (this.media[index].played + seconds) % this.media[index].duration;
  }

  // reset all played media to 0
  @mobx.action
  resetAllPlayedFiles(): void {
    for (let index = 0; index < this.filesLength; index++) {
      this.media[index].played = 0;
    }
  }

  getFilePlayed(fileIndex: number): number {
    if (
      fileIndex % this.filesLength === 0 ||
      this.getDuration(fileIndex % this.filesLength) === 0
    )
      return 0;
    if (
      this.media[fileIndex % this.filesLength].played %
      this.getDuration(fileIndex % this.filesLength)
    )
      return 0;
    return (
      this.media[fileIndex % this.filesLength].played %
      this.getDuration(fileIndex % this.filesLength)
    );
  }

  // http://stackoverflow.com/questions/962802#962890
  shuffleArray(): number[] {
    for (var array = [], index = 0; index < this.media.length; ++index)
      array[index] = index;
    return [...array].sort(() => Math.random() - 0.5);
  }

  // switching order by replacing index with newIndex, then shift the array to the right
  switchOrder(index: number, newIndex: any): void {
    if (typeof newIndex === "string") {
      newIndex = parseInt(newIndex);
    }
    let mediaTemp: MediaStore;
    if (newIndex > -1) {
      [mediaTemp] = this.media.splice(index, 1);
      this.media.splice(newIndex, 0, mediaTemp);
    }
  }

  // trim file name when it's too long to look good in UI
  trimmedName(filename: string): string {
    if (filename.length >= MAXLEN) {
      let splittedNames = filename.split(".");
      return (
        filename.substr(0, MAXLEN / 2) +
        "..." +
        splittedNames[splittedNames.length - 1]
      );
    }
    return filename;
  }
  // Check if any file is uploaded
  mediaReady() {
    return this.filesLength !== 0;
  }
}
