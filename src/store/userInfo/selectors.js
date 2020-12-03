export function selectUserInfo(reduxState) {
    console.log("USERINFO SELECTOR", reduxState)
    return reduxState.userInfo
}

export function selectUserStoreInfo(reduxState) {
    console.log("STORE INFO SELECTOR", reduxState.userInfo[0].store)
    return reduxState.userInfo
}