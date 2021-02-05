import React, { useState } from "react";
import "./App.css";
import { ImportModal } from "./Components/ImportModal/ImportModal";
import { Header } from "./Components/Shared/Header";
import { Container } from "react-bootstrap";
import { VideoModal } from "./Components/VideoModal/VideoModal";
import type { MediaPresenter } from "./Components/MediaPresenter";

type AppProps = {
  mediaPresenter: MediaPresenter;
};
const App: React.FC<AppProps> = ({mediaPresenter}) => { 

  const [show, setShow] = useState<boolean>(false);
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
