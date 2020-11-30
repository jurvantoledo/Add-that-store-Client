import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button, Jumbotron, Container } from "react-bootstrap"
import { Col } from "react-bootstrap";
import { fetchStoreById } from "../../store/storeDetails/actions";
import { selectStoreDetails } from "../../store/storeDetails/selectors";

export default function SpaceDetails() {
  const { id } = useParams();
  const storeDetails = useSelector(selectStoreDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoreById(id));
  }, [dispatch, id]);

  return (
    <> 
      <Jumbotron>
          <h1>Details of {storeDetails.name}</h1>
      </Jumbotron>
      <Container>
           {storeDetails.products.map(product => {
               return (
                   <Jumbotron key={product.id}>
                    <div className="product-name">
                       <h1>{product.name}</h1>
                    </div>
                    <div className="product-figure">
                        <img src={product.image} />
                    </div>  
                    <div className="product-description">
                       <p><strong>Description:</strong></p>
                       <p>{product.description}</p>
                    </div>
                  <Link to={`/product/${product.id}`}>
                    <Button>See info about product</Button>
                  </Link> 
                   </Jumbotron>
               )
           })}
          <Link to={`/add-product/${id}`}>
           <Button>Add product</Button>
          </Link> 
      </Container>
    </>
  )
}