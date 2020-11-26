import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addStore } from "../../store/user/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import ImageUploader from "../ImageUploader/ImageUploader"

export default function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState({
    selectCat: [
     {label: "Automotive", value: "Automotive"},
     {label: "Electronics", value: "Electronics"},
     {label: "Clothing", value: "Clothing"},
     {label: "Entertainment & Arts", value: "Entertainment & Arts"},
     {label: "Food & Gifts", value: "Food & Gifts"},
    ]
  })
  console.log(image)

  function submitForm(event) {
    event.preventDefault();

    dispatch(addStore(name, image, description, address, category));

    setImage("");
    setDescription("");
    setName("");
    setAddress("")
    setCategory({
      selectCat: [
        {label: "Automotive", value: "Automotive"},
        {label: "Electronics", value: "Electronics"},
        {label: "Clothing", value: "Clothing"},
        {label: "Entertainment & Arts", value: "Entertainment & Arts"},
        {label: "Food & Gifts", value: "Food & Gifts"},
      ]
    })
  }

  const uploadImageUrl = (url) => {
    setImage(url);
  };
  

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Add Store</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>address</Form.Label>
          <Form.Control
            value={address}
            onChange={event => setAddress(event.target.value)}
            type="address"
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            placeholder="Description"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
           <Form.Control as="select"
           value={category}
           onChange={event => setCategory(event.target.value)}
           type="dropdown"
           required
           >
            <option value={null}>Select a category</option>
            <option value="Automotive">Automotive</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Entertainment & Arts">Entertainment & Arts</option>
            <option value="Food & Gifts">Food & Gifts</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Store picture</Form.Label>
          <Form.Control
            value={image}
            onChange={(event) => setImage(event.target.value)}
            type="text"
            placeholder="Paste url"
          />
        </Form.Group>
        <ImageUploader uploadPreset="store" uploadImageUrl={uploadImageUrl} />
        {image ? (
          <div style={{ margin: "1rem 0 0 0" }}>
            <p style={{ fontSize: "0.8rem" }}>Image preview:</p>
            <img
              className="new-image-preview"
              src={image}
              alt="store pic"
            />
          </div>
        ) : null}

      <Form.Group className="mt-5">
          <Button  variant="primary" type="submit" onClick={submitForm}>
          Add Store
        </Button>
      </Form.Group>
        <Link to="/">Click here to go to homepage</Link>
      </Form>
    </Container>
  );
}
