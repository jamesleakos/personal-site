import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/PhotoGalleryComp.css';

function PhotoGalleryComp({ component }) {
  
  const fileInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append the selected files to the form data object
    Array.from(fileInput.current.files).forEach((file) => {
      console.log(file.name);
      formData.append('images', file);
    });

    // Send the POST request to the server
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        id: 'some-id',
      },
    }).then((response) => {
      console.log(response.data);
    })
      .then(() => {

      })
  };


  return (
    <div className='photo-gallery'>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInput} multiple name='images' />
        <button type="submit">Upload</button>
      </form>
      {imageList.map((image) => (
        <img src={`/uploads/${image}`} alt="Image" />
      ))}
    </div>
  )
}

export default PhotoGalleryComp;