import React from 'react'
import {Button,Modal,Form,Spinner,Badge} from 'react-bootstrap'
import {AddPatient} from '../../redux/actions/ac-dashboard'
import {fetchItem} from '../../redux/actions/ac-main'
import {connect} from 'react-redux'
import { Label } from 'semantic-ui-react'

class ModalPatient extends React.Component{
    constructor(){
        super()
        this.state = {show:false,loading:false,temp:[],checkHN:[]}
    }
 
    componentDidMount(){
     let allhn 
        if( sessionStorage.getItem('allhn')){
            allhn = JSON.parse(sessionStorage.getItem('allhn'))
        }else{
            allhn = [0,0,0,0]
        }
        this.setState({show:this.props.status,temp:this.props.temp})
     this.setState({checkHN : allhn})
        
    }
 
    onClose(){
     this.setState({show:false})
     this.props.fncallback(true)
     sessionStorage.removeItem('AddStatus')
    }

    async handleonClick(){
        sessionStorage.removeItem('AddStatus')
        this.setState({loading:true})
    let patient = this.state.temp.filter((item) => item.HN === this.refs.code.value)
    if(patient.length == 1){
        setTimeout(async ()=>{
            if(this.state.checkHN.includes(this.refs.code.value)){
                this.refs.code.value = null
                this.setState({loading:false})
                document.getElementById('display').innerHTML = 'มีรายชื่อผู้ป่วยท่านนี้ในระบบแล้ว'
            }else{
                this.props.AddPatient(patient)
                setTimeout(() => {
                    this.onClose()
                    this.props.fncallback(null,true)
                    fetchItem(sessionStorage.getItem('student_id'))
                    sessionStorage.removeItem('AddStatus')
                }, 300);
               
            }
                
            }
            ,500)    
    }else{
        setTimeout(()=>{
            this.refs.code.value = null
            this.setState({loading:false})
            document.getElementById('display').innerHTML = 'โปรดตัวสอบรหัสผู้ป่วยอีกครั้ง'}
            ,1000)

    }
    }


     render(){
         return(
             <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='lg' centered>
                 <Modal.Header closeButton>
                     <Modal.Title>เพิ่มรายชื่อผู้ป่วย</Modal.Title>
                 </Modal.Header>
 
                 <Modal.Body>
                     <h3 style={{color:'red',textAlign:'center'}}>**โปรดตรวจสอบความเรียบร้อยก่อนส่งฟอร์ม**</h3>
                 <Form>
                     <Label>กรอกรหัสผู้ป่วย :</Label>
                 <Form.Control style={{alignItems:'center'}} type="text" ref = 'code' size = 'lg'/>
                 </Form>
                 </Modal.Body>
                 <Modal.Footer>
                     <p id='display' style={{color:'red'}}></p>{this.state.loading ? 
                        (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...</Button>) :
                         (<Button variant="primary" onClick ={this.handleonClick.bind(this)}>ยืนยัน</Button>)
                         }
                         
                 </Modal.Footer>
                 </Modal>
            
         )
     }
 }



 const mapDispatchtoProps = (dispatch) => {
    return {
       AddPatient : (patient) => dispatch(AddPatient(patient))
    }
}


export default connect(null,mapDispatchtoProps)(ModalPatient)
    

