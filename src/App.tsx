import React, {useEffect, useState} from 'react';
import './App.css';
import {Player, Home, CreateVideo} from './Components/';
import sampimage1 from './Media/image1.png';
// import samplevideo1 from './Media/video2.mp4';

import { BrowserRouter as Router, Switch, Route, useLocation, useHistory} from 'react-router-dom'; 

const App: React.FC = () => {
  const [filePath, setFilePath] = useState< string[] >([]);
  const [str, setStr] = useState< string >("");
  const [str2, setStr2] = useState< string >("");
  const [temp, setTemp] = useState< string[] >([]);
  useEffect(() => {
    console.log("mounted");
    return (() => {
      console.log("unmounted");
    })
  },[]);
  const removeFile = () => {

  }
  const addFile = () => {
    
  }

  const updateFile = (newFiles: string[]) => {
    setFilePath(newFiles);
    console.log(Array.from(filePath).join(","));
    console.log("updateee")
  }
  var loadFile = function(event: React.ChangeEvent<HTMLInputElement>) {
    var image = document.getElementById('output');
    if (image == null || event.target.files == null) {
      return;
    }
    setStr(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
    console.log(URL.createObjectURL(event.target.files[0]));

  };
  var loadFile2 = function(event: React.ChangeEvent<HTMLInputElement>) {
    var image = document.getElementById('output');
    if (image == null || event.target.files == null) {
      return;
    }
    setStr2(URL.createObjectURL(event.target.files[0]));

  };

  console.log("hi");

  return (
    <div className="App">
      <p>
        <input type="file"  accept="image/*, video/*" name="image" id="file"  onChange={loadFile} className="{display: none;}"/>

        </p>
<p><label className="{cursor: pointer;}">Upload Image</label></p>
<p><img id="output" width="200" src={str}/></p>


<p>
        <input type="file"  accept="image/*" name="image" id="file"  onChange={loadFile2} className="{display: none;}"/>

        </p>
<p><label className="{cursor: pointer;}">Upload Image</label></p>
<p><img id="output2" width="200" src={str2}/></p>
    </div>
  );
}

export default App;
