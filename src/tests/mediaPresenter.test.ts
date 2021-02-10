import { MediaPresenter } from "../MediaPresenter";
describe("media presenter", () => {
let presenter:MediaPresenter;
const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
const videoFile = new File(['(⌐□_□)'], 'chucknorris.mp4', { type: 'video/mp4' })
  beforeEach(() => {
    presenter = new MediaPresenter();
  });
  describe("addFile", () => {
    it("should append a file element to the files list", () => {
        expect(presenter.filesLength).toEqual(0);
        presenter.addFile(file);
        expect(presenter.filesLength).toEqual(1);
        expect(presenter.files[0]).toEqual(file);
    });

    it("should return false if file is not an image and not a video", () => {});
    //  should return true oif file is added
  });
});
