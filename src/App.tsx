import React, {useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';
import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import { BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom'; 

const App: React.FC = () => {
  const [filePath, setFilePath] = useState< string[] >([]);
  const [temp, setTemp] = useState< string[] >([]);

  const removeFile = () => {

  }
  const addFile = () => {
    
  }
  const getFile = () => {
    // filePath.forEach( (f) => {

    //   console.log(f)
    // }
    // )
    // console.log("hi");
    return filePath;
  }
  const updateFile = (newFiles: string[]) => {
    setFilePath(newFiles);
    console.log(filePath.join(","));
    console.log("updateee")
  }
  function NoMatch() {
    let location = useLocation();
  
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
  console.log(filePath.join(","));
  console.log("hi");
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={()=>(<Home filePath={filePath} setFilePath={setFilePath} />)}/>
        <Route path="/create"component={()=>(<CreateVideo filePath={filePath}/>)}/>
        <Route component={NoMatch}/>
        </Switch>
    </Router>

    </div>
  );
}

export default App;
