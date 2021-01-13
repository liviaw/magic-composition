export const saveToLocal = () => {
  var reader: FileReader = new FileReader();
  reader.onload = function (e) {
    const thisImage: string | ArrayBuffer | null = reader.result;
    if (typeof thisImage === "string") {
      localStorage.setItem("imgData", thisImage);
    }
  };
  // reader.readAsDataURL(this.files[0]);
};

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
// duration is the length of each media displayed in video
// if there are too many photos, then mb dont show all? (for now)
// length is the length of the final video
// durations and lengths in seconds
//
export const template = {
  "nature":{
      title: "calm",
      minDuration: 3,
      maxLength: 50,
      slots: [],
      musicTrack: "https://www.youtube.com/watch?v=-FKe4vQ4dME&list=RDLeV4u5Y-3ac&index=18",
  },
  "dreamy": {
      title: "dreamy",
      maxDuration: 60,
      minDuration: 5,
      slots: [],
      musicTrack:"https://www.youtube.com/watch?v=RF7q8NNjUWU",
  },
  "exciting": {
      title: "chill",
      maxDuration: 50,
      minDuration: 1,
      maxLength: 20,
      slots: [],
      musicTrack: "https://www.youtube.com/watch?v=X2BYmmTI04I"
  }
}

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const imageDuration = 3000;
export const audioSound = 0.5;