import React, { useState } from 'react';
import axios from 'axios';

const Actuality = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/actualities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Actuality uploaded successfully!');
    } catch (error) {
      console.error('Error uploading actuality', error);
      alert('Error uploading actuality');
    }
  };

  return (
    <div>
      <h2>Upload Actuality</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Actuality;
