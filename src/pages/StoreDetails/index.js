import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button, Jumbotron, Container } from "react-bootstrap"
import { Col } from "react-bootstrap";
import { deleteProduct, fetchStoreById } from "../../store/storeDetails/actions";
import { selectStoreDetails } from "../../store/storeDetails/selectors";
import { selectUser } from "../../store/user/selectors";
import "./storeDetails.css";


export default function SpaceDetails() {
  const { id } = useParams();
  const storeDetails = useSelector(selectStoreDetails);
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoreById(id));
  }, [dispatch, id]);

  const displayButton =
  user.id === storeDetails.userId;

  const onDelete = id => {
    console.log("deleting product!", id);
    dispatch(deleteProduct(id));
  };

  console.log(onDelete)

  return (
    <> 
      <Jumbotron className="storeDetails-title"
        style={{ backgroundImage: `url(${storeDetails.image})` }}
      >
          <h1>Details of {storeDetails.name}</h1>
      </Jumbotron>
      { displayButton ? <Link className="product-link" to={`/add-product/${id}`}>
           <Button className="add-product-btn">Add A Product</Button>
          </Link> : null}
      <Container as={Col} md={{ span: 12 }} className="mt-5">
           {storeDetails.products.map(product => {
               return (
                   <Jumbotron key={product.id} as={Col} md={{ span: 3 }} className="mt-12">
                    <div className="product-figure"
                    style={{ backgroundImage: `url(${product.image})` }}
                    >
                    </div> 
                    <div className="product-name">
                       <h1>{product.name}</h1>
                    </div> 
                    <div className="product-description">
                       <p><strong>Description:</strong></p>
                       <p>{product.description}</p>
                    </div>
                  <Link to={`/product/${product.id}`}>
                    <Button>See info about product</Button>
                  </Link>
                  { displayButton ? <Button
                    className="delete-button" 
                    variant="danger"
                    onClick={() => dispatch(deleteProduct(product.id))}
                    >Delete product</Button> : null}
                   </Jumbotron>
               )
           })}
      </Container>
    </>
  )
}