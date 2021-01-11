import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar'

type Props = {
    mediasLength:number,
    mediaReady: number
}

export const Loading:  React.FC<Props> = ({
    mediasLength,
    mediaReady
}) => {        
    return (
      <>
      <LoadingBar 
        progress={mediaReady/mediasLength * 100}
        color='#00C4CC'
      />
        {mediasLength !== mediaReady && (
          <>
          <p>loading...  Ready </p>
          {mediaReady} / {mediasLength}
          </>
        )}
      </>
    )

}