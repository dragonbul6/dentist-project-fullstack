export function SetToken(token){
        return {
            type : 'TOKEN',
            payload : {
                token
            }
        }

}

export function checkAuth(payload){
    let data = {
        username : payload.username,
        password : payload.password
    }
    var req = new Request('http://localhost:3000/api/login',{
        method : 'POST',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(data)
    })

    return async (dispatch) => {
        await fetch(req)
        .then(async (res)=>{
           
            return await res.json()
        }).then(async (res) => {
            var result =  await res
            if(result){
                dispatch(SetToken(await result))
                localStorage.setItem('token', await result)
            }
            
        })
        
    }
}




