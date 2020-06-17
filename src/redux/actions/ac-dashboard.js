export function getClass(name){
    return {
        type:'SET_COURSE',
        name
    }
}


export function setCode(payload,x){
    if(x){
        return {
            type : 'FETCH_STUDENT',
            payload
        }  
    }else{
        return {
            type : 'FETCH_API_PATIENT',
            payload
        }  
    }
      

}

export function getItemPreview(item){
    return {
        type:'SET_ITEM',
        item
    }
}

export function AddPatient(patient){
    var req = new Request('http://localhost:3000/api/addPatient',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify({id:sessionStorage.getItem('student_id'),patient})
    })
 return (dispatch) => {
     fetch(req).then((res) => res.json()).then(async (res) => sessionStorage.setItem('AddStatus',await res))
    }
}

export function getAllpatient(){
    var req = new Request('http://localhost:3000/api/getPatient',{
        method : 'GET',
        headers:new Headers({'Content-Type' : 'application/json'}),
       
    })

    return (dispatch) => {
        fetch(req).then((res) => res.json())
        .then(async (res) => {
            
            dispatch(setCode(res,false))
        })
    }
}

export function fetchList(id){
   
    var req = new Request('http://localhost:3000/api/dashboard',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify({id:id})
    })

    return (dispatch) => {
        fetch(req)
        .then((res) => res.json())
        .then((item) => {
            let arr = item
            let allhn = []
            if(arr.length > 1){
                arr.sort((a,b) => b.id - a.id)
                sessionStorage.setItem('max',arr[0].id)
                arr.map((item) => {
                    allhn.push(item.HN)
                })
                sessionStorage.setItem('allhn',JSON.stringify(allhn))
            }
            
            dispatch(getClass(arr))
        })
    }

}

export function fetchListStudent(){
    var req = new Request('http://localhost:3000/api/getStudent',{
        method : 'GET',
        headers:new Headers({'Content-Type' : 'application/json'}),
    })

    return (dispatch) => {
        fetch(req)
        .then((res) => res.json())
        .then((item) => {
            let arr = item
            if(arr.length > 1){
                arr.sort((a,b) => b.id - a.id)
                
            }
            
            dispatch(getClass(arr,true))
        })
    }
}


export function getPatientListByStudentID(id) {
    let payload = {
        id
    }

    
    var req = new Request('http://localhost:3000/api/getPatientbyTeacher',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
    
        fetch(req)
        .then((res) => res.json())
        .then((item) => {
            sessionStorage.setItem('pList',JSON.stringify(item))
            
        })

}