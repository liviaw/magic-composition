import { OutputPresenter } from "../OutputPresenter";
import { templates } from "../Template";

describe("output presenter", () => {
  let presenter: OutputPresenter;
  let mood = templates[0];

  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  beforeEach(() => {
    presenter = new OutputPresenter();
  });

  describe("playVideo", () => {
    it("should play the music", () => {
      presenter.playVideo();
      expect(presenter.music.play).toHaveBeenCalled();
    });

    it("should play the video", () => {
      presenter.playVideo();
      expect(presenter.play).toBe(true);
    });
  });

  describe("pauseVideo", () => {
    it("should pause the video", () => {
      presenter.pauseVideo();
      expect(presenter.play).toBe(false);
    });

    it("should pause the music", () => {
      presenter.pauseVideo();
      expect(presenter.music.pause).toHaveBeenCalled();
    });
  });

  describe("seekVideo", () => {
    it("should pause the music", () => {
      presenter.seekVideo(15);
      expect(presenter.music.pause).toHaveBeenCalled();
    });

    it("should seek the video", () => {
      presenter.setCurrMood(mood, 5);
      presenter.seekVideo(15);
      // hmm idk how to test this ???????????????????????????????????????
      // expect(presenter.playingMedia).toEqual(0);
    });
  });

  describe("adjustSound", () => {
    it("should decrease the volume when the music is near the end", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 100;
      presenter.currLength.end = 0;
      presenter.adjustSound();
      expect(presenter.music.volume).toEqual(0.49);
    });

    it("should increase the volume when the music is at the start", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 0;
      presenter.currLength.start = 100;
      presenter.adjustSound();
      expect(presenter.music.volume).toEqual(0.51);
    });

    it("should not change the volume in between the video", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 250;
      presenter.currLength.start = 0;
      presenter.currLength.end = 500;
      presenter.adjustSound();
      expect(presenter.music.volume).toEqual(0.5);
    });
  });

  describe("incrementPlayedSeconds", () => {
    it("should show how long the video is playing", () => {
      expect(presenter.playedSeconds).toEqual(0);
      expect(presenter.overallPlayedSeconds).toEqual(0);
      presenter.incrementPlayedSeconds(0.1);
      expect(presenter.playedSeconds).toEqual(0.1);
      expect(presenter.overallPlayedSeconds).toEqual(0.1);
    });

    it("should pause the video if it has reached the end", () => {
      presenter.overallPlayedSeconds = 99.9;
      presenter.currLength.totalDuration = 100;
      expect(presenter.playingMedia).toEqual(0);
      presenter.play = true;
      presenter.incrementPlayedSeconds(0.1);
      expect(presenter.play).toBe(false);
      expect(presenter.music.pause).toHaveBeenCalled();
    });
  });

  describe("incrementPlayingMedia", () => {
    it("should play the next video", () => {
      expect(presenter.playingMedia).toEqual(0);
      presenter.incrementPlayingMedia();
      expect(presenter.playingMedia).toEqual(1);
    });
  });

  describe("canShowDuration", () => {
    it("should always allow length type short to be played", () => {
      expect(presenter.canShowDuration(0, "short")).toBe(true);
    });

    it("shoud allow medium length to be shown when there is enough files", () => {
      expect(presenter.canShowDuration(1000, "medium")).toBe(true);
    });

    it("shoud not allow medium length to be shown when there is not enough files", () => {
      expect(presenter.canShowDuration(0, "medium")).toBe(false);
    });

    it("shoud allow long length to be shown when there is enough files", () => {
      expect(presenter.canShowDuration(1000, "long")).toBe(true);
    });

    it("shoud not allow long length to be shown when there is not enough files", () => {
      expect(presenter.canShowDuration(0, "long")).toBe(false);
    });

    it("shoud not allow length types that is not short, medium or long", () => {
      expect(presenter.canShowDuration(1000, "abcdefg")).toBe(false);
    });
  });

  describe("getSuitableLength", () => {
    it("should return short if there is not enough files", () => {
      expect(presenter.getSuitableLength(1)).toEqual("short");
    });

    it("should not return medium or if it cannot shows long length", () => {
      presenter.lengthIndex = "long";
      expect(presenter.getSuitableLength(1)).toEqual("short");
    });

    it("should return long length if there is enough files", () => {
      presenter.lengthIndex = "long";
      expect(presenter.getSuitableLength(1000)).toEqual("long");
    });
  });

  describe("setCurrTrack", () => {
    it("pause the previous music before setting a new music", () => {
      presenter.setCurrTrack(1, 1);
      expect(presenter.music.pause).toHaveBeenCalled();
    });

    it("should set a new music track", () => {
      presenter.trackIndex = 0;
      presenter.setCurrTrack(1, 1);
      expect(presenter.trackIndex).toEqual(1);
    });
  });

  describe("prevCurrTrack", () => {
    it("pause the previous music brefore setting a new music", () => {
      presenter.prevCurrTrack(1);
      expect(presenter.music.pause).toHaveBeenCalled();
    });

    it("should set music to the last track", () => {
      presenter.trackIndex = 0;
      const lastTrack = 2;
      presenter.currMood.tracks.length = lastTrack + 1;
      presenter.prevCurrTrack(1);
      expect(presenter.trackIndex).toEqual(lastTrack);
    });

    it("should set music to the previous track", () => {
      const lastTrack = 2;
      presenter.trackIndex = lastTrack;
      presenter.currMood.tracks.length = lastTrack + 1;
      presenter.prevCurrTrack(1);
      expect(presenter.trackIndex).toEqual(lastTrack - 1);
    });
  });

  describe("nextCurrTrack", () => {
    it("pause the previous music brefore setting a new music", () => {
      presenter.nextCurrTrack(1);
      expect(presenter.music.pause).toHaveBeenCalled();
    });

    it("should set music to the first track", () => {
      const lastTrack = 2;
      presenter.trackIndex = lastTrack;
      presenter.currMood.tracks.length = lastTrack;
      presenter.nextCurrTrack(1);
      expect(presenter.trackIndex).toEqual(0);
    });

    it("should set music to the next track", () => {
      const lastTrack = 2;
      presenter.trackIndex = 0;
      presenter.currMood.tracks.length = lastTrack;
      presenter.nextCurrTrack(1);
      expect(presenter.trackIndex).toEqual(1);
    });
  });

  describe("reset video", () => {
    it("should reload music", () => {
      presenter.resetVideo();
      expect(presenter.music.load).toHaveBeenCalled();
    });

    it("should pause video", () => {
      presenter.resetVideo();
      expect(presenter.play).toBe(false);
    });

    it("should reset time played to 0", () => {
      presenter.resetVideo();
      expect(presenter.playedSeconds).toEqual(0);
      expect(presenter.overallPlayedSeconds).toEqual(0);
    });

    it("should reset file index back to 0", () => {
      presenter.resetVideo();
      expect(presenter.playingMedia).toEqual(0);
    });
  });

  describe("handleLoaded", () => {
    it("should load the music if the music file is ready", () => {
      jest.spyOn(presenter.music, "readyState", "get").mockReturnValue(3);
      presenter.handleLoaded();
      expect(presenter.musicLoaded).toBe(true);
    });

    it("should not load the music if the music file is broken", () => {
      jest.spyOn(presenter.music, "readyState", "get").mockReturnValue(0);
      presenter.handleLoaded();
      expect(presenter.musicLoaded).toBe(false);
    });

    it("should not load the music if the music file is not ready", () => {
      jest.spyOn(presenter.music, "readyState", "get").mockReturnValue(1);
      presenter.handleLoaded();
      expect(presenter.musicLoaded).toBe(false);
    });

    it("should load the music if the music file is ready", () => {
      jest.spyOn(presenter.music, "readyState", "get").mockReturnValue(3);
      const musicVolume = 0.5;
      presenter.defaultMusicVolume = musicVolume;
      presenter.handleLoaded();
      expect(presenter.music.volume).toEqual(musicVolume);
    });
  });

  describe("seekPlayMusic", () => {
    it("should seek to the start of the music", () => {
      const startTime = 5;
      presenter.currLength.start = startTime;
      presenter.seekPlayMusic();
      expect(presenter.music.currentTime).toEqual(startTime);
    });
  });

  describe("musicName", () => {
    it("should append music name with ... if it is too long to display", () => {
      presenter.currTrack.musicName =
        "this is a very very long music track name";
      expect(presenter.musicName).toContain("...");
    });
  });
});
