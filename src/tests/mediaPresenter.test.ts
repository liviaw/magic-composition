import { MediaPresenter } from "../MediaPresenter";
describe("media presenter", () => {
let presenter:MediaPresenter;
const imageFile = new File(['(⌐□_□)'], 'blank.png', { type: 'image/png' })
const videoFile = new File(['(⌐□_□)'], 'blank.mp4', { type: 'video/mp4' })
const textFile = new File(['(⌐□_□)'], 'blank.pdf', { type: 'application/pdf' })
  beforeEach(() => {
    presenter = new MediaPresenter();
  });
  describe("addFile", () => {
    it("should append a file element to the files list", () => {
        expect(presenter.filesLength).toEqual(0);
        presenter.addFile(imageFile);
        expect(presenter.filesLength).toEqual(1);
        expect(presenter.media[0].file).toEqual(imageFile);
    });

    it("should return false if file is not an image or a video", () => {
        let returnVal = presenter.addFile(textFile);
        expect(returnVal).toBe(false);
    });
  
    it("should not append a file element if file is not an image or a video", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(textFile);
        expect(presenter.filesLength).toEqual(0);
    });
    it("should return true if a video file is added", () => {
      let returnVal = presenter.addFile(videoFile);
        expect(returnVal).toBe(true);
    });
    it("should return true if an image file is added", () => {
      let returnVal = presenter.addFile(imageFile);
        expect(returnVal).toBe(true);
    });
  });

  describe("removeFile", () => {
    it("should remove a file element from the files list", () => {
        expect(presenter.filesLength).toEqual(0);
        presenter.addFile(imageFile);
        expect(presenter.filesLength).toEqual(1);
        presenter.removeFile(0);
        expect(presenter.filesLength).toEqual(0);
    });

    it("should not remove a file when files list is empty", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.removeFile(0);
      expect(presenter.filesLength).toEqual(0);
    });
    

    it("should mod a file index", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      presenter.removeFile(9);
      expect(presenter.filesLength).toEqual(0);
    });
  });

  describe("getFileName", () => {
    it("should return a string when a file exists", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      const name = presenter.getFileName(0);
      expect(name).toEqual(presenter.media[0].file.name);
      expect(name).toEqual(imageFile.name);
    });
    it("should return an empty string when a file does not exists", () => {
      expect(presenter.filesLength).toEqual(0);
      const name = presenter.getFileName(0);
      expect(name).toEqual("");
    });
  })
  describe("getFile", () => {
    it("should return a file when a file exists", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      const returnFile = presenter.getFile(0);
      expect(returnFile).toEqual(imageFile);
    });

    it("should return the correct file when provided overflowed index", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      const returnFile = presenter.getFile(9);
      expect(returnFile).toEqual(imageFile);
    });
  });
});
