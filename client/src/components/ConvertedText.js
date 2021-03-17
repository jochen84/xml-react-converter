import React, { useState } from 'react'
import axios from 'axios';
import xmlFile from '../assets/exports/konverterad.xml';

const ConvertedText = () => {

    const [convertedText, setConvertedText] = useState('')

    axios.get(xmlFile, {
        'Content-Type': 'application/xml; charset=utf-8'
    })
    .then((response) => {
        setConvertedText(response.data)
    });

    console.log('Innuti Converted-Text')

    return (
        <div className="text-container shadow p-1">
            <textarea className="textarea" readOnly value={convertedText}></textarea>
        </div>
    )
}

export default ConvertedText
