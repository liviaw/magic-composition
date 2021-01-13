// i feel like these should be inside globla.t, or is this okay?
export { VideoModal } from './VideoModal/VideoModal';
export {VideoProgressBar} from './VideoModal/VideoProgressBar';
export { ImportModal } from "./ImportModal/ImportModal";
export { ErrorModal, showError } from "./ErrorToast/ErrorToast";
export { Header } from "./Shared/Header";
export { isImage, isVideo, trimmedName, imageDuration, audioSound } from "./utils";
export { Loading } from './Loading/Loading';
export {AddMediaIcon} from './AddMediaIcon/AddMediaIcon';
export {ImageWrapper} from './ImageWrapper/ImageWrapper';

export class Media {
  filename: string;
  type: string;
  element: JSX.Element;
  duration:number;
  constructor(filename: string, type: string, element: JSX.Element, duration:number=1000) {
    this.filename = filename;
    this.type = type;
    this.element = element;
    this.duration = duration;
  }
}
