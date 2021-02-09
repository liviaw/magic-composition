import * as mobx from "mobx";

const MAXLEN = 10;

export class MediaPresenter {
  constructor() {
    mobx.makeObservable(this);
  }
  // make need to change to .deep
  @mobx.observable.deep
  files: File[] = [];

  @mobx.observable.deep
  durations: number[] = [];
  // for now its a 1D array but can be expanded as [][] to play different parts
  // this is for videos, which parts of it have been played
  played: number[] = [];

  customOrder: boolean = false;

  static audioSound: number = 3;

  static isImage(file: File) {
    const imageFormat = new RegExp("image/*");
    return imageFormat.test(file.type);
  }

  static isVideo(file: File) {
    const videoFormat = new RegExp("video/*");
    return videoFormat.test(file.type);
  }

  @mobx.action
  addFile(newFile: File): boolean {
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.files.push(newFile);
      this.durations.push(0);
      this.played.push(0);
      return true;
    } 
    return false;
  }
  
  @mobx.action
  removeFile(fileIndex: number): void {
    let index = fileIndex % this.filesLength;
    if (index > -1) {
      this.files.splice(index, 1);
      this.durations.splice(index, 1);
      this.played.splice(index, 1);
    }
  }

  setCustomOrder(value: boolean) {
    this.customOrder = value;
  }

  @mobx.action
  setDuration(fileIndex: number, duration: number): void {
    this.durations[fileIndex % this.filesLength] = duration;
  }

  getDuration(fileIndex: number): number {
    return this.durations[fileIndex % this.filesLength];
  }

  getFileName(fileIndex: number): string {
    return this.files[fileIndex % this.filesLength].name;
  }

  getFile(fileIndex: number): File {
    return this.files[fileIndex % this.filesLength];
  }

  @mobx.computed
  get filesLength(): number {
    return this.files.length;
  }

  @mobx.action
  resetFilePlayed():void {
    for (let i = 0; i < this.filesLength; i++) {
      this.played[i] = 0;
    }
  }

  getFilePlayed(fileIndex: number, styleIndex: number): number {
    return this.played[fileIndex % this.filesLength] % this.getDuration(fileIndex % this.filesLength);
  }

  shuffleArray(): number[] {
    for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
    if (this.customOrder) {
      return array;
    }
    return [...array].sort(() => Math.random() - 0.5);
  }
  switchOrder(index: number, newIndex: any): void {
    if (typeof newIndex === "string") {
      newIndex = parseInt(newIndex);
    } 
    let fileTemp: File;
    let durTemp: number;
    let playedTemp: number;
    if (newIndex > -1) {
      [fileTemp] = this.files.splice(index, 1);
      [durTemp] = this.durations.splice(index, 1);
      [playedTemp] = this.played.splice(index, 1);
      this.files.splice(newIndex, 0, fileTemp);
      this.durations.splice(newIndex, 0, durTemp);
      this.played.splice(newIndex, 0, playedTemp);
    }
  }
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

  mediaReady() {
    return this.filesLength !== 0;
  }
}
