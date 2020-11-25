import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { addStore } from "../../store/user/actions";


export default function AddStore() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  /*useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);*/

  function submitForm(event) {
    event.preventDefault();

    dispatch(addStore(name, address, description, image));

    setAddress("");
    setDescription("");
    setName("");
    setImage("")
  }


  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Add Store</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name of Store</Form.Label>
          <Form.Control
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={event => setAddress(event.target.value)}
            type="address"
            placeholder="Enter address"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="description"
            placeholder="description"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={event => setImage(event.target.value)}
            type="text"
            placeholder="Upload your image"
            required
          />
        </Form.Group>

      <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
          Add Store
        </Button>
      </Form.Group>
        <Link to="/">Click here to go to homepage</Link>
      </Form>
    </Container>
  );
}
