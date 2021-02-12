import ocean from "../Audio/Calm/ocean.mp3";
import dreaming from "../Audio/Calm/helios-dreaming.mp3";
import child from "../Audio/Calm/ryan-farish -child.mp3";
import neutral from "../Audio/Neutral/summer.mp3";
import adrenalize from "../Audio/Extreme/root-basket-adrenalize.mp3";
import fantastic from "../Audio/Extreme/big-bang-fantastic-baby.mp3";
import signs from "../Audio/Neutral/divide-by-nine-signs.mp3";
import jazzy from "../Audio/jazzy.mp3";
import gentle from "../Audio/gentle.mp3";
import uplifting from "../Audio/uplifting.mp3";

/*
 * Audio always start with calm, short, track[0]
 * if there are too many photos, then not all of them will be shown
 * durationsin seconds
 * slots is the available timings for each video/image file
 * in a situation where a video file is longer than a slot, then the video will be trimmed
 * when a video file is shorter than a slot, then the video will be looped
 */

export type DurationTypes = "short" | "medium" | "long";

export type LengthEl = {
  start: number;
  end: number;
  length: DurationTypes;
  slot: number[];
  totalDuration: number;
};

export type TrackEl = {
  musicTrack: string;
  musicDuration: number;
  artist: string;
  musicName: string;
  short: LengthEl;
  medium: LengthEl;
  long: LengthEl;
};

export type Mood = { style: string; tracks: TrackEl[] };

