import React, { useState, useEffect } from 'react';

type Props = {
    file: File;
    delay: number;
}

const ImageWrapper: React.FC<Props> = ({
    file,
    delay
}) => {
    useEffect(() => {
        setTimeout(imageTimeoutHandler, delay);
      }, []);

      const imageTimeoutHandler = () => {

      }
    return(<div></div>)
}

export default ImageWrapper;