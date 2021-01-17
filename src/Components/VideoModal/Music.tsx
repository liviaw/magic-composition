import React, { useEffect, useState } from "react";
export const Music: React.FC = () =>  {

    const [play, setPlay] = useState<boolean>(false);
    const [pause, setPause] = useState<boolean>(true);
    const url = "http://streaming.tdiradio.com:8000/house.mp3";
    const audio = new Audio(url);
  

  const playing = () => {
    setPlay(true);
    setPause(false);
    audio.play();
  }
  
  const pausing = () => {
    setPlay(false);
    setPause(true);
    audio.pause();
  }
  

  return (
    <div>
      <button onClick={playing}>Play</button>
      <button onClick={pausing}>Pause</button>
    </div>
    );
  
}