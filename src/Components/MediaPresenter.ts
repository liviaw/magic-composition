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

  seeds: number[][] = [];
  seedsIndex: number[] = [];

  // this is temporary, will remove
  imageDuration: number = 3000;
  static audioSound: number = 0.5;

  static isImage(file: File) {
    const imageFormat = new RegExp("image/*");
    return imageFormat.test(file.type);
  }

  static isVideo(file: File) {
    const videoFormat = new RegExp("video/*");
    return videoFormat.test(file.type);
  }

  @mobx.action
  setFileIndex(newIndex: number): void {
    this.currFileIndex = newIndex;
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

  getFileName(index: number): string {
    return this.files[index].name;
  }
  getFileIndex(file: File):number {
    return(this.files.indexOf(file));
  }
  getPreviewFile(fileIndex: number): File {
    return this.files[fileIndex];
  }
  getFile(mediaCounter: number, styleIndex: number): File {
    if (this.customOrder) {
      return this.files[mediaCounter];
    }
    return this.files[this.seeds[styleIndex][mediaCounter]];
  }
  getCurrFile():File {
    return(this.files[this.currFileIndex]);
  }

  //call it by: mediaPresenter.filesLength
  @mobx.computed
  get filesLength(): number {
    return this.files.length;
  }


  @mobx.action
  addFilePlayed(fileIndex: number, playedDur: number):void {
    this.played[fileIndex] += playedDur;
  }

  getFilePlayed(fileIndex: number): number {
    return this.played[fileIndex];
  }
  // http://stackoverflow.com/questions/962802#962890
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

  // more on seed random generator https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
  // shuffling using the The Fisher Yates Method
  // Not ure how to shuffle based of value because its a file, so it shdnt matter
  shuffle(array: number[], seed: number) {  
    var m = array.length, t, i;
    // While there are still elements remaining to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(this.random(seed) * m--);   
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed;             
    }
    return array;
  }
  random(seed:number) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }

  initTemplates(templateSize: number) {
    for (let j = 0; j < templateSize; j++) {
      for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
      this.seeds.push(this.shuffle(array, j));
    }
  }

  resetSeed(styleIndex: number) {
    for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
    this.seeds.splice(styleIndex, 1, this.shuffle(array, styleIndex + this.seeds.length));
  }
}
