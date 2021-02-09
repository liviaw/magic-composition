import React, { useState } from "react";
import "./App.css";
import type { MediaPresenter } from "./Components/MediaPresenter";
import { Modal } from "./Components/Modal/Modal";
import { Homepage } from "./Components/Homepage/Homepage";
type AppProps = {
  mediaPresenter: MediaPresenter;
};

const App: React.FC<AppProps> = ({mediaPresenter}) => { 
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
  }

  const openModal = ()  => {
    setModalOpen(true);
  }
  return (
    <div className="App">
      <Homepage openModal={openModal}/>
      <Modal mediaPresenter={mediaPresenter} modalOpen={modalOpen} closeModal={closeModal}/>
    </div>
  );
};

export default App;