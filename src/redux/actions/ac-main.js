export function getPersonInfo(payload){
    
    if(payload.id){
        return {
            type:"PERSON",
            payload : {
                forename : payload.forename,
                surname : payload.surname,
                id : payload.id,
            }
        }
    }else{
        return {
            type:"PERSON",
            payload : {
                forename : payload.forename,
                surname : payload.surname,
                studID : payload.studID,
            }
        }
    }
    
}


export function getClass(course){
    return {
        type : "COURSE",
        payload : course
    }
}
export function itemLoading(bool){
    return {
        type : "LOADING",
        status : bool
    }
}

export function fetchItem(){
    var req = new Request('http://localhost:3000/api/',{
        method : 'POST',
        headers:new Headers({'authorization' : localStorage.getItem('token'),'Content-Type' : 'application/json'}),
    })
    
    return async (dispatch) => {
    await fetch(req)
    .then(async (res) => {
        dispatch(itemLoading(true))
        return await res.json()})
    .then(async (res) => {
         let payload = {
                forename :await res[0].forename,
                surname : await res[0].surname,
                studID : await res[0].student_code,
               }
               sessionStorage.setItem('student_id',res[0].student_code)
                dispatch(getPersonInfo(payload))
       return await res
    })
    
    }
    
}




