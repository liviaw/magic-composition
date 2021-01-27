import * as mobx from 'mobx';

const MAXLEN = 10;


export class MediaPresenter {

  @mobx.observable.deep
  files: File[] = [];
  @mobx.observable.deep
  durations: number[] = [];
  customOrder: boolean = false;

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
  @mobx.action.bound
  addFile(newFile: File): void {
    console.log("top ", this.files);
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.files = [...this.files, newFile];
      console.log(newFile.name);
    } 
    console.log(this.files);
  }
  @mobx.action.bound
  removeFile(index: number): void {
    if (index > -1) {
      let temp = this.files;
      temp.splice(index, 1);
      this.files = [...temp];
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
    return this.files[index];
  }

  getFileName(index: number): string {
    return this.files[index].name;
  }
  getFileIndex(file: File):number {
    return(this.files.indexOf(file));
  }

  //call it by: mediaPresenter.filesLength
  @mobx.computed
  get filesLength(): number {
    return this.files.length;
  }
  // http://stackoverflow.com/questions/962802#962890
  shuffleArray(): number[] {
    // if (this.customOrder) {
    //   return new Array(this.files.length);
    // }
    for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
    return [...array].sort(() => Math.random() - 0.5);
  }
  swicthOrder(index: number, newIndex: any): void {
    if (typeof newIndex === "string") {
      newIndex = parseInt(newIndex);
    } else if (typeof newIndex === "number") {
      let temp = this.files[index];
      this.files[index] = this.files[newIndex];
      this.files[newIndex] = temp;
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
