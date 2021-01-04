import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';
import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

const App: React.FC = () => {
  const [filePath, setFilePath] = useState< string[] >([]);

  const removeFile = () => {

  }
  const addFile = () => {
    
  }
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={()=>(<Home filePath={filePath} setFilePath={setFilePath}/>)}/>

        <Route path="/create"component={()=>(<CreateVideo filePath={filePath}/>)}/>
        {/* <Route component={NoMatch}/> */}
        </Switch>
    </Router>

    </div>
  );
}

export default App;
