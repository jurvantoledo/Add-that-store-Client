import React, { useEffect } from "react"
import { Col, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../store/productDetails/actions";
import { selectProductDetails } from "../../store/productDetails/selectors";
import "./productDetails.css";


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
    <Jumbotron className="productDetail-title">
        <h1>{productDetails.name}</h1>
    </Jumbotron>
    <Container className="product-container" as={Col} md={{ span: 12 }}>
        <Jumbotron className="product-info" as={Col} md={{ span: 12 }}>
            <div className="image-box"
              style={{ backgroundImage: `url(${productDetails.image})` }}
            ></div>
            <div className="productDetails-name">
                <h3>{productDetails.name}</h3>
            </div>
          <div className="product-desc">
            <div><p><strong>Description:</strong><br /> 
            {productDetails.description}</p></div>
            </div>
        </Jumbotron>
    </Container>
    </> 
)
}