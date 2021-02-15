import React, { useState } from "react";
import "./App.css";
import type { MediaPresenter } from "./MediaPresenter";
import type { OutputPresenter } from "./OutputPresenter";
import { Modal } from "./Components/Modal/Modal";
import { Homepage } from "./Components/Homepage/Homepage";

type AppProps = {
  mediaPresenter: MediaPresenter;
  outputPresenter: OutputPresenter;
};

const App: React.FC<AppProps> = ({mediaPresenter, outputPresenter}) => { 
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
    outputPresenter.pauseVideo();
  }

  const openModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)  => {
    setModalOpen(true);
    event.stopPropagation();
  }
  return (
    <div className="App">
      <Homepage openModal={openModal}/>
      <Modal mediaPresenter={mediaPresenter} outputPresenter={outputPresenter} modalOpen={modalOpen} closeModal={closeModal}/>
    </div>
  );
};

export default App;