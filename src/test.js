function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

console.log(finalTime);t


function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = Math.floor(duration / 3600);
    var mins = Math.floor((duration % 3600) / 60);
    var secs = Math.floor(duration % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}