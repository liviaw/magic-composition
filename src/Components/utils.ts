let imageFormat = new RegExp("image/*");
let videoFormat = new RegExp("video/*");
export const isImage = (file: File) => {
  return imageFormat.test(file.type);
};

export const isVideo = (file: File) => {
  return videoFormat.test(file.type);
};
export const MAXLEN = 10;
export const trimmedName = (filename: string) => {
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
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const imageDuration = 3000;
export const audioSound = 0.5;