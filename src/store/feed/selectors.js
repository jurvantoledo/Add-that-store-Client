export function selectFeedLoading(reduxState) {
    return reduxState.feed.loading;
  }
  
  export function selectFeedStores(reduxState) {
      console.log("console logged from selector",reduxState.feed.stores)
    return reduxState.feed.stores;
  }