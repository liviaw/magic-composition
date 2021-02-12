import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MediaPresenter } from "./MediaPresenter";

const mediaPresenter = new MediaPresenter();

ReactDOM.render(
    <App mediaPresenter={mediaPresenter}/>,

  document.getElementById('root')
);
