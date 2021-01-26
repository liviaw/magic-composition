import { showError } from "./ErrorToast/ErrorToast";

const MAXLEN = 10;

export class MediaPresenter {
  files: File[] = [];
  durations: number[] = [];
  customOrder: boolean = false;

  static imageFormat = new RegExp("image/*");
  static videoFormat = new RegExp("video/*");

  // this is temporary, will remove
  imageDuration: number = 3000;
  static audioSound: number = 0.5;

  addFile(newFile: File): void {
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.files = [...this.files, newFile];
    } else {
      showError("invalid file " + newFile.name);
    }
  }

  static isImage(file: File) {
    return MediaPresenter.imageFormat.test(file.type);
  }

  static isVideo(file: File) {
    return MediaPresenter.videoFormat.test(file.type);
  }
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

  getFiles(): File[] {
    if (this.files === []) {
      alert("empty");
    }
    return this.files;
  }

  getFilesLength(): number {
    return this.files.length;
  }
  // http://stackoverflow.com/questions/962802#962890
  shuffleArray(): number[] {
    if (this.customOrder) {
      return new Array(this.files.length);
    }
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
