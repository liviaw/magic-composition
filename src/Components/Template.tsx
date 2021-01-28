import oceanMusic from "../Audio/ocean.mp3";
import neutral from "../Audio/summer.mp3";
import extreme from "../Audio/extreme.mp3";
import jazzy from "../Audio/jazzy.mp3";
import gentle from "../Audio/gentle.mp3";
import uplifting from "../Audio/uplifting.mp3";

// duration is the length of each media displayed in video
// if there are too many photos, then mb dont show all? (for now)
// length is the length of the final video
// durations and lengths in seconds
// slots is the available timings for each video/image file
// more documentation will be written on this

export type slotEl = {
  length: "short" | "medium" | "long";
  slot: number[];
  slotLength: number;
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
      slotLength: 40,
    },
    medium: {
      length: "medium",
      slot: [15, 15, 19, 8, 7, 14],
      slotLength: 78,
    },
    long: {
      length: "long",
      slot: [15, 20, 21, 17, 13, 15],
      slotLength: 100,
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
      slotLength: 30,
    },
    medium: {
      length: "medium",
      slot: [8, 10, 8, 5, 6, 7, 5, 5, 6],
      slotLength: 60,
    },
    long: {
      length: "long",
      slot: [14, 15, 10, 10, 7, 8, 4, 5, 15, 12, 7, 3, 5],
      slotLength: 115,
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
      slotLength: 31,
    },
    medium: {
      length: "medium",
      slot: [7, 3, 7, 5, 5, 3, 6, 7, 5, 5, 6, 4, 4, 3],
      slotLength: 70,
    },
    // mb add start time and end time of music
    long: {
      length: "long",
      slot: [15, 10, 10, 11, 5, 5, 25, 20],
      slotLength: 100,
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
      slotLength: 26,
    },
    medium: {
      length: "medium",
      slot: [5, 7, 5, 5, 6, 7, 5, 5, 3, 6, 4, 2, 4, 3],
      slotLength: 67,
    },
    long: {
      length: "long",
      slot: [10, 7, 7, 8, 8, 6, 6, 5, 7, 5, 5, 3, 6, 2, 4, 5, 4, 5, 4, 9],
      slotLength: 116,
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
      slotLength: 22,
    },
    medium: {
      length: "medium",
      slot: [5, 7, 2, 5, 5, 3, 6, 6, 5, 5, 3, 6, 2, 2, 4, 6],
      slotLength: 72,
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
      slotLength: 93,
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
      slotLength: 29,
    },
    medium: {
      length: "medium",
      slot: [5, 3, 4, 2, 5, 5, 3, 6, 7, 5, 5, 3, 6, 2, 2, 4, 7],
      slotLength: 74,
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
      slotLength: 95,
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
      slotLength: 15,
    },
    medium: {
      length: "medium",
      slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2, 1, 3],
      slotLength: 45,
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
      slotLength: 72,
    },
  },
};
