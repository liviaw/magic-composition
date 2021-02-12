import * as mobx from "mobx";

const MAXLEN = 10;

export class MediaStore {
  file: File;
  // duration of each media attached
  duration: number = 0;
  // played list shows how long each of the file have been played
  played: number = 0;
  constructor(newFile: File) {
    this.file = newFile;
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

  getMedia(fileIndex: number): MediaStore {
    // make sure that accessing files is % filesLength,
    // so that it loops back to the start of the file if the video is too long
    const modIndex = fileIndex % this.filesLength;
    return this.media[modIndex];
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
    this.getMedia(fileIndex).duration = duration;
  }

  getDuration(fileIndex: number): number {
    return this.getMedia(fileIndex).duration;
  }

  // get the name of a file
  // if index is out of bound, fileindex go to the front of the files
  getFileName(fileIndex: number): string {
    if (this.media.length === 0) {
      return "";
    }
    return this.getMedia(fileIndex).file.name;
  }

  getFile(fileIndex: number): File {
    return this.getMedia(fileIndex).file;
  }

  @mobx.computed
  get filesLength(): number {
    return this.media.length;
  }

  // Check if any file is uploaded
  @mobx.computed
  get mediaReady() {
    return this.filesLength !== 0;
  }

  // shows how long each media has played
  // mod by duration, to loop back to the beginning of media
  @mobx.action
  incrementFilePlayed(fileIndex: number, seconds: number): void {
    let { duration, played } = this.getMedia(fileIndex);
    played = (played + seconds) % duration;
  }

  // reset all played media to 0
  @mobx.action
  resetAllPlayedFiles(): void {
    for (let index = 0; index < this.filesLength; index++) {
      this.media[index].played = 0;
    }
  }

  getFilePlayed(fileIndex: number): number {
    // making sure that we don't meet the case of 0 % 0 which is NaN
    const { duration, played } = this.getMedia(fileIndex);
    const computedIndex = fileIndex % this.filesLength;
    if (!computedIndex || !duration) {
      return 0;
    } else if (!(played % duration)) {
      return 0;
    } else {
      return played % duration;
    }
  }

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
}
