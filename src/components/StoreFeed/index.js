import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  storesFetched,
  fetchNext5Stores,
} from "../../store/feed/actions";
import { selectFeedLoading, selectFeedStores } from "../../store/feed/selector";
import { Link } from "react-router-dom";
import { fetchStores } from "../../store/stores/actions";

export default function PostsFeed() {
  const dispatch = useDispatch();

  const loading = useSelector(selectFeedLoading);
  const stores = useSelector(selectFeedStores);

  async function fetchNext5Stores() {
    dispatch(startLoading);
    const response = await axios.get(
      `${API_URL}/posts?offset=${stores.length}&limit=5`
    );

    const moreStores = response.data.stores;

    dispatch(storesFetched(moreStores));
    console.log(moreStores);
  }

  useEffect(() => {
    dispatch(fetchNext5Stores);
    dispatch(fetchStores)
  }, [dispatch]);

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>
      {stores.map((store) => {
        return (
          <div key={store.id}>
            <h3>
              <Link to={`/store/${store.id}`}>{store.title}</Link>
            </h3>
            <p>{moment(store.createdAt).format("DD-MM-YYYY")}</p>
            {store.tags.map((tag) => {
              return <p key={tag.id}>{tag.tag}</p>;
            })}
          </div>
        );
      })}
      {loading}
      <em>loading...</em>
      <button onClick={fetchNext5Posts}>Load more</button>
    </div>
  );
}