export { ImportModal } from "./ImportModal/ImportModal";
export { Header } from "./Shared/Header";
export { isImage, isVideo, trimmedName, imageDuration, audioSound } from "./utils";
export { AddMediaIcon } from './AddMediaIcon/AddMediaIcon';
export { Loading } from './Loading/Loading';
export { ErrorModal, showError } from "./ErrorToast/ErrorToast";
export { ImageWrapper } from './MediaWrapper/ImageWrapper';


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
