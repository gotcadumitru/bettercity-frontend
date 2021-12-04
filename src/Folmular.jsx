import React, { useState } from 'react';
import { authAPI } from './api/api';

const Formular = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    birthdate: '',
    photo: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newUser.photo);

    authAPI.upload(formData);
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />

      <input type="submit" />
    </form>
  );
};

export default Formular;
