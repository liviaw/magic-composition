export const saveToLocal = () => {
  var reader: FileReader = new FileReader();
  reader.onload = function (e) {
    const thisImage: string | ArrayBuffer | null = reader.result;
    if (typeof thisImage === "string") {
      localStorage.setItem("imgData", thisImage);
    }
  };
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
