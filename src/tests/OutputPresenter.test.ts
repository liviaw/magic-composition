import { OutputPresenter } from "../OutputPresenter";
import { templates } from "../Template";
describe("output presenter", () => {
  let presenter: OutputPresenter;
  let mood = templates[0];

  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();
  const adjustSound = jest.fn();
  beforeEach(() => {
    presenter = new OutputPresenter();
  });

  describe("playVideo", () => {
    it("should set play viriable as true when played second is greater than total duration", () => {
      presenter.overallPlayedSeconds = 10;
      presenter.currLength.totalDuration = 5;
      presenter.music = new Audio(mood.tracks[0].musicTrack);
      presenter.playVideo();
      expect(presenter.music.play).toHaveBeenCalled();
      expect(presenter.play).toBe(true);
    });

    it("should set play as true", () => {
      presenter.play = false;
      presenter.playVideo();
      expect(presenter.play).toBe(true);
    });
  });

  describe("pauseVideo", () => {
    it("should set play as false", () => {
      presenter.play = true;
      presenter.pauseVideo();
      expect(presenter.play).toBe(false);
    });

    it("should pause music", () => {
      presenter.pauseVideo();
      expect(presenter.music.pause).toHaveBeenCalled();
    })
  });

  describe("setPlayingMedia", () => {
    it("should set playingMedia to the passed in value", () => {
      presenter.setPlayingMedia(0);
      expect(presenter.playingMedia).toEqual(0);
    });
  });

  describe("incrementPlayedSeconds", () => {
    it("should increase the value of playedMedia by 1 if playedseconds is longer than given slot", () => {
      expect(presenter.playingMedia).toEqual(0);
      presenter.playedSeconds = 100;
      presenter.currLength.slot[0] = 5;
      presenter.incrementPlayedSeconds(0.1);
      expect(presenter.playingMedia).toEqual(1);
    });

    it("should increase the value of playedSeconds by 1 by the passed in seconds", () => {
      expect(presenter.playedSeconds).toEqual(0);
      presenter.playedSeconds = 0;
      presenter.currLength.slot[0] = 100;
      presenter.incrementPlayedSeconds(0.1);
      expect(presenter.playedSeconds).toEqual(0.1);
    });

    it("should increase the value of overallPlayedSeconds by 1 by the passed in seconds", () => {
      expect(presenter.overallPlayedSeconds).toEqual(0);
      presenter.incrementPlayedSeconds(0.1);
      expect(presenter.overallPlayedSeconds).toEqual(0.1);
    });

    it("should pause if overall played second is greater than total video duration", () => {
      presenter.overallPlayedSeconds = 1000;
      presenter.setCurrTrack(0, 2);
      expect(presenter.music.pause).toHaveBeenCalled();
    });
  });

  describe("adjustSound", () => {
    it("should decrease the volume by 0.01 given currentTime is greater than (endofmusic - VOLUMEPOINT)", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 100;
      presenter.currLength.end = 0;
      presenter.adjustSound();
      expect(presenter.music.volume ).toEqual(0.49);
    });

    it("should increase the volume by 0.01 given currentTime is less than or equal (startofmusic + VOLUMEPOINT)", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 0;
      presenter.currLength.start = 100;
      presenter.adjustSound();
      expect(presenter.music.volume ).toEqual(0.51);
    });
    
    it("should not change the volume in between the video", () => {
      presenter.music.volume = 0.5;
      presenter.music.currentTime = 250;
      presenter.currLength.start = 0;
      presenter.currLength.end = 500;
      presenter.adjustSound();
      expect(presenter.music.volume ).toEqual(0.5);
    });
  });

  describe("incrementPlayingMedia", () => {
    it("should increase the value of playingMedia by 1", () => {
      expect(presenter.playingMedia).toEqual(0);
      presenter.incrementPlayingMedia();
      expect(presenter.playingMedia).toEqual(1);
    });
  });
});
