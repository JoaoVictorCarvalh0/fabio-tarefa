import React, { useState, useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/images')
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        // Refresh the image list
        fetch('http://localhost:8000/images')
          .then((res) => res.json())
          .then((data) => setImages(data));
      });
  };

  return (
    <div>
      <h1>Banco de Imagens</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {images.map((image) => (
          <div key={image.filename}>
            <img
              src={`http://localhost:8000/uploads/${image.filename}`}
              alt={image.filename}
              style={{ width: '200px', height: 'auto' }}
            />
            <p>Uploaded at: {image.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;