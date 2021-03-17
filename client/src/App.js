import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FileUpload from './components/FileUpload';
import TextToConvert from './components/TextToConvert';
import ConvertedText from './components/ConvertedText';

const App = () => {
  return (
    <div className="App p-5">
      <div className="container">
        <h1 className="display-4 text-center mb-4 font-weight-bold">
          Basic XML converter
        </h1>
        <FileUpload/>
        <div className="d-flex justify-content-between">
          <TextToConvert/>
          <ConvertedText/>
        </div>
      </div>
    </div>
  );
}

export default App;
