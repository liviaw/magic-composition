import React, { useState } from "react";
import "./App.css";
import { ImportModal } from "./Components/ImportModal/ImportModal";
import { Header } from "./Components/Shared/Header";
import { Container } from "react-bootstrap";
import { MediaPresenter } from "./Components/MediaPresenter";


const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [mediaPresenter, setMediaPresenter] = useState(new MediaPresenter());

  return (
    <div className="App">
      <Header />
      <ImportModal
        setShow={setShow}
        mediaPresenter={mediaPresenter}
      />
    </div>
  );
};

export default App;
