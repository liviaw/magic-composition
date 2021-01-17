
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
            slot:[15,15,12],
            slotLength: 42,
        },
        medium: {
            length: "medium",
            slot:[7,10,9,8,7,8,15,6],
            slotLength: 70,
        },
        long: {
            length: "long",
            slot:[15,8,10,7,13,7,15,12,13],
            slotLength: 100
        }    
    },
    gentle: 
    {
        title: "gentle",
        musicTrack: gentle,
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
            slot:[7,15,5,10,7,8,4,5,15,12,7,3,5],
            slotLength: 103,
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
            slot:[5,7,5,5,3,6,7,5,5,6,4,4,3],
            slotLength: 65,
        },
        // mb add start time and end time of music
        long: {
            length: "long",
            slot:[5,7,2,5,5,6,6,3,7,5,5,3,6,4,5,8,4],
            slotLength: 86,
        }  
    },
    uplifting: {
        title: "uplifting",
        musicTrack:uplifting,
        musicDuration: 291,
        musicName: "Kimino nawa instrumental",
        short: {
            length: "short",
            slot:[6,6,6,3,5],
            slotLength: 26,
        },
        medium: {
            length: "medium",
            slot:[5,7,5,5,6,7,5,5,3,6,4,2,4,3],
            slotLength: 67,
        },
        long: {
            length: "long",
            slot:[5,7,2,5,5,6,6,5,7,5,5,3,6,2,4,5,4,5,4,9],
            slotLength: 100,
        }  
    },
    epic: {
        title: "epic",
        musicTrack:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3",
        musicDuration: 192,
        musicName: "idk what song this is",
        short: {
            length: "short",
            slot:[3,5,5,3,6],
            slotLength: 22,
        },
        medium: {
            length: "medium",
            slot:[5,7,2,5,5,3,6,6,5,5,3,6,2,2,4,6],
            slotLength: 72,
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
            slot:[2,3,2,1,2,4,2,3,4,5,4,3,2,2,4,2,1,3],
            slotLength: 49,
        },
        long: {
            length: "long",
            slot:[2,2,1,5,5,3,3,3,3,2,2,5,3,3,5,3,3,2,2,4,2,3,2,3,2,5,2,5],
            slotLength: 85,
        }  
    }
}

//https://stackoverflow.com/questions/56782452/how-to-fix-module-not-found-for-audio-files-using-file-loader-images-css-an

// if you want an infinite music, goes here:
// "http://streaming.tdiradio.com:8000/house.mp3",