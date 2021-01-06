import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

type Props = {
    file: File;
    progress: number;
}

const VideoProgressBar: React.FC<Props> = ({
    file,
    progress,
}) => {
    
    return(<div>
        <ProgressBar now={progress} label={`${progress}%`} />
    </div>)
}

export default VideoProgressBar;