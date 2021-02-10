import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MediaPresenter } from "./MediaPresenter";
import { OutputPresenter } from "./OutputPresenter";

const mediaPresenter = new MediaPresenter();
const outputPresenter = new OutputPresenter();
ReactDOM.render(
  <React.StrictMode>
    <App mediaPresenter={mediaPresenter} outputPresenter={outputPresenter}/>
  </React.StrictMode>,
  document.getElementById('root')
);