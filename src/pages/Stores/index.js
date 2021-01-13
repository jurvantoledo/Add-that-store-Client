import React, { useEffect, useState } from "react"
import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { Container, Form, Jumbotron } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux"
import { Col } from "react-bootstrap";
import Store from "../../components/Store/index"
import {
  storesFetched,
} from "../../store/feed/actions";
import { selectFeedLoading, selectFeedStores } from "../../store/feed/selectors";

import "./stores.css";
import { 
  appDoneLoading, 
  appLoading 
} from "../../store/appState/actions";

export default function Stores() {
    const dispatch = useDispatch()
    const feedStores = useSelector(selectFeedStores)
    const loading = useSelector(selectFeedLoading);
    const [search, setSearch ] = useState("")
  
    useEffect(() => {
        dispatch(fetchNext5Stores);
        
      }, [dispatch]);
  
    async function fetchNext5Stores() {
      const storeCount = feedStores.length;
      const response = await axios.get(
        `${apiUrl}store?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${storeCount}`
      );
  
      const moreStores = response.data.stores.rows;
  
      dispatch(storesFetched(moreStores));
    }

    const filteredStores = feedStores.filter(store => {
      return store.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })


    return (
    <> 
        <Jumbotron className="Homepage-banner"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)` }}
        >
        </Jumbotron>
      <Container className="Search-options">
        <Form as={Col} md={{ span: 6 }} className="search-bar">
                <Form.Control
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  type="text"
                  placeholder="Search for a store"
                />
            </Form>
        </Container>
        <Container as={Col} md={{ span: 12 }} className="mt-5">
            {filteredStores.map(store => {
                return (
                        <Store
                          key={store.id}
                          id={store.id}
                          name={store.name}
                          image={store.image}
                          description={store.description}
                          category={store.category}
                          country={store.country}
                          city={store.city}
                          address={store.address}
                          showLink={true}

                        />
                      );
                    })}
        </Container>
        {loading ?
      <em>loading...</em> : null}
     <div>
      <Button className="load-more" onClick={fetchNext5Stores}>Load more</Button>
      </div> 
    </>
    )
}