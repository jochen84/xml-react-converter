import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

  console.log('FileUpload initiated')
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose *.txt file');
  const [isDisabled, setIsDisabled] = useState('true');

  const onChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTimeout(() => setIsDisabled(false), 1000)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const onConvert = () => {
    axios.post('/convert')
    setIsDisabled(true)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="mb-4">
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" accept=".txt" onChange={onChange}/>
            <label className="custom-file-label" htmlFor="customFile">{filename}</label>
          </div>
          <input type="submit" value="Upload selected" className="btn btn-secondary btn-lg btn-block mt-4"/>
          <button className="btn btn-secondary btn-lg btn-block" onClick={onConvert} disabled={isDisabled}>Convert</button>
      </form>
    </Fragment>
  )
}

export default FileUpload
