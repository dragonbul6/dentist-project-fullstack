
const initalState = []


export function SetToken(state = initalState , action) {
    if(action.type === "TOKEN"){
        return action.payload.token
    }
    return state
}






