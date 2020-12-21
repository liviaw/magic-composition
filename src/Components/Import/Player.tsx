import React, {useState} from 'react';

import ReactPlayer from 'react-player';

export const Player: React.FC = ({}) => {

    return(
        <div>
            <ReactPlayer controls/>
        </div>
    )
}