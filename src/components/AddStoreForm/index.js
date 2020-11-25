import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addStore } from "../../store/user/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();

    dispatch(addStore(name, image, description, address));

    setImage("");
    setDescription("");
    setName("");
    setAddress("")
  }
  

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

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={event => setImage(event.target.value)}
            type="phoneNumber"
            placeholder="yeah"
            required
          />
        </Form.Group>

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