export const templates: Mood[] = [
  {
    style: "calm",
    tracks: [
      {
        musicTrack: ocean,
        musicDuration: 101,
        artist: "",
        musicName: "Ocean Sound",
        short: {
          start: 0,
          end: 16,
          length: "short",
          slot: [2, 4, 4, 6],
          totalDuration: 16,
        },
        medium: {
          start: 0,
          end: 38,
          length: "medium",
          slot: [6, 6, 5, 8, 6, 7],
          totalDuration: 47,
        },
        long: {
          start: 0,
          end: 60,
          length: "long",
          slot: [7, 8, 15, 6, 9, 15],
          totalDuration: 60,
        },
      },
      {
        musicTrack: dreaming,
        musicDuration: 285,
        artist: "Helios",
        musicName: "Dreaming",
        short: {
          start: 0,
          end: 40,
          length: "short",
          slot: [14, 14, 12],
          totalDuration: 40,
        },
        medium: {
          start: 0,
          end: 78,
          length: "medium",
          slot: [15, 15, 10, 9, 8, 7, 14],
          totalDuration: 78,
        },
        long: {
          start: 5,
          end: 100,
          length: "long",
          slot: [5, 4, 7, 6, 5, 5, 5, 7, 3, 5, 6, 8, 7, 8, 5, 5, 5],
          totalDuration: 95,
        },
      },
      {
        musicTrack: child,
        musicDuration: 101,
        artist: "Ryan Farish",
        musicName: "Child",
        short: {
          start: 0,
          end: 40,
          length: "short",
          slot: [14, 14, 12],
          totalDuration: 40,
        },
        medium: {
          start: 0,
          end: 70,
          length: "medium",
          slot: [15, 15, 11, 8, 7, 14],
          totalDuration: 70,
        },
        long: {
          start: 0,
          end: 100,
          length: "long",
          slot: [15, 12, 8, 14, 7, 17, 13, 15],
          totalDuration: 100,
        },
      },
    ],
  },
  {
    style: "gentle",
    tracks: [
      {
        musicTrack: gentle,
        musicDuration: 295,
        artist: "Youmi Kimura",
        musicName: "Always with me - spirited away",
        short: {
          start: 197,
          end: 222,
          length: "short",
          slot: [6, 3, 4, 4, 3, 5],
          totalDuration: 25,
        },
        medium: {
          start: 6,
          end: 62,
          length: "medium",
          slot: [3, 5, 5, 4, 5, 5, 6, 7, 5, 5, 6],
          totalDuration: 56,
        },
        long: {
          start: 25,
          end: 140,
          length: "long",
          slot: [4, 10, 7, 3, 10, 5, 10, 7, 8, 4, 5, 15, 12, 7, 3, 5],
          totalDuration: 115,
        },
      },
    ],
  },
  {
    style: "neutral",
    tracks: [
      {
        musicTrack: neutral,
        musicDuration: 181,
        artist: "",
        musicName: "Summertime Rain",
        short: {
          start: 0,
          end: 31,
          length: "short",
          slot: [7, 5, 5, 3, 6, 5],
          totalDuration: 31,
        },
        medium: {
          start: 0,
          end: 70,
          length: "medium",
          slot: [7, 9, 7, 5, 5, 6, 7, 5, 5, 6, 8],
          totalDuration: 70,
        },
        // mb add start time and end time of music
        long: {
          start: 0,
          end: 100,
          length: "long",
          slot: [7, 8, 11, 6, 11, 5, 5, 7, 6, 7, 8, 7, 8, 5, 6],
          totalDuration: 107,
        },
      },
      {
        musicTrack: signs,
        musicDuration: 151,
        artist: "Divide by Nine",
        musicName: "Signs",
        short: {
          start: 1,
          end: 32,
          length: "short",
          slot: [7, 5, 5, 3, 6, 5],
          totalDuration: 31,
        },
        medium: {
          start: 1,
          end: 51,
          length: "medium",
          slot: [7, 3, 7, 3, 6, 7, 6, 4, 4, 3],
          totalDuration: 50,
        },
        // mb add start time and end time of music
        long: {
          start: 1,
          end: 149,
          length: "long",
          slot: [
            6,
            9,
            7,
            8,
            10,
            4,
            4,
            7,
            4,
            5,
            10,
            11,
            15,
            5,
            5,
            5,
            7,
            3,
            6,
            4,
            7,
            6,
          ],
          totalDuration: 148,
        },
      },
    ],
  },
  {
    style: "uplifting",
    tracks: [
      {
        musicTrack: uplifting,
        musicDuration: 291,
        artist: "",
        musicName: "Kimino nawa instrumental",
        short: {
          start: 40,
          end: 66,
          length: "short",
          slot: [6, 6, 6, 3, 5],
          totalDuration: 26,
        },
        medium: {
          start: 13,
          end: 82,
          length: "medium",
          slot: [5, 7, 5, 5, 6, 5, 4, 5, 5, 3, 6, 4, 2, 4, 3],
          totalDuration: 69,
        },
        long: {
          start: 100,
          end: 216,
          length: "long",
          slot: [10, 7, 7, 8, 8, 6, 6, 5, 7, 5, 5, 3, 6, 2, 4, 5, 4, 5, 4, 9],
          totalDuration: 116,
        },
      },
    ],
  },
  {
    style: "jazzy",
    tracks: [
      {
        musicTrack: jazzy,
        musicDuration: 291,
        artist: "",
        musicName: "Dusk",
        short: {
          start: 0,
          end: 29,
          length: "short",
          slot: [3, 7, 5, 5, 3, 6],
          totalDuration: 29,
        },
        medium: {
          start: 10,
          end: 84,
          length: "medium",
          slot: [5, 3, 4, 2, 5, 5, 3, 6, 7, 5, 5, 3, 6, 2, 2, 4, 7],
          totalDuration: 74,
        },
        long: {
          start: 100,
          end: 195,
          length: "long",
          slot: [
            5,
            5,
            8,
            3,
            5,
            5,
            3,
            6,
            3,
            2,
            2,
            2,
            3,
            5,
            5,
            3,
            6,
            2,
            2,
            4,
            2,
            3,
            2,
            5,
            4,
          ],
          totalDuration: 95,
        },
      },
    ],
  },
  {
    style: "extreme",
    tracks: [
      {
        musicTrack: fantastic,
        musicDuration: 233,
        musicName: "Fantastic Baby",
        artist: "Big Bang",
        short: {
          start: 50,
          end: 115,
          length: "short",
          slot: [2, 1, 3, 3, 6],
          totalDuration: 15,
        },
        medium: {
          start: 50,
          end: 146,
          length: "medium",
          slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2, 1, 3],
          totalDuration: 46,
        },
        long: {
          start: 0,
          end: 67,
          length: "long",
          slot: [
            1,
            1,
            1,
            2,
            1,
            1,
            1,
            2,
            3,
            3,
            2,
            2,
            3,
            2,
            3,
            3,
            1,
            2,
            1,
            1,
            3,
            3,
            2,
            2,
            4,
            2,
            3,
            2,
            3,
            2,
            1,
            2,
            2,
          ],
          totalDuration: 67,
        },
      },
      {
        musicTrack: adrenalize,
        musicDuration: 122,
        musicName: "adrenalize",
        artist: "Root Basket",
        short: {
          start: 0,
          end: 15,
          length: "short",
          slot: [2, 1, 3, 3, 6],
          totalDuration: 15,
        },
        medium: {
          start: 5,
          end: 47,
          length: "medium",
          slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2],
          totalDuration: 42,
        },
        long: {
          start: 0,
          end: 72,
          length: "long",
          slot: [
            2,
            2,
            2,
            2,
            1,
            3,
            3,
            3,
            3,
            2,
            2,
            3,
            2,
            3,
            3,
            1,
            2,
            1,
            1,
            3,
            3,
            2,
            2,
            4,
            2,
            3,
            2,
            3,
            2,
            1,
            2,
            2,
          ],
          totalDuration: 72,
        },
      },
    ],
  },
];
