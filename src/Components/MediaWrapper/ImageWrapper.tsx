import React, { useEffect, useState } from "react";
// import { useTimeout } from 'beautiful-react-hooks'; 
import styles from "./ImageWrapper.module.css";

type Props = {
  file: File;
  changeImage: () => void;
  duration: number;
  play: boolean;
};


// type timerProps = {
//   changeImage: () => void;
//   duration: number;
// };

class Timer {
  callback: () => void;
  remaining: number;
  timerId!: NodeJS.Timeout; 
  start:number = 0; 

  constructor(changeImage: () => void, delay: number) {
    this.callback = changeImage;
    this.remaining = delay;
  }

  pause = () => {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  };

  resume = () => {
      this.start = Date.now();
      clearTimeout(this.timerId);
      this.timerId = setTimeout(this.callback, this.remaining);
  };
}
// duration = 5 seconds
// 2 second -> pause
// resume -> wait for 3 seconds -> changeImage()

// future: add media can be optional 
// if no add media, then do ot set timeout
export const ImageWrapper: React.FC<Props> = ({ file, changeImage, duration, play}) => {
  const [timer, setTimer] = useState<Timer|null>(null);

  useEffect(() => {
    setTimer(new Timer(changeImage, duration));

  }, [file, changeImage, duration]);
  
  useEffect(()=> {
    if (!timer) {
      return;
    }
    if (play) {
      timer.resume();
    } else {
      timer.pause();
    }

  }, [timer, play])

  
  //  useTimeout(() => {
  //   changeImage();
  //  }, duration);

  return (
    <img
    className={play? styles.clear  : styles.blur}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
};
