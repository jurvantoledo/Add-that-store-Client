import React, { useEffect } from "react"
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../store/productDetails/actions";
import { selectProductDetails } from "../../store/productDetails/selectors";


export default function ProductDetails() {
  const { id } = useParams();
  const productDetails = useSelector(selectProductDetails);
  const dispatch = useDispatch();

  console.log(productDetails)

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

return (
   <> 
    <Jumbotron>
        <h1>{productDetails.name}</h1>
    </Jumbotron>
    <Container>
        <Jumbotron className="product-info">
            <img src={productDetails.image} alt="product-image"/>
            <p className="product-desc">{productDetails.description}</p>
        </Jumbotron>
    </Container>
    </> 
)
}