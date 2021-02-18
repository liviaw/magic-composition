import * as mobx from "mobx";

const MAXLEN = 30;

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

  @mobx.observable
  media: MediaStore[] = [];

  @mobx.observable
  readyMedia: number = 0;

  static isImage(file: File): boolean {
    const imageFormat = new RegExp("image/*");
    return imageFormat.test(file.type);
  }

  static isVideo(file: File): boolean {
    const videoFormat = new RegExp("video/*");
    return videoFormat.test(file.type);
  }

  private hasMedia(fileIndex: number): boolean {
    return !!this.getMedia(fileIndex);
  }

  // Assuming this is always called only when filesLength is not 0
  getMedia(fileIndex: number): MediaStore | undefined {
    // make sure that accessing files is % filesLength,
    // so that it loops back to the start of the file if the video is too long
    if (fileIndex < 0 || this.filesLength < 0) {
      return undefined;
    }
    const modIndex = fileIndex % this.filesLength;
    return this.media[modIndex];
  }

  fileExists(filename: string): boolean {
    return !!this.media.find((x) => x.file.name === filename);
  }

  @mobx.action
  addFile(newFile: File): boolean {
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      if (!this.fileExists(newFile.name)) {
        this.media.push(new MediaStore(newFile));
        return true;
      }
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

  // get the name of a file
  // if index is out of bound, fileindex go to the front of the files
  getFileName(fileIndex: number): string {
    return this.getMedia(fileIndex)?.file.name || "";
  }

  getFile(fileIndex: number): File | undefined {
    return this.getMedia(fileIndex)?.file;
  }

  @mobx.computed
  get filesLength(): number {
    return this.media.length;
  }

  @mobx.action
  setDuration(fileIndex: number, duration: number): void {
    if (this.hasMedia(fileIndex)) {
      this.getMedia(fileIndex)!.duration = duration;
    }
  }

  getDuration(fileIndex: number): number {
    return this.getMedia(fileIndex)?.duration || 0;
  }

  // Check if any file is uploaded
  @mobx.computed
  get mediaReady() {
    return this.filesLength !== 0;
  }

  @mobx.action
  incrementReadyMedia(): void {
    this.readyMedia += 1;
  }

  // shows how long each media has played
  // mod by duration, to loop back to the beginning of media
  @mobx.action
  incrementFilePlayed(fileIndex: number, seconds: number): void {
    if (!this.hasMedia(fileIndex)) {
      return;
    }
    let { duration, played } = this.getMedia(fileIndex)!;

    // duration 0 should do nothing, it will give NaN
    // For in case imageFile or empty video is indexed, it should do nothing
    if (duration === 0) {
      return;
    }
    this.getMedia(fileIndex)!.played = (played + seconds) % duration;
  }

  getFilePlayed(fileIndex: number): number {
    if (!this.hasMedia(fileIndex)) {
      return 0;
    }
    const { duration, played } = this.getMedia(fileIndex)!;
    // making sure that we don't meet the case of 0 % 0 which is NaN
    if (duration === 0) {
      return 0;
    } else {
      return played % duration;
    }
  }

  // reset all played media to 0
  @mobx.action
  resetAllPlayedFiles(): void {
    for (let fileIndex = 0; fileIndex < this.filesLength; fileIndex++) {
      this.getMedia(fileIndex)!.played = 0;
    }
  }

  @mobx.action.bound
  shuffleArray(): void {
    this.media.sort(() => Math.random() - 0.5);
  }

  // switching order by replacing index with newIndex, then shift the array to the left
  @mobx.action.bound
  switchOrder(index: number, newIndex: any): void {
    if (typeof newIndex === "string") {
      newIndex = parseInt(newIndex);
    }
    let mediaTemp: MediaStore;
    if (newIndex > -1 && newIndex < this.media.length) {
      [mediaTemp] = this.media.splice(index, 1);
      this.media.splice(newIndex, 0, mediaTemp);
    }
  }

  // trim file name when it's too long to look good in UI
  static trimmedName(fullFilename: string): string {
    let splittedNames = fullFilename.split(".");
    if (fullFilename.length >= MAXLEN) {
      return fullFilename.substr(0, MAXLEN / 2) + "...";
    }
    return splittedNames[0];
  }

  static fileType(fullFilename: string): string {
    let splittedNames = fullFilename.split("/");
    return splittedNames[splittedNames.length - 1].toUpperCase();
  }
}
