import React, {useState} from 'react';

import VideoWrapper from 'react-player';

export const Player: React.FC = ({}) => {

    return(
        <div>
            <VideoWrapper controls/>
        </div>
    )
}