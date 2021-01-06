import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';
import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import { BrowserRouter as Router, Switch, Route, useLocation, useHistory} from 'react-router-dom'; 

const App: React.FC = () => {

  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    console.log("mounted");
    return (() => {
      console.log("unmounted");
    })
  },[]);
  const removeFile = (file:File ) => {
    const newFiles = [...files]
    const index = newFiles.indexOf(file);
    if (index > -1) {
      console.log("removeFiles " + index + " " + file);
      newFiles.splice(index, 1);
    }
    
    setFiles(newFiles);
    console.log(newFiles);
  }
  const addFile = () => {
    
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
  return (
    <div className="App">
      <Home files={files} setFiles={setFiles} removeFile={removeFile}/>
      {/* <Router>
        <Switch>
          
        <Route exact path="/" component={()=>(<Home files={files} setFiles={setFiles} />)}/>
        <Route path="/create" component={()=>(<CreateVideo files={files}/>)}/>
        <Route component={NoMatch}/>
        </Switch>
    </Router> */}

    </div>
  );
}

export default App;
