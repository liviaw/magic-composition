import { OutputPresenter } from "../OutputPresenter";
describe("output presenter", () => {
  let presenter: OutputPresenter;
  const imageFile = new File(["(⌐□_□)"], "blank.png", { type: "image/png" });
  const videoFile = new File(["(⌐□_□)"], "blank.mp4", { type: "video/mp4" });
  const textFile = new File(["(⌐□_□)"], "blank.pdf", {
    type: "application/pdf",
  });
  beforeEach(() => {
    presenter = new OutputPresenter();
  });

  describe("playVideo", () => {
    it("should return meidaStore element given an index", () => {
      presenter.playVideo();
      expect(presenter.media[0].file).toEqual(videoFile);
    });

    it("should return the correct media given an overflowed index", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      expect(presenter.getMedia(9)).toEqual(presenter.getMedia(0));
    });
  });
});
