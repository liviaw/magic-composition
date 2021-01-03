import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';


import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import ReactPlayer, { SourceProps } from 'react-player/lazy';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
              <Home />
            </Route>
        <Route path="/create">
        <CreateVideo/>
        </Route>
        {/* <Route component={NoMatch}/> */}
        </Switch>
    </Router>

    </div>
  );
}

export default App;
