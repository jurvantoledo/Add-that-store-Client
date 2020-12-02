export const selectToken = state => state.user.token;

export function selectUser(reduxState) {
    return reduxState.user
}

export function selectStore(reduxState) {
    return reduxState
}

