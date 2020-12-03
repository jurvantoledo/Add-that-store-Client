export function selectUserInfo(reduxState) {
    console.log("USERINFO SELECTOR", reduxState)
    return reduxState.userInfo
}