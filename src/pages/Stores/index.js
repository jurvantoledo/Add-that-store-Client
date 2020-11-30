import React, { useEffect, useState } from "react"
import { Button, Container, Jumbotron } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchStores } from "../../store/stores/actions"
import { selectStores } from "../../store/stores/selectors"
import { Col } from "react-bootstrap";

import "./stores.css";


export default function Stores() {
    const dispatch = useDispatch()
    const stores = useSelector(selectStores)

    useEffect(() => {
        dispatch(fetchStores());
      }, [dispatch]);


    return (
    <> 
        <Jumbotron className="Homepage-title">
            <h1>Hello</h1>
        </Jumbotron>
        <Container as={Col} md={{ span: 12 }} className="mt-5">
            {stores.map(store => {
                return(
                    <Jumbotron key={store.id} as={Col} md={{ span: 3 }} className="mt-12">
                        <h2>{store.name}</h2>
                    <div className="figure">
                        <img src={store.image} />
                    </div>  
                    <div className="description">
                       <p><strong>Description:</strong></p>
                        <p>{store.description}</p>
                    </div>
                    <div className="category">
                    <p><strong>category:</strong></p>
                        <p>{store.category}</p>
                    </div>
                    <div className="address">
                        <p><strong>Country:</strong> {store.country}</p>
                        <p><strong>City:</strong> {store.city}</p>      
                        <p><strong>Address:</strong> {store.address}</p>
                    </div>
                    <Link to={`/store/${store.id}`} >
                        <Button>Go to store</Button>
                    </Link>    
                    </Jumbotron>
                )
            })}
        </Container>
    </>
    )
}