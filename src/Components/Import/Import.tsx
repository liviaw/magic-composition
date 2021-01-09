import React, {useState, useEffect} from 'react';

interface Person {
  firstName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?:(bob: string) => string;
  person: Person;
}

interface FileLoading {
  file: string,
  loaded: boolean
}


export const Import: React.FC<Props> = ({}) => {
// function Import() {
  // arrayf [{file: "abc", loaded: false}, {file: "ghi.png", loaded: true}]
  const [count, setCount] = useState<FileLoading[]>([]);
  const [files, setFiles] = useState<File[]>([]);

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


  return (
    <div>
    </div>
  );
}
