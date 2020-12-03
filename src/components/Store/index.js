import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";


export default function Store(props) {
  return (
    <Jumbotron key={props.id} as={Col} md={{ span: 3 }} className="mt-12">
                    <div className="figure" 
                     style={{ backgroundImage: `url(${props.image})` }}
                    >
                    </div> 
                        <h2>{props.name}</h2> 
                    <div className="description">
                       <p><strong>Description:</strong></p>
                        <p>{props.description}</p>
                    </div>
                    <div className="category">
                    <p><strong>Category:</strong></p>
                        <p>{props.category}</p>
                    </div>
                    <div className="address">
                        <p><strong>Country:</strong> {props.country}</p>
                        <p><strong>City:</strong> {props.city}</p>      
                        <p><strong>Address:</strong> {props.address}</p>
                    </div>
                    <Link to={`/store/${props.id}`} >
                        <Button>Go to store</Button>
                    </Link>    
    </Jumbotron>
                )
            }
