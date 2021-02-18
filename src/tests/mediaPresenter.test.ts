import { MediaPresenter } from "../MediaPresenter";
describe("media presenter", () => {
  let presenter: MediaPresenter;
  const imageFile = new File(["(⌐□_□)"], "blank.png", { type: "image/png" });
  const videoFile = new File(["(⌐□_□)"], "blank.mp4", { type: "video/mp4" });
  const textFile = new File(["(⌐□_□)"], "blank.pdf", {
    type: "application/pdf",
  });
  beforeEach(() => {
    presenter = new MediaPresenter();
  });

  describe("getMedia", () => {
    it("should return meidaStore element given an index", () => {
      presenter.addFile(videoFile);
      expect(presenter.media[0].file).toEqual(videoFile);
    });

    it("should return the correct media given an overflowed index", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      expect(presenter.getMedia(9)).toEqual(presenter.getMedia(0));
    });
  });

  describe("fileExists", () => {
    it("should return true if a file has been added", () => {
      presenter.addFile(videoFile);
      expect(presenter.fileExists(videoFile.name)).toEqual(true);
    });

    it("should return false if a file has not been added", () => {
      expect(presenter.filesLength).toEqual(0);
      expect(presenter.fileExists(videoFile.name)).toEqual(false);
    });
  });

  describe("addFile", () => {
    it("should append a file element to the files list", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      expect(presenter.media[0].file).toEqual(imageFile);
    });

    it("should return false if file is not an image or a video", () => {
      let returnVal = presenter.addFile(imageFile);
      expect(returnVal).toBe(true);
      returnVal = presenter.addFile(imageFile);
      expect(returnVal).toBe(false);
    });

    it("should return false if file a file is added twice", () => {
      const returnVal = presenter.addFile(textFile);
      expect(returnVal).toBe(false);
    });

    it("should not append a file element if file is not an image or a video", () => {
      expect(presenter.filesLength).toEqual(0);
      presenter.addFile(textFile);
      expect(presenter.filesLength).toEqual(0);
    });
    it("should return true if a video file is added", () => {
      const returnVal = presenter.addFile(videoFile);
      expect(returnVal).toBe(true);
    });
    it("should return true if an image file is added", () => {
      const returnVal = presenter.addFile(imageFile);
      expect(returnVal).toBe(true);
    });
  });

  describe("removeFile", () => {
    it("should remove a file element from the files list", () => {
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

    it("should remove the correct file given an overflowed index", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      presenter.removeFile(9);
      expect(presenter.filesLength).toEqual(0);
    });
  });

  describe("getFileName", () => {
    it("should return a string when a file exists", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      expect(presenter.media[0].file.name).toEqual(imageFile.name);
    });
    it("should return an empty string when a file does not exists", () => {
      expect(presenter.filesLength).toEqual(0);
      const name = presenter.getFileName(0);
      expect(name).toEqual("");
    });
  });

  describe("getFile", () => {
    it("should return a file when a file exists", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      const returnFile = presenter.getFile(0);
      expect(returnFile).toEqual(imageFile);
    });

    it("should return the correct file when provided overflowed index", () => {
      presenter.addFile(imageFile);
      expect(presenter.filesLength).toEqual(1);
      const returnFile = presenter.getFile(9);
      expect(returnFile).toEqual(imageFile);
    });
  });

  describe("duration information", () => {
    it("duration of each file should be initialised to 0", () => {
      presenter.addFile(videoFile);
      expect(presenter.getDuration(0)).toEqual(0);
    });

    it("duration of an image file should be 0", () => {
      presenter.addFile(imageFile);
      expect(presenter.getDuration(0)).toEqual(0);
    });

    it("should set duration for an existing file given index", () => {
      presenter.addFile(imageFile);
      const duration = 10;
      presenter.setDuration(0, duration);
      expect(presenter.getDuration(0)).toEqual(duration);
    });

    it("should set duration for an existing fileoverflowed index", () => {
      presenter.addFile(imageFile);
      const duration = 10;
      presenter.setDuration(9, duration);
      expect(presenter.getDuration(9)).toEqual(duration);
    });
  });

  describe("incrementReadyMedia", () => {
    it("increments readyMedia by 1", () => {
      expect(presenter.readyMedia).toEqual(0);
      presenter.incrementReadyMedia();
      expect(presenter.readyMedia).toEqual(1);
    });
  });

  describe("incrementFilePlayed", () => {
    it("should increment file played", () => {
      presenter.addFile(videoFile);
      const newDuration = 15;
      presenter.setDuration(0, newDuration);
      expect(presenter.getDuration(0)).toEqual(newDuration);
      const addedValue = 2;
      presenter.incrementFilePlayed(0, addedValue);
      let { duration, played } = presenter.getMedia(0)!;
      expect(played).toEqual(addedValue);
      expect(presenter.media[0].played).toEqual(addedValue);
    });

    it("should increment to proper amount if file played is overflowed", () => {
      presenter.addFile(videoFile);
      const newDuration = 8;
      presenter.setDuration(0, newDuration);
      expect(presenter.getDuration(0)).toEqual(newDuration);
      presenter.incrementFilePlayed(0, 5);
      presenter.incrementFilePlayed(0, 5);
      let { duration, played } = presenter.getMedia(0)!;
      expect(played).toEqual((5 + 5) % newDuration);
      expect(presenter.media[0].played).toEqual((5 + 5) % newDuration);
    });

    it("should not increment file played if file has 0 duration", () => {
      presenter.addFile(videoFile);
      expect(presenter.media[0].duration).toEqual(0);
      presenter.incrementFilePlayed(0, 15);
      expect(presenter.media[0].played).toEqual(0);
    });
  });
  
    describe("getFilePlayed", () => {
      it("should initialise file played to 0", () => {
        presenter.addFile(videoFile);
        expect(presenter.getFilePlayed(0)).toEqual(0);
      });

      it("should not increment file played if file has 0 duration", () => {
        presenter.addFile(videoFile);
        const played = 5;
        presenter.incrementFilePlayed(0, played);
        expect(presenter.getFilePlayed(0)).toEqual(0);
      });
  
      it("increments file played when file has a duration", () => {
        presenter.addFile(videoFile);
        const duration = 10;
        const played = 5;
        presenter.setDuration(0, duration);
        presenter.incrementFilePlayed(0, played);
        expect(presenter.getFilePlayed(0)).toEqual(presenter.media[0].played);
        expect(presenter.getFilePlayed(0)).toEqual(played);
      });
    });

  describe("resetAllPlayedFiles", () => {
    it("should reset all played to 0", () => {
      presenter.addFile(videoFile);
      presenter.setDuration(0, 20);
      const played = 5;
      presenter.incrementFilePlayed(0, played);
      expect(presenter.getFilePlayed(0)).toEqual(5);
      presenter.resetAllPlayedFiles();
      expect(presenter.getFilePlayed(0)).toEqual(0);
    });
  });

  describe("shuffleArray", () => {
    it("should not change the array order if there is only one file added", () => {
      presenter.addFile(videoFile);
      const previousArray = presenter.media;
      presenter.shuffleArray();
      expect(previousArray).toEqual(presenter.media);
    });
  });

  describe("switchOrder", () => {
    it("should switch index with new index", () => {
      presenter.addFile(videoFile);
      presenter.addFile(imageFile);
      expect(presenter.media[0].file).toEqual(videoFile);
      expect(presenter.media[1].file).toEqual(imageFile);
      presenter.switchOrder(0,1);
      expect(presenter.media[1].file).toEqual(videoFile);
      expect(presenter.media[0].file).toEqual(imageFile);
    });
  });

  describe("trimmedName", () => {
    it("should not trim name is it is shorter than 40", () => {
      presenter.addFile(videoFile);
      expect(MediaPresenter.trimmedName(videoFile.name)).toEqual("blank");
    });

    it("should trim name is it is longer than 30", () => {
      const fileName = "halo this is a";
      const extraFileName = fileName + " very very long file name";
      expect(MediaPresenter.trimmedName(extraFileName)).toContain(fileName);
      expect(MediaPresenter.trimmedName(extraFileName)).toContain("...");
    });
  });
});
