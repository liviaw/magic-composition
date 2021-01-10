export const saveToLocal = () => {
    var reader: FileReader = new FileReader();
    reader.onload = function (e) {
        console.log(reader.result + '->' + typeof reader.result)
        const thisImage: string | ArrayBuffer | null = reader.result;
        if (typeof thisImage === "string") {
            localStorage.setItem("imgData", thisImage);
        }
    };
    // reader.readAsDataURL(this.files[0]);

}

let imageFormat = new RegExp('image/*');
let videoFormat = new RegExp('video/*');
export const isImage = (file: File) => {
    return imageFormat.test(file.type)
}

export const isVideo = (file: File) => {
    return videoFormat.test(file.type)
}

export const trimmedName = (filename: string, MAXLEN:number) => {
    if (filename.length >= MAXLEN) {
      let splittedNames = filename.split(".");
      return filename.substr(0,MAXLEN/2) + "..." + splittedNames[splittedNames.length - 1];
    }
    return filename;
  }

export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);