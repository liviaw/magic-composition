// i feel like these should be inside globla.t, or is this okay?
export { ImportModal } from "./ImportModal/ImportModal";
export { Header } from "./Shared/Header";
export { isImage, isVideo, trimmedName, imageDuration, audioSound } from "./utils";

export class Media {
  filename: string;
  type: string;
  element: JSX.Element;
  constructor(filename: string, type: string, element: JSX.Element) {
    this.filename = filename;
    this.type = type;
    this.element = element;
  }
}
