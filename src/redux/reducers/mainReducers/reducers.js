const initalState = []

export function getPersonInfo(state = initalState , action){
    if(action.type === 'PERSON'){
        if(action.payload.id){
            return {
                item : {
                    forename:action.payload.forename,
                    surname:action.payload.surname,
                    id:action.payload.id
                }   
            }
        }else{
            return {
                item : {
                    forename:action.payload.forename,
                    surname:action.payload.surname,
                    studId:action.payload.studID
                }   
            }
        }
        
    }
    return state
    
}

export function getClass(state = initalState, action){
    if(action.type === 'COURSE'){
        return  {
            item : action.payload
        }
    }
    if(action.type === "SET_COURSE"){
        return {
            item : action.name
        }
    }
    if(action.type === "CONDUCTS"){
        return {
            item : action.payload
        }
    }
    
   
    return state
}


export function setCode(state = initalState,action){
    if(action.type === 'FETCH_STUDENT'){
        return {
            item : action.payload
        }
    }
    if(action.type === 'FETCH_API_PATIENT'){
        return {
            item : action.payload
        }
    }
    if(action.type === "PERIO_ID"){
        return {
            item : action.item
        }
    }
    if(action.type === "COUNT_PERIO"){
        return {
            item : action.payload
        }
    }

    return state
}