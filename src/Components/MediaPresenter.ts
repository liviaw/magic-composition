import * as mobx from 'mobx';

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

  @mobx.observable
  currFileIndex: number = 0;

  // this is temporary, will remove
  imageDuration: number = 3000;
  static audioSound: number = 0.5;

  static isImage(file: File) {
    const imageFormat = new RegExp("image/*");
    console.log("isimage", file);
    return imageFormat.test(file.type);
  }

  static isVideo(file: File) {
    const videoFormat = new RegExp("video/*");
    console.log("isvideo", file);
    return videoFormat.test(file.type);
  }

  @mobx.action
  setFileIndex(newIndex: number): void {
    this.currFileIndex = newIndex;
  }

  @mobx.action
  addFile(newFile: File): void {
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.files.push(newFile);
      this.durations.push(0);
      this.played.push(0);
    } 
  }
  
  @mobx.action
  removeFile(index: number): void {
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
  setDuration(index: number, duration: number): void {
    this.durations[index] = duration;
  }

  getDuration(index: number): number {
    return this.durations[index];
  }

  getFile(index: number): File {
    console.log("index is " + index);
    return this.files[index];
  }

  getFileName(index: number): string {
    return this.files[index].name;
  }
  getFileIndex(file: File):number {
    return(this.files.indexOf(file));
  }

  getCurrFile():File {
    return(this.files[this.currFileIndex]);
  }

  //call it by: mediaPresenter.filesLength
  @mobx.computed
  get filesLength(): number {
    return this.files.length;
  }

  // http://stackoverflow.com/questions/962802#962890
  shuffleArray(): number[] {
    for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
    console.log(this.files.length);
    if (this.customOrder) {
      console.log("custom order is on");
      return array;
    }
    return [...array].sort(() => Math.random() - 0.5);
  }
  swicthOrder(index: number, newIndex: any): void {
    if (typeof newIndex === "string") {
      newIndex = parseInt(newIndex);
    } 
    let fileTemp: File;
    let durTemp: number;
    let playedTemp: number;
    if (newIndex > -1) {
      [fileTemp] = this.files.splice(newIndex, 1);
      [durTemp] = this.durations.splice(newIndex, 1);
      [playedTemp] = this.played.splice(newIndex, 1);
      this.files.splice(index, 0, fileTemp);
      this.durations.splice(index, 0, durTemp);
      this.played.splice(index, 0, playedTemp);
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
}
