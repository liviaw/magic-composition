import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show:boolean;
}
export const CreateVideo: React.FC<Props> = ({
    setShow,
    show
}) => {
    return(
        <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            some text here
            {/* {videoReady === videosNum + imagesNum ? <LoadingPage/> : <></>} */}
            {/* <div className={styles.renderMediaContainer}> */}
                            {/* {medias[mediaCounter]} */}
            {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="info" onClick={() => {setShow(false)}}>
            Save Video
          </Button>
        </Modal.Footer>
      </Modal>
    )
}