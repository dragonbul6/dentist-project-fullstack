function setCode(item){
    return {
        type : "PERIO_ID",
        item
    }
}

/* ส่งฟอร์ม perio */
export function initalRescaling(payload){
    var req = new Request('http://localhost:3000/api/sendRescaling',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
        fetch(req) 
}

export function RecheckForm(payload){
    var req = new Request('http://localhost:3000/api/sendRecheck',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
    fetch(req)
}


export function RecallForm(payload){
    var req = new Request('http://localhost:3000/api/sendRecall',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
    fetch(req)
}

export function ChartingForm(payload){
    var req = new Request('http://localhost:3000/api/sendCharting',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
    fetch(req)
}

export function SC_RPForm(payload){
    var req = new Request('http://localhost:3000/api/sendScandRp',{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })
    fetch(req)
}



/*ดึงข้อมูลฟอร์ม perio โดย HN */
export function getAllbySubject(subject,hn){
    let payload = {hn,doc_id:sessionStorage.getItem('student_id')}
    var req = new Request(`http://localhost:3000/api/perio/${subject}`,{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })

    fetch(req).then((res) => res.json()).then((res) => {
        sessionStorage.setItem('perioDash',JSON.stringify(res))
    })
}

/** ดึงข้อมูลฟอร์ม perio โดย id ฟอร์ม */
export function getPreviewPeriobyId(id,subject){
    var req = new Request(`http://localhost:3000/api/${subject}/${id}`,{
        method : 'GET',
        headers:new Headers({'Content-Type' : 'application/json'}),
    })
    fetch(req).then((res)=>res.json()).then((res)=>{
        sessionStorage.setItem('perioItems',JSON.stringify(res))
    })
}

/** อัพเดทฟอร์ม perio แบ่งตามสาขาวิชา โดย id*/
export function updatePerioFormbyId(subject,id,payload){
    var req = new Request(`http://localhost:3000/api/${subject}/${id}`,{
        method : 'PUT',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })

    fetch(req)
}

/** ดึงชื่ออาจารย์โดย conduct id */
export function getTNbyConductId(id) {
    var req = new Request(`http://localhost:3000/api/conduct/${id}`,{
        method : 'GET',
        headers:new Headers({'Content-Type' : 'application/json'}),
    })

    fetch(req).then((res)=>res.json()).then((res) => {
        sessionStorage.setItem('TN',res)
    })
}

/** เอา DX จากฟอร์มทุกฟอร์มที่เคยกรอกใน perio **/
export function GetDXbyHnandDocId(doc_id,hn){
    let payload ={
        doc_id,hn
    }

    var req = new Request(`http://localhost:3000/api/getDX`,{
        method : 'POST',
        headers:new Headers({'Content-Type' : 'application/json'}),
        body:JSON.stringify(payload)
    })

    fetch(req).then((res)=>res.json()).then((res) => {
       if(res.length > 1){
        let tableCharting = res.filter((item) => item.table_name == 'Charting')
        if(tableCharting){
         let { sel1,sel2 } = tableCharting[tableCharting.length-1]
         sessionStorage.setItem('getDX',sel1+" "+sel2)   
      }else{
          console.log('DX '+null)
      }
       }  
        
    })
}