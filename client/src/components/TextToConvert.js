import React, { useState } from 'react';
import axios from 'axios';
import txtFile from '../assets/uploads/konvertera.txt';;


const TextToConvert = () => {

    const [textToConvert, setTextToConvert] = useState('')

    axios.get(txtFile, {
        'Content-Type': 'application/xml; charset=utf-8'
    })
    .then((response) => {
        setTextToConvert(response.data)
    });

    console.log('Innuti Text-To-Convert')
    return (
        <div className="text-container mr-5 shadow p-1">
            <textarea className="textarea" readOnly value={textToConvert} ></textarea>
        </div>
    )
}

export default TextToConvert
