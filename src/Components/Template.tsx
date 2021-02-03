import ocean from "../Music/Calm/ocean.mp3";
import dreaming from "../Music/Calm/helios-dreaming.mp3";
import child from "../Music/Calm/ryan-farish -child.mp3";
import neutral from "../Music/Neutral/summer.mp3";
import adrenalize from "../Music/Extreme/root-basket-adrenalize.mp3";
import fantastic from "../Music/Extreme/big-bang-fantastic-baby.mp3";
import signs from "../Music/Neutral/divide-by-nine-signs.mp3";
import jazzy from "../Audio/jazzy.mp3";
import gentle from "../Audio/gentle.mp3";
import uplifting from "../Audio/uplifting.mp3";


export type slotEl = {
	start: number;
	end: number;
	length: "short" | "medium" | "long";
	slot: number[];
	slotLength: number;
};

export type trackEl = {
	musicTrack: string;
	musicDuration: number;
	artist: string;
	musicName: string;
	short: slotEl;
	medium: slotEl;
	long: slotEl;
};

export type musicElement = { style: string, tracks: trackEl[] };

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
					slotLength: 20,
				},
				medium: {
					start: 0,
					end: 38,
					length: "medium",
					slot: [6, 6, 5, 8, 6, 7],
					slotLength: 47,
				},
				long: {
					start: 0,
					end: 60,
					length: "long",
					slot: [7, 8, 15, 6, 9, 15],
					slotLength: 60,
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
		style: "gentle",
		tracks: [
			{
				musicTrack: gentle,
				musicDuration: 295,
				artist: "Youmi Kimura",
				musicName: "Always with me - spirited away",
				short: {
					start: 200,
					end: 230,
					length: "short",
					slot:[7,5,5,7,6],
					slotLength: 30,
				},
				medium: {
					start: 15,
					end: 70,
					length: "medium",
					slot:[8,10,8,5,6,7,5,5,6],
					slotLength: 60,
				},
				long: {
					start: 5,
					end: 120,
					length: "long",
					slot:[14,15,10,10,7,8,4,5,15,12,7,3,5],
					slotLength: 115,
				},    
			}
		]
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
		style: "uplifting",
		tracks: [
			{
				musicTrack: uplifting,
				musicDuration: 291,
				artist: "",
				musicName: "Kimino nawa instrumental",
				short: {
					start: 50,
					end: 76,
					length: "short",
					slot:[6,6,6,3,5],
					slotLength: 26,
				},
				medium: {
					start: 13,
					end: 80,
					length: "medium",
					slot:[5,7,5,5,6,7,5,5,3,6,4,2,4,3],
					slotLength: 67,
				},
				long: {
					start: 100,
					end: 216,
					length: "long",
					slot:[10,7,7,8,8,6,6,5,7,5,5,3,6,2,4,5,4,5,4,9],
					slotLength: 116,
				},     
			}
		]
	}, {
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
					slot:[3,7,5,5,3,6],
					slotLength: 29,
				},
				medium: {
					start: 10,
					end: 84,
					length: "medium",
					slot:[5,3,4,2,5,5,3,6,7,5,5,3,6,2,2,4,7],
					slotLength: 74,
				},
				long: {
					start: 100,
					end: 195,
					length: "long",
					slot:[5,5,8,3,5,5,3,6,3,2,2,2,3,5,5,3,6,2,2,4,2,3,2,5,4],
					slotLength: 95,
				},     
			}
		]
	},{
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
					slotLength: 15,
				},
				medium: {
					start: 50,
					end: 146,
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
