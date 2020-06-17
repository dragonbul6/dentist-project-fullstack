import React from 'react'
import {Button,Form, Modal} from 'react-bootstrap'
import ToolbarTest from '../items/Navbar/toolbarTest'
import {connect} from 'react-redux'
import Sec1 from '../items/OMContainers/OMsec1'
import Sec2 from '../items/OMContainers/OMsec2'
import Sec3 from '../items/OMContainers/OMsec3'
import Sec4 from '../items/OMContainers/OMsec4'
import Sec1_doc1 from '../items/doc1_component/Docsec1'
import Sec2_doc1 from '../items/doc1_component/Docsec2'
import Sec3_doc1 from '../items/doc1_component/Docsec3'
import Sec4_doc1 from '../items/doc1_component/Docsec4'


class ModalValidation extends React.Component{
   constructor(){
       super()
       this.state = {show:false}
   }

   componentDidMount(){
    this.setState({show:this.props.status})
   }

   onClose(){
    this.setState({show:false})
    this.props.fncallback(1)
}
   
    getValidate(id,codefromUser){
        var req = new Request('http://localhost:3000/api/validate',{
            method : 'POST',
            headers:new Headers({'Content-Type' : 'application/json'}),
            body:JSON.stringify({id:id})
        })
        fetch(req)
        .then((res) => res.json())
        .then(async (res) => {
            var codefromDB = await res[0].code
            console.log(res)

            if(codefromUser === codefromDB){
                this.confirmStatus(id)
                alert('ถูกต้องครับ')
            }else{
                alert('รหัสผ่านไม่ถูกต้องนะครับ')
                this.refs.code.value = null
            }
        })

    
    }

    validation(e){
        e.preventDefault()
        this.checkCodition()
    }

    checkCodition(){
        var formID = this.props.id
        var codefromUser = this.refs.code.value
        this.getValidate(formID,codefromUser)
    }

   
    confirmStatus(id){
        var req = new Request('http://localhost:3000/api/SuccesfulValidate',{
            method : 'PUT',
            headers:new Headers({'Content-Type' : 'application/json'}),
            body:JSON.stringify({id:id})
        })
        fetch(req)
        window.location.href = '/'

    }

    render(){
        return(
            <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='sm'>
            
                <Modal.Header closeButton>
                    <Modal.Title>ส่งแบบฟอร์ม</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p style={{color:'red'}}>****โปรดตัวสอบความเรียบร้อยก่อนส่งฟอร์ม****</p>
                <Form>
                <Form.Control type="password" placeholder="รหัสของผู้สอน" ref = 'code' size = 'lg'/>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick ={this.validation.bind(this)} >ยืนยัน</Button>
                </Modal.Footer>
                
                </Modal>
        )
    }
}


class Validate extends React.Component{
    
    constructor(){
        super()
        this.state = {status : false,id:'',course:0,doc1:false,show:false,loaded:false}
    }

    async componentDidMount(){
       let {state} = this.props.location

        if(!this.props.match.params.id){
        this.props.history.push('/')
       }else{
        this.setState({id:this.props.match.params.id,course:state.course,doc1:state.doc1})
       
        this.setState({loaded : true})
       }
        
    }

    renderSubject(id){
        switch (id) {
            case 1:
                return "วิชา OM"
                break;
            case 4 :
                return "วิชา Perio"
                break;
            default:
                return "ยังไม่พบ"
                break;
        }
    }

    setShow(valuefromChild){
        if(valuefromChild == 1){
            this.setState({show : false})
        }
    }

    render(){
       if(this.state.loaded){
        return(
            <div>
                <ToolbarTest />
                <div style = {{paddingTop: '100px'}} >
                 <div className='row'>
                                <div className='col-sm-6'>
                                    <div style={{width:'50%'}} class='mx-auto'>
                           <h3>รายละเอียด doc1</h3>
                            <Sec1_doc1 readonly={true} data = {sessionStorage.getItem('sec1')}/>
                            <hr></hr>
                            <Sec2_doc1 readonly={true} data = {sessionStorage.getItem('sec2')} />
                            <hr></hr>
                            <Sec3_doc1 readonly={true} data = {sessionStorage.getItem('sec3')}/>
                            <hr></hr>
                            <Sec4_doc1 readonly={true} data = {sessionStorage.getItem('sec4')} />
                            <hr></hr>
                            </div>
                            </div>
                            <div className='col-sm-6'>
                                <div style={{width:'50%'}} class='mx-auto' >
            <h3>รายละเอียด {this.renderSubject(this.state.course)} | {sessionStorage.getItem('date')}</h3>
                            <Sec1 readonly={true} data = {sessionStorage.getItem('sec1')}/>
                            <hr></hr>
                            <Sec2 readonly={true} data = {sessionStorage.getItem('sec2')} />
                            <hr></hr>
                            <Sec3 readonly={true} data = {sessionStorage.getItem('sec3')}/>
                            <hr></hr>
                            <Sec4 readonly={true} data = {sessionStorage.getItem('sec4')}/>
                            <hr></hr> 
                            </div>
                            </div>
                            </div>
                            
              <div class='col-sm-12 mx-auto'>
                <hr></hr>
                <div style = {{left:'50%'}}><Button onClick ={() => this.setState({show : true})}>ยืนยัน</Button></div>
                </div>
{this.state.show && <ModalValidation status = {this.state.show} fncallback = {this.setShow.bind(this)} id={this.state.id} />}
            </div>
            </div>
            
        )
       }else{
           return(
               <h1>Hello world !</h1>
           )
       }
        
    }


}

const mapDispatchtoProps = (dispatch) => {
    return {
     
    }
}

export default connect(null,mapDispatchtoProps)(Validate)
