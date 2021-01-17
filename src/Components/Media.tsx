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
  