import React from 'react'
import {Modal,Button,Form} from 'react-bootstrap'

let data = new Array(5)
class SubjectModal extends React.Component{
    constructor(){
        super()
        this.state = {show:false,showsubject:false,showformper:false,forms:new Array(5)}
    }
 
    componentDidMount(){
     this.setState({show:this.props.status})
       
    }
 
    onClose(){
     this.setState({show:false})
     this.props.fncallback(true)
     sessionStorage.removeItem('PN')
     sessionStorage.removeItem('HN')
     sessionStorage.removeItem('TN')
     sessionStorage.removeItem('interval')
    }

    initalForm(subject){
        if(subject === 'OM'){
            sessionStorage.setItem('currentSubject',subject)
            window.location.href = '/doc2'
        }else if(subject === 'Perio'){    
            sessionStorage.setItem('currentSubject',subject)
            this.setState({showformper:!this.state.showformper})
        }else if(subject === 'TLA1A' || subject === 'TLA1L'){
            sessionStorage.setItem('currentSubject',subject)
            window.location.href = '/doc2'
        }else if(subject === 'TLA2'){
            sessionStorage.setItem('currentSubject',subject)
            window.location.href = '/doc2'
        }
        
    }

    onFormsSubmit = (e) => {
        let temp = this.state.forms
        let forms = temp.filter(item => item != null)
        sessionStorage.setItem('forms',JSON.stringify(forms))
        window.location.href = '/doc2'
    }

    onFormChange = (e) =>{
       
        let info = e.target.value.split(" ")
        if(data[Number(info[1])] == info[0]){
            data.fill(null,Number(info[1]),Number(info[1])+1)
        }else{
            data.fill(info[0],Number(info[1]),Number(info[1])+1)
        }
        this.setState({forms : data})  
    }

    

     render(){
         return(
             <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='sm'>
                 <Modal.Header closeButton>
                     <Modal.Title>รายวิชา</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                         <div class='col-12 row' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Button onClick={()=>this.initalForm('OM')} variant='outline-primary'>OM</Button>&nbsp;
                        <Button onClick={()=>this.initalForm('Perio')} variant='outline-primary'>Perio</Button>
                        <Button variant='outline-primary' onClick={()=>this.initalForm('TLA2')}>Talk Case</Button>
                        <Button variant='outline-primary' onClick={()=>this.initalForm('TLA1A')}>Assistance</Button>
                        <Button variant='outline-primary' onClick={()=>this.initalForm('TLA1L')}>Laboratory</Button>
                    </div>
                    {this.state.showformper && (
                        
                        <Form>  
                            <p>{JSON.stringify(this.state.forms)}</p>
                            <input type="checkbox" value='Charting 3'  onChange={this.onFormChange}></input>
                            <label>Charting</label><br></br>
                            <input type="checkbox" value='Sc&rp 4' onChange={this.onFormChange} ></input>
                            <label>Sc&rp</label><br></br>
                            <input type="checkbox" value='Rescaling 0' onChange={this.onFormChange}></input>
                            <label>Rescaling</label><br></br>
                            <input type="checkbox" value='Recheck 2' onChange={this.onFormChange} ></input>
                            <label>Recheck</label><br></br>
                            <input type="checkbox" value='Recall 1' onChange={this.onFormChange}></input> 
                            <label>Recall</label><br></br>
                            <Button onClick={this.onFormsSubmit}></Button>
                        </Form>
                    )}
                 </Modal.Body>
                 <Modal.Footer>
                     <p>ชื่อผู้ป่วย : {sessionStorage.getItem('PN')}</p>
                 </Modal.Footer>
                 </Modal>
               
         )
     }
 }


export default SubjectModal
    

