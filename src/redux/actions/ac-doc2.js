export async function sendForm(payload){
    var req = new Request('http://localhost:3000/api/OM',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body : JSON.stringify(payload)
    })

  fetch(req)
    
}

export function getOM(HN){
    let payload = {
        HN,doc_id:sessionStorage.getItem('student_id')
    }
    var req = new Request('http://localhost:3000/api/getOM',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body : JSON.stringify(payload)
    })

    fetch(req).then((res) => res.json()).then(async (res) => sessionStorage.setItem('OM',JSON.stringify(await res)))

}