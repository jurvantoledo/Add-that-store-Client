import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, updateUserProfile } from "../../store/user/actions";

export default function UpdateUserForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      updateUserProfile(name, email, password, phone)
    );

    setEditForm(false);
  }

  function submitNewPassword(event) {
    event.preventDefault();

    dispatch(updatePassword(password));

    setEditPassword(false);
  }

  return (
    <div className="update-profile-form-container">
      <Button
        variant="outline-danger"
        onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
      >
        Update profile
      </Button>
      <div>
        <Button
          className="mt-2"
          variant="outline-danger"
          onClick={(e) =>
            editPassword ? setEditPassword(false) : setEditPassword(true)
          }
        >
          Change password
        </Button>
        {editForm ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Update profile</h1>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicImageUrl">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Submit changes
              </Button>
            </Form.Group>
          </Form>
        ) : null}
        {editPassword ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Change password</h1>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckPassword">
              <Form.Label>Password check</Form.Label>
              <Form.Control
                value={checkPassword}
                onChange={(event) => setCheckPassword(event.target.value)}
                type="password"
                placeholder="Retype password"
                required
              />
            </Form.Group>
            {!password ? (
              <p style={{ color: "red" }}>Please enter a new password.</p>
            ) : password === checkPassword ? (
              <Form.Group className="mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitNewPassword}
                >
                  Change password
                </Button>
              </Form.Group>
            ) : (
              <p style={{ color: "red" }}>
                The passwords don't match. Please check again.
              </p>
            )}
          </Form>
        ) : null}
      </div>
    </div>
  );
}
