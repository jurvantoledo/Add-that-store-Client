import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isOwner, setIsOwner] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const { id } = useSelector(selectUser)

  console.log(id)

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
    if (isOwner === true) {
      history.push(`/add-store/${id}`);
    }
  }, [token, history, id]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password, phone, isOwner));

    setEmail("");
    setPassword("");
    setName("");
    setPhone("")
  }

  const toggleTrue = useCallback(
    () => setIsOwner(true),
    [isOwner, setIsOwner],
  );

  const toggleFalse = useCallback(
    () => setIsOwner(false),
    [isOwner, setIsOwner],
  );
  


  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            value={phone}
            onChange={event => setPhone(event.target.value)}
            type="phoneNumber"
            placeholder="+31 12345678"
            required
          />
        </Form.Group>

      <Form.Group controlId="formIsOwner">
        <Form.Label>Are you a store owner</Form.Label>
        <Form.Check
          type="radio"
          label="Yes"
          name="Radios"
          id="Radio1"
          value={isOwner}
          onChange={event => toggleTrue(event.target.value)}        
          />
        <Form.Check
          type="radio"
          label="No"
          name="Radios"
          id="Radio1"
          value={isOwner}
          onChange={event => toggleFalse(event.target.value)}        
          />
      </Form.Group>

      <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
          Sign up
        </Button>
      </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
