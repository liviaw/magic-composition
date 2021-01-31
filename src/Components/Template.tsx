import ocean from "../Music/Calm/ocean.mp3";
import dreaming from "../Music/Calm/helios-dreaming.mp3";
import child from "../Music/Calm/ryan-farish -child.mp3";
import neutral from "../Music/Neutral/summer.mp3";
import adrenalize from "../Music/Extreme/root-basket-adrenalize.mp3";
import fantastic from "../Music/Extreme/big-bang-fantastic-baby.mp3";
import signs from "../Music/Neutral/divide-by-nine-signs.mp3";

export type slotEl = {
	start: number;
	end: number;
	length: "short" | "medium" | "long";
	slot: number[];
	slotLength: number;
};

export type templateEl = {
	musicTrack: string;
	musicDuration: number;
	artist: string;
	musicName: string;
	short: slotEl;
	medium: slotEl;
	long: slotEl;
};

export type musicElement = { style: string, tracks: templateEl[] };

//style = templates[index].style
//track = templates[index].tracks[trackIndex]

export const templates: musicElement[] = [
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
					end: 20,
					length: "short",
					slot: [6, 4, 4, 6],
					slotLength: 40,
				},
				medium: {
					start: 0,
					end: 47,
					length: "medium",
					slot: [6, 4, 6, 5, 8, 6, 7, 5],
					slotLength: 47,
				},
				long: {
					start: 0,
					end: 100,
					length: "long",
					slot: [7, 8, 15, 6, 9, 10, 17, 13, 15],
					slotLength: 100,
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
					slotLength: 40,
				},
				medium: {
					start: 0,
					end: 78,
					length: "medium",
					slot: [15, 15, 19, 8, 7, 14],
					slotLength: 78,
				},
				long: {
					start: 5,
					end: 100,
					length: "long",
					slot: [15, 5, 5, 5, 5, 21, 17, 13, 5, 5],
					slotLength: 95,
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
					slotLength: 40,
				},
				medium: {
					start: 0,
					end: 70,
					length: "medium",
					slot: [15, 15, 11, 8, 7, 14],
					slotLength: 70,
				},
				long: {
					start: 0,
					end: 100,
					length: "long",
					slot: [15, 12, 8, 14, 7, 17, 13, 15],
					slotLength: 100,
				},
			},
		],
	}, {
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
					slotLength: 31,
				},
				medium: {
					start: 0,
					end: 70,
					length: "medium",
					slot: [7, 9, 7, 5, 5, 6, 7, 5, 5, 6, 8],
					slotLength: 70,
				},
				// mb add start time and end time of music
				long: {
					start: 0,
					end: 100,
					length: "long",
					slot: [7, 8, 11, 6, 11, 5, 5, 7, 6, 7, 8, 7, 8, 5, 6],
					slotLength: 107,
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
					slotLength: 31,
				},
				medium: {
					start: 1,
					end: 51,
					length: "medium",
					slot: [7, 3, 7, 3, 6, 7, 6, 4, 4, 3],
					slotLength: 50,
				},
				// mb add start time and end time of music
				long: {
					start: 1,
					end: 149,
					length: "long",
					slot: [6, 9, 7, 8, 10, 4, 4, 7, 4, 5, 10, 11, 15, 5,5,5,7,3,6,4,7,6],
					slotLength: 148,
				},
			},
		],
	}, {
		style: "extreme",
		tracks: [
			{
				musicTrack: fantastic,
				musicDuration: 233,
				musicName: "Fantastic Baby",
				artist: "Big Bang",
				short: {
					start: 0,
					end: 15,
					length: "short",
					slot: [2, 1, 3, 3, 6],
					slotLength: 15,
				},
				medium: {
					start: 0,
					end: 46,
					length: "medium",
					slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2, 1, 3],
					slotLength: 46,
				},
				long: {
					start: 0,
					end: 67,
					length: "long",
					slot: [1,1,1,2,1,1,1,2,3,3,2,2,3,2,3,3,1,2,1,1,3,3,2,2,4,2,3,2,3,2,1,2,2],
					slotLength: 67,
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
					slotLength: 15,
				},
				medium: {
					start: 5,
					end: 47,
					length: "medium",
					slot: [2, 1, 2, 1, 2, 2, 1, 2, 3, 4, 5, 4, 3, 2, 2, 4, 2],
					slotLength: 42,
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
					slotLength: 72,
				},
			},
		],
	},
];
