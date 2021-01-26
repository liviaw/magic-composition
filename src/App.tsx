import React, { useState } from "react";
import "./App.css";
import { ImportModal } from "./Components/ImportModal/ImportModal";
import { Header } from "./Components/Shared/Header";
import { Container } from "react-bootstrap";
import { MediaPresenter } from "./Components/MediaPresenter";
import { VideoModal } from "./Components/VideoModal/VideoModal";



const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [mediaPresenter, setMediaPresenter] = useState(new MediaPresenter());

  return (
    <Container fluid className="App">
      <Header />
      <ImportModal
        setShow={setShow}
        mediaPresenter={mediaPresenter}
      />
      {show ? (
        <VideoModal
          setShow={setShow}
          show={show}
          mediaPresenter={mediaPresenter}
        />
      ) : null}
    </Container>
  );
};

export default App;
