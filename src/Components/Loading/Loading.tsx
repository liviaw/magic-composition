import React from 'react';
import LoadingBar from 'react-top-loading-bar'

type Props = {
    mediasLength:number,
    mediaReady: number
}

export const Loading:  React.FC<Props> = ({
    mediasLength,
    mediaReady
}) => {  
    console.log("hello mediasLength " + mediasLength + "mediaReady " + mediaReady);      
    return (
      <>
      {/* {mediaReady/mediasLength * 100 < 100 && (      */}
      <LoadingBar 
      progress={mediaReady/mediasLength * 100}
      color='#00C4CC'
      />
      {mediasLength > mediaReady && (
        <>
        <p>loading...  </p>
        {mediaReady} / {mediasLength}
        </>
      )}
      </>
    )

}