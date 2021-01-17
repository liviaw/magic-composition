
import oceanMusic from "../Audio/ocean.mp3";
import neutral from "../Audio/summer.mp3";
import extreme from "../Audio/extreme.mp3";

// duration is the length of each media displayed in video
// if there are too many photos, then mb dont show all? (for now)
// length is the length of the final video
// durations and lengths in seconds
//

export type slotEl = {
    slot:number[],
    slotLength: number,
}

export type templateEl = {
    title: string,
    musicTrack: string,
    musicDuration: number,
    musicName: string,
    short: slotEl,
    medium: slotEl,
    long: slotEl,
}


export const templates:{[name: string]: templateEl} = {
    calm: 
    {
        title: "calm",
        musicTrack: oceanMusic,
        musicDuration: 101,
        musicName: "ocean sound",
        short: {
            slot:[7,5,5,7,6],
            slotLength: 30,
        },
        medium: {
            slot:[7,5,5,3,6,7,5,5,3,6],
            slotLength: 52,
        },
        long: {
            slot:[5,15,5,10,7,8,3,5,15,12,7,3,6],
            slotLength: 101
        }    
    },
    neutral: {
        title: "neutral",
        musicTrack:neutral,
        musicDuration: 181,
        musicName: "Summertime Rain",
        short: {
            slot:[7,5,5,3,6,5],
            slotLength: 31,
        },
        medium: {
            slot:[5,7,5,5,3,6,7,5,5,3,6,4,2,4,3],
            slotLength: 70,
        },
        long: {
            slot:[5,7,2,5,5,6,6,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,4],
            slotLength: 93,
        }  
    },
    happy: {
        title: "happy",
        musicTrack:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3",
        musicDuration: 192,
        short: {
            slot:[7,5,5,3,6],
            slotLength: 26,
        },
        musicName: "idk what song this is",
        medium: {
            slot:[5,7,2,5,5,3,6,7,5,5,3,6,2,2,4,7],
            slotLength: 74,
        },
        long: {
            slot:[5,7,2,5,5,3,6,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,4],
            slotLength: 90,
        }  
    },
    extreme: {
        title: "extreme",
        musicTrack: extreme,
        musicDuration: 122,
        musicName: "adrenalize",
        short: {
            slot:[7,5,5,3,6],
            slotLength: 26,
        },
        medium: {
            slot:[2,7,2,5,5,3,6,7,5,5,3,6,2,2,4,2],
            slotLength: 66,
        },
        long: {
            slot:[2,7,2,5,5,3,3,3,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,2],
            slotLength: 85,
        }  
    }
}

//https://stackoverflow.com/questions/56782452/how-to-fix-module-not-found-for-audio-files-using-file-loader-images-css-an

// if you want an infinite music, goes here:
// "http://streaming.tdiradio.com:8000/house.mp3",