import React, { useState, useEffect } from 'react';
import { useInterval } from 'beautiful-react-hooks'; 
import styles from './CreateVideo.module.css';
import { useTimeout } from 'beautiful-react-hooks'; 

type Props = {
    file: File;
    delay: number;
    onEnded:() => void;
}

const ImageWrapper: React.FC<Props> = ({
    file,
    delay,
    onEnded
}) => {

   // delay the function by 2000ms
   const [isCleared, clearTimeoutRef] = useTimeout(onEnded, 2000);

    return(<img className={styles.renderMedia} src={URL.createObjectURL(file)}/>)
}

export default ImageWrapper;