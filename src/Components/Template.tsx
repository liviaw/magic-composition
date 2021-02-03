import oceanMusic from "../Audio/ocean.mp3";
import neutral from "../Audio/summer.mp3";
import extreme from "../Audio/extreme.mp3";
import jazzy from "../Audio/jazzy.mp3";
import gentle from "../Audio/gentle.mp3";
import uplifting from "../Audio/uplifting.mp3";

/*
 * Music always start with calm, short, track[0]
 * if there are too many photos, then not all of them will be shown
 * durationsin seconds
 * slots is the available timings for each video/image file
 * in a situation where a video file is longer than a slot, then the video will be trimmed
 * when a video file is shorter than a slot, then the video will be looped
 */

export type slotEl = {
  length: "short" | "medium" | "long";
  slot: number[];
  totalDuration: number;
};

export type templateEl = {
  title: string;
  musicTrack: string;
  musicDuration: number;
  musicName: string;
  musicOptions: string[];
  short: slotEl;
  medium: slotEl;
  long: slotEl;
};

export const templates: { [name: string]: templateEl } = {
  calm: {
    title: "calm",
    musicTrack: oceanMusic,
    musicDuration: 101,
    musicName: "ocean sound",
    musicOptions: [],
    short: {
      length: "short",
      slot: [14, 14, 12],
      totalDuration: 40,
    },
    medium: {
      length: "medium",
      slot: [15, 15, 19, 8, 7, 14],
      totalDuration: 78,
    },
    long: {
      length: "long",
      slot: [15, 20, 21, 17, 13, 15],
      totalDuration: 100,
    },
  },
  gentle: {
    title: "gentle",
    musicTrack: gentle,
    musicDuration: 295,
    musicName: "Always with me - spirited away - Youmi Kimura",
    musicOptions: [],
    short: {
      length: "short",
      slot: [7, 5, 5, 7, 6],
      totalDuration: 30,
    },
    medium: {
      length: "medium",
      slot: [8, 10, 8, 5, 6, 7, 5, 5, 6],
      totalDuration: 60,
    },
    long: {
      length: "long",
      slot: [14, 15, 10, 10, 7, 8, 4, 5, 15, 12, 7, 3, 5],
      totalDuration: 115,
    },
  },
  neutral: {
    title: "neutral",
    musicTrack: neutral,
    musicDuration: 181,
    musicName: "Summertime Rain",
    musicOptions: [],
    short: {
      length: "short",
      slot: [7, 5, 5, 3, 6, 5],
      totalDuration: 31,
    },
    medium: {
      length: "medium",
      slot: [7, 3, 7, 5, 5, 3, 6, 7, 5, 5, 6, 4, 4, 3],
      totalDuration: 70,
    },
    // mb add start time and end time of music
    long: {
      length: "long",
      slot: [15, 10, 10, 11, 5, 5, 25, 20],
      totalDuration: 100,
    },
  },
  uplifting: {
    title: "uplifting",
    musicTrack: uplifting,
    musicDuration: 291,
    musicName: "Kimino nawa instrumental",
    musicOptions: [],
    short: {
      length: "short",
      slot: [6, 6, 6, 3, 5],
      totalDuration: 26,
    },
    medium: {
      length: "medium",
      slot: [5, 7, 5, 5, 6, 7, 5, 5, 3, 6, 4, 2, 4, 3],
      totalDuration: 67,
    },
    long: {
      length: "long",
      slot: [10, 7, 7, 8, 8, 6, 6, 5, 7, 5, 5, 3, 6, 2, 4, 5, 4, 5, 4, 9],
      totalDuration: 116,
    },
  },
  epic: {
    title: "epic",
    musicTrack: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3",
    musicDuration: 192,
    musicName: "Remix Music",
    musicOptions: [],
    short: {
      length: "short",
      slot: [3, 5, 5, 3, 6],
      totalDuration: 22,
    },
    medium: {
      length: "medium",
      slot: [5, 7, 2, 5, 5, 3, 6, 6, 5, 5, 3, 6, 2, 2, 4, 6],
      totalDuration: 72,
    },
    long: {
      length: "long",
      slot: [
        7,
        7,
        3,
        5,
        5,
        3,
        6,
        3,
        2,
        7,
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
        2,
        5,
        4,
      ],
      totalDuration: 93,
    },
  },
  jazzy: {
    title: "jazzy",
    musicTrack: jazzy,
    musicDuration: 331,
    musicName: "Dusk - Orchard Heights",
    musicOptions: [],
    short: {
      length: "short",
      slot: [3, 7, 5, 5, 3, 6],
      totalDuration: 29,
    },
    medium: {
      length: "medium",
      slot: [5, 3, 4, 2, 5, 5, 3, 6, 7, 5, 5, 3, 6, 2, 2, 4, 7],
      totalDuration: 74,
    },
    long: {
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
  extreme: {
    title: "extreme",
    musicTrack: extreme,
    musicDuration: 122,
    musicName: "adrenalize",
    musicOptions: [],
    short: {
      length: "short",
      slot: [2, 1, 3, 3, 6],
      totalDuration: 15,
    },
    medium: {
      length: "medium",
      slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2, 1, 3],
      totalDuration: 45,
    },
    long: {
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
};
