import React, { useEffect } from "react"
import { Container, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchStores } from "../../store/stores/actions"
import { selectStores } from "../../store/stores/selectors"


export default function Stores() {
    const dispatch = useDispatch()
    const stores = useSelector(selectStores)

    useEffect(() => {
        dispatch(fetchStores());
      }, [dispatch]);

    return (
    <> 
        <Jumbotron>
            <h1>Hello</h1>
        </Jumbotron>
        <Container>
            {stores.map(store => {
                return(
                    <Jumbotron key={store.id}>
                        <h2>{store.name}</h2>
                        <p>{store.description}</p>
                        <p>{store.address}</p>
                    </Jumbotron>
                )
            })}
        </Container>
    </>
    )
}