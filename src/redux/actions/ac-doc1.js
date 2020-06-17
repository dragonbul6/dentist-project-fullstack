
function getClass(item) {
    return {
        type : 'CONDUCTS',
        payload : item
    }
}
function setCode(payload) {
    return {
        type : "COUNT_PERIO",
        payload
    }
    
}

export function sendFormDoc1(payload){
    var req = new Request('http://localhost:3000/api/doc1',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body : JSON.stringify(payload)
    })
   fetch(req)

    
}

export function getConductbyconId(id){
    let payload = {id}
    var req = new Request('http://localhost:3000/api/getPreivewconduct',{
        method: 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body : JSON.stringify(payload)
    })
    fetch(req).then((res)=>res.json()).then( async (res)=>sessionStorage.setItem('conduct',JSON.stringify(await res)))
}


export function getConductbyDocId(doc_id) {
    
    var req= new Request('http://localhost:3000/api/conductbydocid/'+doc_id,{
        method:'GET',
        headers:new Headers({'Content-Type' : 'application/json'}),
    })

    return (dispatch) => {
        
        fetch(req).then((res) => res.json()).then((res) => {
            let Allcount = 0
            res.sort((a,b) => b.conduct_id - a.conduct_id)
            res.map((item) => {
                
                getAnswer(item.answer,(count) => Allcount = Allcount+count)
                sessionStorage.setItem('count',Allcount)
                }
                )
           
            dispatch(getClass(res))
        })
    }

    
}

function getAnswer(payload,fn){
    if(payload){
        let countsec1 = payload.sec1.filter((i) => i == 3).length
        let countsec2 = payload.sec2.filter((i) => i == 3).length
        let countsec3 = payload.sec3.filter((i) => i == 3).length
        let countsec4 = payload.sec4.filter((i) => i == 3).length
        let countsec5 = payload.sec5.filter((i) => i == 3).length
        let count = countsec1+countsec2+countsec3+countsec4+countsec5
        return fn(count)
        
    }else{
        return 0
    }
}

export function getAmountofPerio(doc_id){
    var req= new Request('http://localhost:3000/api/getAmountPerio',{
        method:'post',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify({doc_id})
    })
    
    return (dispatch) => {
        fetch(req).then((res)=>res.json()).then((res)=>dispatch(setCode(res)))
    }
    
}

export function sendTLA(kn){
    var req = new Request('http://localhost:3000/api/conductTLA',{
        method:'post',
        headers:new Headers({'Content-type' : 'application/json'}),
        body:JSON.stringify({kn,doc_id:sessionStorage.getItem('student_id'),hn:sessionStorage.getItem('HN')})
    })

    fetch(req)
}