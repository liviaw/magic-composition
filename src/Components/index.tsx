export { CreateVideo } from './CreateVideo/CreateVideo';
export { default as Import } from "./Import/Import";
export { ErrorModal, showError } from "./ErrorToast/ErrorToast";
export { Header } from "./Shared/Header";
export { isImage, isVideo, trimmedName } from "./utils";
export { Loading } from './Loading/Loading';
export {AddMedia} from './AddMedia/AddMedia';

export class Media {
  filename: string;
  type: string;
  element: JSX.Element;
  constructor(filename: string, type: string, element: JSX.Element) {
    this.filename = filename;
    this.type = type;
    this.element = element;
  }
  // methods here:
  createElement() {
    return this.element;
  }
}
