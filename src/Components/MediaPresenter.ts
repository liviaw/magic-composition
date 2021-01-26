import { showError } from "./ErrorToast/ErrorToast";

const MAXLEN = 10;

export class MediaPresenter {
  files: File[] = [];
  durations: number[] = [];

  static imageFormat = new RegExp("image/*");
  static videoFormat = new RegExp("video/*");

  // this is temporary, will remove
  imageDuration: number = 3000;
  static audioSound: number = 0.5;

  addFile(newFile: File): void {
    let newMedia: File = newFile;
    // if (this.files === null) {

    // }
    if (MediaPresenter.isImage(newFile) || MediaPresenter.isVideo(newFile)) {
      this.files = [...this.files, newFile];
    } else {
      showError("invalid file " + newFile.name);
    }
  }

  static isImage(file: File) {
    return this.imageFormat.test(file.type);
  }

  static isVideo(file: File) {
    return this.videoFormat.test(file.type);
  }
  removeFile(index: number): void {
    if (index > -1) {
      let temp = this.files;
      temp.splice(index, 1);
      this.files = [...temp]
    }
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

  getFiles(): File[] {
    if(this.files === []) {
      alert("empty");
    }
    return this.files;
  }

  getFilesLength(): number {
    return this.files.length;
  }
  // http://stackoverflow.com/questions/962802#962890
  shuffleArray():number[] {
    for (var array = [], i = 0; i < this.files.length; ++i) array[i] = i;
    return [...array].sort(() => Math.random() - 0.5);
  }
  trimmedName(filename: string):string {
    if (filename.length >= MAXLEN) {
      let splittedNames = filename.split(".");
      return (
        filename.substr(0, MAXLEN / 2) +
        "..." +
        splittedNames[splittedNames.length - 1]
      );
    }
    return filename;
  };
}
