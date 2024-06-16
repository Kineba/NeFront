import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { getPosts } from "actions/post.action";

const PostForm = ({
  id,
  title: initialTitle = "",
  message: initialMessage = "",
  images: initialImages = [],
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [images, setImages] = useState(initialImages);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(initialTitle);
    setMessage(initialMessage);
    setImages(initialImages);
  }, [initialTitle, initialMessage, initialImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null); // Reset errors before submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      if (id) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}api/post/update/actuality/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/post/add/actuality`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      onSubmit();
      dispatch(getPosts());
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set error messages from backend
      } else {
        alert("Erreur lors de la soumission du formulaire");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors && (
        <Alert color="danger" className="alert">
          {errors.format && <p>{errors.format}</p>}
          {errors.maxSize && <p>{errors.maxSize}</p>}
        </Alert>
      )}
      <FormGroup>
        <Label for="title">Titre</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="message">Message</Label>
        <Input
          type="textarea"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="images">Images</Label>
        <Input
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleImageChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        {id ? "Modifier" : "Ajouter"}
      </Button>
      <Button type="button" color="secondary" onClick={onCancel}>
        Annuler
      </Button>
    </Form>
  );
};

export default PostForm;
