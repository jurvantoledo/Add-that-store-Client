import React, { useState } from "react"
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectStoreDetails } from "../../store/storeDetails/selectors";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addProduct } from "../../store/stores/actions";
import ImageUploader from "../../components/ImageUploader/ImageUploader"
import { Link } from "react-router-dom";




export default function AddProduct() {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const { id } = useSelector(selectStoreDetails)
  
    console.log(id)
  
    function submitForm(event) {
      event.preventDefault();
  
      dispatch(addProduct(productName, productImage, productDescription));
  
      setProductImage("");
      setProductDescription("");
      setProductName("");
    }

    const uploadImageUrl = (url) => {
        setProductImage(url);
      }; 
  
    return (
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Add Product</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={productName}
              onChange={event => setProductName(event.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <textarea 
            className="form-control" 
            id="exampleFormControlTextarea1"
            rows="3"
            value={productDescription}
            onChange={event => setProductDescription(event.target.value)}
            type="text"
            placeholder="Description"
            disabled={productDescription.length > 255 ? true : false}
            required
          >
          </textarea>
          <Form.Text>
            <strong>Max 255 Characters: {" "}
              {productDescription.length}</strong>
          </Form.Text>
        </Form.Group>
  
          <Form.Group >
          <Form.Label>Store picture</Form.Label>
          <Form.Control
            value={productImage}
            onChange={(event) => setProductImage(event.target.value)}
            type="text"
            placeholder="Paste url"
          />
        </Form.Group>
        <ImageUploader uploadPreset="store" uploadImageUrl={uploadImageUrl} />
        {productImage ? (
          <div style={{ margin: "1rem 0 0 0" }}>
            <p style={{ fontSize: "0.8rem" }}>Image preview:</p>
            <img
              className="new-image-preview"
              src={productImage}
              alt="store pic"
            />
          </div>
        ) : null}
  
        <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
            Add Product
          </Button>
        </Form.Group>
        <Link to={`/store/${id}`}>Click here to go back to your store</Link>
        </Form>
      </Container>
    );
  }