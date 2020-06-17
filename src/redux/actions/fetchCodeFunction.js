export function fetchCode(TN){
    let payload = {
        TN : sessionStorage.getItem('TN')
    }
    var req = new Request('http://localhost:3000/api/getCode',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload) 
    })
   
        fetch(req).then(res => res.json()).then((res) => {
            sessionStorage.setItem('pass',btoa(res.passcode))
        })    
    
}

export function onUpdateStatus(id){
    let payload = {id}
    var req = new Request('http://localhost:3000/api/updateform',{
        method : 'PUT',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload) 
    })

    fetch(req)
}

export function setCode(code){
    return {
        type:'SET_CODE',
        code
    }
}