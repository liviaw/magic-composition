
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
//

export type slotEl = {
    length: "short" | "medium" | "long",
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
            length: "short",
            slot:[7,8,8,7,6],
            slotLength: 36,
        },
        medium: {
            length: "medium",
            slot:[7,10,8,5,6,7,5,5,3,6],
            slotLength: 62,
        },
        long: {
            length: "long",
            slot:[5,15,5,10,7,8,3,5,15,12,7,3,6],
            slotLength: 101
        }    
    },
    gentle: 
    {
        title: "gentle",
        musicTrack: oceanMusic,
        musicDuration: 295,
        musicName: "Always with me - spirited away - Youmi Kimura",
        short: {
            length: "short",
            slot:[7,5,5,7,6],
            slotLength: 30,
        },
        medium: {
            length: "medium",
            slot:[7,10,8,5,6,7,5,5,6],
            slotLength: 59,
        },
        long: {
            length: "long",
            slot:[5,15,5,10,7,8,3,5,15,12,7,3,5],
            slotLength: 100
        }    
    },
    neutral: {
        title: "neutral",
        musicTrack:neutral,
        musicDuration: 181,
        musicName: "Summertime Rain",
        short: {
            length: "short",
            slot:[7,5,5,3,6,5],
            slotLength: 31,
        },
        medium: {
            length: "medium",
            slot:[5,7,5,5,3,6,7,5,5,3,6,4,2,4,3],
            slotLength: 70,
        },
        long: {
            length: "long",
            slot:[5,7,2,5,5,6,6,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,4],
            slotLength: 93,
        }  
    },
    epic: {
        title: "epic",
        musicTrack:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3",
        musicDuration: 192,
        musicName: "idk what song this is",
        short: {
            length: "short",
            slot:[7,5,5,3,6],
            slotLength: 26,
        },
        medium: {
            length: "medium",
            slot:[5,7,2,5,5,3,6,7,5,5,3,6,2,2,4,7],
            slotLength: 74,
        },
        long: {
            length: "long",
            slot:[5,7,2,5,5,3,6,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,4],
            slotLength: 90,
        }  
    },
    jazzy: {
        title: "jazzy",
        musicTrack: jazzy,
        musicDuration: 331,
        musicName: "Dusk - Orchard Heights",
        short: {
            length: "short",
            slot:[7,5,5,3,6],
            slotLength: 26,
        },
        medium: {
            length: "medium",
            slot:[5,7,2,5,5,3,6,7,5,5,3,6,2,2,4,7],
            slotLength: 74,
        },
        long: {
            length: "long",
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
            length: "short",
            slot:[7,5,5,3,6],
            slotLength: 26,
        },
        medium: {
            length: "medium",
            slot:[2,7,2,5,5,3,6,7,5,5,3,6,2,2,4,2],
            slotLength: 66,
        },
        long: {
            length: "long",
            slot:[2,7,2,5,5,3,3,3,3,2,7,5,5,3,6,2,2,4,2,3,2,2,5,2],
            slotLength: 85,
        }  
    }
}

//https://stackoverflow.com/questions/56782452/how-to-fix-module-not-found-for-audio-files-using-file-loader-images-css-an

// if you want an infinite music, goes here:
// "http://streaming.tdiradio.com:8000/house.mp3",