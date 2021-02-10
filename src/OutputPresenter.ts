import * as mobx from "mobx";
import { templates } from "./Components/Template";
import type {
  Mood,
  TrackEl,
  LengthEl,
  DurationTypes,
} from "./Components/Template";

const MAXLEN = 25;

export class OutputPresenter {
  constructor() {
    mobx.makeObservable(this);
  }
  @mobx.observable
  play: boolean = false;

  // same as mediaCounter
  @mobx.observable
  playingMedia: number = 0;

  @mobx.observable
  playedSeconds: number = 0;

  @mobx.observable
  overallPlayedSeconds: number = 0;

  @mobx.observable
  currMood: Mood = templates[0];
  @mobx.observable
  trackIndex: number = 0;
  @mobx.observable
  currTrack: TrackEl = this.currMood.tracks[this.trackIndex];

  @mobx.observable
  lengthIndex: DurationTypes = "short";

  @mobx.observable
  currLength: LengthEl = this.currMood.tracks[0][this.lengthIndex];

  @mobx.observable
  musicLoaded: boolean = false;

  @mobx.observable
  music: HTMLAudioElement = new Audio(this.currTrack.musicTrack);

  @mobx.computed
  get isPlaying(): boolean {
    return this.play;
  }

  @mobx.computed
  get currMoodLen(): number {
    return this.currMood.tracks.length;
  }

  @mobx.action
  playVideo(): void {
    if (this.playedSeconds >= this.currLength.totalDuration) {
      console.log("resetting video");
      this.resetVideo();
    }
    this.music.play();
    this.play = true;
  }
  @mobx.action
  pauseVideo(): void {
    this.music.pause();
    this.play = false;
  }

  @mobx.action
  setPlayingMedia(newMedia: number): void {
    this.playingMedia = newMedia;
  }

  @mobx.computed
  get currPlayingMedia(): number {
    return this.playingMedia;
  }

  @mobx.action
  increPlayedSeconds(seconds: number) {
    this.playedSeconds += seconds;
    this.overallPlayedSeconds += seconds;
    this.adjustSound();
    if (this.playedSeconds >= this.currLength.slot[this.playingMedia]) {
      this.playingMedia += 1;
      this.playedSeconds = 0;
    }
  }

  @mobx.action
  adjustSound() {
    if (this.music.currentTime >= this.currLength.end - 4) {
      if (this.music.volume - 0.2 >= 0) {
        this.music.volume -= 0.2;
      }
    } else if (this.music.currentTime - 4 <= this.currLength.start) {
      if (this.music.volume + 0.1 <= 1) {
        this.music.volume += 0.1;
      }
    }
  }
  @mobx.action
  incrementPlayingMedia(): void {
    this.playingMedia++;
  }

  @mobx.computed
  get currSlotLength(): number {
    return this.currLength.slot.length;
  }

  @mobx.computed
  get totalVideoDuration(): number {
    return this.currLength.totalDuration;
  }

  @mobx.computed
  get currOverallPlayedSeconds(): number {
    return this.overallPlayedSeconds;
  }

  @mobx.action
  setCurrMood(newTemplate: Mood, filesLength: number) {
    this.currMood = newTemplate;
    this.setCurrTrack(0, filesLength);
  }

  @mobx.computed
  get templateMood(): string {
    return this.currMood.style;
  }
  @mobx.action
  setTrackIndex(newIndex: number): void {
    this.trackIndex = newIndex;
  }
  // lets say current is long, user changes mood, and the current moodTemplate do not support long
  getSuitableLength(filesLength: number): string {
    if (this.canShowDuration(filesLength, this.lengthIndex)) {
      return this.lengthIndex;
    }
    if (
      this.lengthIndex === "long" &&
      this.canShowDuration(filesLength, "medium")
    ) {
      return "medium";
    }
    return "short";
  }

  @mobx.action
  setCurrTrack(trackIndex: number, filesLength: number): void {
    this.trackIndex = trackIndex;
    this.currTrack = this.currMood.tracks[trackIndex];
    this.music.pause();
    this.music = new Audio(this.currTrack.musicTrack);
    this.setCurrLength(this.getSuitableLength(filesLength));
  }

  @mobx.action
  prevCurrTrack(filesLength: number): void {
    if (this.trackIndex - 1 < 0) {
      this.setCurrTrack(this.currMood.tracks.length - 1, filesLength);
    } else {
      this.setCurrTrack(this.trackIndex - 1, filesLength);
    }
  }

  @mobx.action
  nextCurrTrack(filesLength: number): void {
    if (this.trackIndex + 1 >= this.currMood.tracks.length) {
      this.setCurrTrack(0, filesLength);
    } else {
      this.setCurrTrack(this.trackIndex + 1, filesLength);
    }
  }

  @mobx.action
  setCurrLength(newLength: string) {
    if (
      newLength === "short" ||
      newLength === "medium" ||
      newLength === "long"
    ) {
      this.lengthIndex = newLength;
      this.currLength = this.currTrack[newLength];
      this.resetVideo();
    } else {
      alert(newLength + " is not short, medium or long");
    }
  }

  canShowDuration(filesLength: number, duration: string): boolean {
    if (duration === "short") return true;
    if (
      duration === "medium" &&
      this.currTrack.medium.slot.length <= filesLength * 3
    ) {
      return true;
    }
    if (
      duration === "long" &&
      this.currTrack.medium.slot.length <= filesLength * 3 &&
      this.currTrack.long.slot.length <= filesLength * 3
    ) {
      return true;
    }
    return false;
  }

  @mobx.computed
  get templateLength(): string {
    return this.currLength.length;
  }

  resetVideo(): void {
    this.music.load();
    this.setMusicLoaded(false);
    this.playedSeconds = 0;
    this.playingMedia = 0;
    this.overallPlayedSeconds = 0;
    this.play = false;
    this.seekPlayMusic();
  }

  @mobx.action
  setMusicLoaded(loaded: boolean): void {
    this.musicLoaded = loaded;
  }

  @mobx.action
  toggleMusicLoaded(): void {
    this.musicLoaded = !this.musicLoaded;
  }

  @mobx.action
  seekPlayMusic(): void {
    this.music.currentTime = this.currLength.start;
    this.music.addEventListener("canplaythrough", (event) => {
      if (this.music.readyState >= 3) {
        this.setMusicLoaded(true);
        this.music.volume = 0.7;
      }
    });
  }

  @mobx.computed
  get currMusic(): HTMLAudioElement {
    return this.music;
  }

  @mobx.computed
  get currMusicLoaded(): boolean {
    return this.musicLoaded;
  }
  @mobx.computed
  get musicName(): string {
    if (this.currTrack.musicName.length >= MAXLEN) {
      return this.currTrack.musicName.substr(0, MAXLEN - 3) + "...";
    }
    return this.currTrack.musicName;
  }
}

export const outputPresenter = new OutputPresenter();
