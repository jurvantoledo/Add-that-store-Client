import React, { useState } from "react";
import axios from "axios"
import { Button, Col } from "react-bootstrap";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateStore } from "../../store/userInfo/actions";
import Autosuggest from "react-autosuggest";
import { Formik } from "formik";
import * as Yup from "yup";
import { selectUserInfo } from "../../store/userInfo/selectors";
import { selectUser } from "../../store/user/selectors";


const ValidationSchema = Yup.object().shape({
  country: Yup.string()
    .min(1, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
});

export default function UpdateStoreForm() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo)
    const user = useSelector(selectUser)
    const [suggestions, setSuggestions] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostCode] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [category, setCategory] = useState({
      selectCat: [
       {label: "Automotive", value: "Automotive"},
       {label: "Electronics", value: "Electronics"},
       {label: "Clothing", value: "Clothing"},
       {label: "Entertainment & Arts", value: "Entertainment & Arts"},
       {label: "Food & Gifts", value: "Food & Gifts"},
      ]
    })

  const uploadImageUrl = (url) => {
    setImage(url);
  };

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      updateStore(
        name, 
        image, 
        description, 
        country, 
        city, 
        address, 
        postCode, 
        category
        )
    );
    
    setImage("");
    setDescription("");
    setName("");
    setAddress("")
    setCountry("")
    setCity("")
    setPostCode("")
    setCategory({
      selectCat: [
        {label: "Automotive", value: "Automotive"},
        {label: "Electronics", value: "Electronics"},
        {label: "Clothing", value: "Clothing"},
        {label: "Entertainment & Arts", value: "Entertainment & Arts"},
        {label: "Food & Gifts", value: "Food & Gifts"},
      ]
    })
    setEditForm(false);
  }

  return (
    <div className="update-profile-form-container">
      {userInfo[0].id === user.id ? <Button
        className="update-button"
        variant="outline-danger"
        onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
      >
        Update Store
      </Button> : null}
      <div>
        {editForm ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Update Store</h1>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter store name"
              />
            </Form.Group>

            <Formik
      initialValues={{
        country: "",
      }}
      validationSchema={ValidationSchema}
      validate={values => {
        let errors = {};


        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setCountry("");
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue
      }) => (
        <Form>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
                if (!value) {
                  setSuggestions([]);
                  return;
                }

                try {
                  const response = await axios.get(
                    `https://restcountries.eu/rest/v2/name/${value}`
                  );

                  setSuggestions(
                    response.data.map(row => ({
                      name: row.name,
                      flag: row.flag
                    }))
                  );
                } catch (e) {
                  setSuggestions([]);
                }
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={suggestion => (
                <div>
                  <img
                    src={suggestion.flag}
                    alt={suggestion.name}
                    style={{ width: "25px" }}
                  />
                  {suggestion.name}
                  </div>
              )}
              onSuggestionSelected={(event, { suggestion, method }) => {
                if (method === "enter") {
                  event.preventDefault();
                }
                setCountry(suggestion.name);
                setFieldValue("country", suggestion.name);
              }}
              inputProps={{
                class: "form-control",
                placeholder: "Search for your country",
                autoComplete: "abcd",
                value: country,
                name: "country",
                onChange: (_event, { newValue }) => {
                  setCountry(newValue);
                },
                className:
                  touched.country && errors.country ? "has-error" : null
              }}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>

            <Form.Group controlId="formBasicCountry">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(event) => setCity(event.target.value)}
                type="text"
                placeholder="Enter city"
              />
            </Form.Group>

            <Form.Row>
      <Form.Group controlId="formAddress" className="col-md-12">
          <Form.Label>address</Form.Label>
          <Form.Control
            value={address}
            onChange={event => setAddress(event.target.value)}
            type="text"
            placeholder="Enter address of store"
            required
          />
        </Form.Group>

        <Form.Group controlId="formZipCode" className="col-md-12">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            value={postCode}
            onChange={event => setPostCode(event.target.value)}
            type="text"
            placeholder="0000AA"
            required
          />
        </Form.Group>
        </Form.Row>

            <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <textarea 
            className="form-control" 
            id="exampleFormControlTextarea1"
            rows="3"
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            placeholder="Description"
            disabled={description.length > 255 ? true : false}
            required
          >
          </textarea>
          <Form.Text>
            <strong>Max 255 Characters: {" "}
              {description.length}</strong>
          </Form.Text>
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
              <Form.Label>Profile picture url</Form.Label>
              <Form.Control
                value={image}
                onChange={(event) => setImage(event.target.value)}
                type="text"
                placeholder="Paste url"
              />
            </Form.Group>
            <ImageUploader
              uploadPreset="profile"
              uploadImageUrl={uploadImageUrl}
            />
            {image ? (
              <div style={{ margin: "1rem 0 0 0" }}>
                <p style={{ fontSize: "0.8rem" }}>Image preview:</p>
                <img
                  className="new-image-preview"
                  src={image}
                  alt="profile pic"
                />
              </div>
            ) : null}
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Submit changes
              </Button>
            </Form.Group>
          </Form>
        ) : null}
      </div>
    </div>
  );
}