import React from 'react'
import {Button,Col, Alert, Modal, Nav, Spinner, Form} from 'react-bootstrap'
import Sec1 from '../../items/OMContainers/OMsec1'
import Sec2 from '../../items/OMContainers/OMsec2'
import Sec3 from '../../items/OMContainers/OMsec3'
import Sec4 from '../../items/OMContainers/OMsec4'

import OMsec1 from '../../items/OMContainers/om01'
import OMsec2 from '../../items/OMContainers/om02'
import OMsec3 from '../../items/OMContainers/om03'
import OMsec4 from '../../items/OMContainers/om04'
import ToolbarTest from '../../items/Navbar/toolbarTest'
import Conduct from '../../pages/MainDoc1'

import {sendFormDoc1} from '../../../redux/actions/ac-doc1'
import {sendForm} from '../../../redux/actions/ac-doc2'
import {fetchCode} from '../../../redux/actions/fetchCodeFunction'

import '../../styles/Ommain.css'
import '../../styles/om.css'

class Modal_status extends React.Component{
    constructor(){
        super()
        this.state = {show:false,loading:true}
    }
    
    componentDidMount(){
        this.setState({show : this.props.show})
        
    }

    handleClose = () => {
        this.setState({show:false})
        this.props.fnshow(false)
        sessionStorage.removeItem('PN')
        sessionStorage.removeItem('HN')
        sessionStorage.removeItem('TN')
        document.location.href = '/'
    }
    
    render(){   
        
        return (
            <div>
                {setTimeout(()=>this.setState({loading : false}),1500)}
            <Modal show={this.state.show} onHide={this.handleClose} centered size="lg"
            aria-labelledby="contained-modal-title-vcenter">
                {this.timeout}
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                ผลลัพธ์
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {this.state.loading ? (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <Spinner animation="border" role="status" size='lg'/>
                  </div>) : (
                      <Alert variant="success">
                      <Alert.Heading>ยินดีด้วยคุณได้ทำแบบฟอร์มวิชา OM เสร็จสิ้น</Alert.Heading>
                      <p>
                        ระบบจะพาคุณกลับไปที่หน้ารายชื่อของคนไข้
                      </p>
                    </Alert>
                  )}
                  
                  </Modal.Body>
                 <Modal.Footer>
                     {this.state.loading ? <Button disabled variant="primary" onClick={this.handleClose}>
                  ยืนยัน
                </Button> : <Button variant="primary" onClick={this.handleClose}>
                  ยืนยัน
                </Button>}
                 
                     </Modal.Footer> 
            </Modal>
         </div>
        )
    }
}

class OM extends React.Component{
 
    constructor(){
        super()
        this.state = {show : false,value : '',conduct:false ,conduct_data:[],loading : false,validate:false}
        this.state = {sec1data:[],sec2data:[],sec3data:[],sec4data:[]}
        
    }


    scroll = (e) => {
        let id = e;
        if (id === 1) {
            document.getElementById("black").scrollIntoView();
        } else {
            document.getElementById("yellow").scrollIntoView();
        }
    }

    validateProcess = () => {
        this.setState({loading : true})
        let pass = this.refs.pass.value
        setTimeout(() => {
            if(pass === atob(sessionStorage.getItem('pass'))){
                this.setState({loading : false})
                this.sendForm()
                sessionStorage.removeItem('pass')
            }else{
                this.setState({loading : false})
                this.refs.pass.value = null
            }
        }, 1200);
        
    }

   sendForm(){
        this.setState({show : true})
        
        let {sec1data,sec2data,sec3data,sec4data} = this.state
        var arr = {"sec1":sec1data,"sec2":sec2data,"sec3":sec3data,"sec4":sec4data}
        let payload = {
            answers : arr,
            TN : sessionStorage.getItem('TN'),
            HN : sessionStorage.getItem('HN'),
            doc_id : sessionStorage.getItem('student_id'),
            interval : sessionStorage.getItem('interval')  
        }
        
        sendFormDoc1(this.state.conduct_data)
        setTimeout(() => {
            sendForm(payload)
        }, 200);
        
        
        
    }

    statussec1(arrData){
        this.setState({sec1data : arrData})
        
    }

    statussec2(arrData){
        this.setState({sec2data : arrData})
        
    }
    statussec3(arrData){
        
        this.setState({sec3data : arrData})
        
    }

    statussec4(arrData){
        
        this.setState({sec4data : arrData})
    }
    
 
    
    render(){
        if(this.props.answer){
            let {answer} = this.props
            return(
                <div className="App">
                <div className="App-header">
                <div className="card" style={{width:'80%',fontSize:"15px"}}>
                    <br></br>
                    <p>แบบฟอร์มประเมินการปฏิบัติงานคลินิกโรคเยื่อเมือกช่องปาก และความเจ็บปวดบริเวณขากรรไกรและใบหน้า</p>
                    <hr></hr>
                    <h4 className="font"><p>แบบฟอร์มพรีวิว</p></h4>
                    <hr></hr>
                    <Form>
                    <div class="subtopic">
                    <Form.Label>การตรวจ </Form.Label>
                    <Sec1 value={answer.sec1}/>
                    </div>
                    <hr />
                    <div class="subtopic2">
                    <Form.Label>การวินิจฉัย </Form.Label>
                    <Sec2 value = {answer.sec2}/>
                    </div>
                   <hr></hr>
                   <div class="subtopic">
                   <Form.Label>การวางแผนการรักษา </Form.Label>
                   <Sec3 value={answer.sec3} />
                   </div>
                    <hr></hr>
                    <div class="subtopic2">
                    <Form.Label>การติดตามผลการรักษา </Form.Label>
                   <Sec4 value={answer.sec4} />
                   </div>
                   <hr></hr>
                    <Button variant="primary" type="submit" onClick={()=>window.close()}>ปิด</Button>
                    </Form>
                    </div>
                    </div>
                    </div>
            )
        }else{
            return(
                <div className="center">
                    <div>
                    <ToolbarTest />
                </div>
                <Conduct data = {(payload) => {
                    this.setState({conduct_data : payload}) 
                    fetchCode(sessionStorage.getItem('TN'))}} 
            status = {(x) => this.setState({conduct:x})}/>}
                <div className="center">
                   <Form>
                    <Form.Row>
                        <Col sm={10}>
                            <div id="1" >
                            <OMsec1 data ={this.statussec1.bind(this)}  />
                            </div>
                            <OMsec2 data={this.statussec2.bind(this)}/>
                            <OMsec3 data={this.statussec3.bind(this)} />
                            <div className="c1"></div>
                            <hr></hr>
                            <div id="2" >
                            <OMsec4 data={this.statussec4.bind(this)} />
                            </div>
                            <div>
                            {this.state.conduct ? (<div><h3>ยืนยันให้อาจารย์</h3>
                            <input type='password' ref='pass' placeholder='รหัสอาจารย์'/>
                            {this.state.loading ? (<div>
                        <Button variant='success'>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...
                            </Button>
                            <Button disabled variant='danger' 
                            onClick={()=>this.setState({validate:false})}>ยกเลิก</Button>
                            </div>):
                            (<div>
                                <Button variant='success' onClick={this.validateProcess}>ยืนยัน</Button>&nbsp;
                                </div>)}</div>):<h1>โปรดระบุชื่ออาจารย์</h1>}
                            

                    </div>
                            {this.state.show && <Modal_status show={this.state.show} fnshow = {(e) => this.setState({show : e})}></Modal_status>}
                            
                        </Col>
                        <Col>
                            <Nav  class="position-fixed"  className="flex-column">
                                <Nav.Link href="#1">แบบฟอร์มประเมินการปฏิบัติงานคลินิกโรคเยื่อเมือกช่องปาก</Nav.Link>
                                <Nav.Link href="#2">การติดตามผลการรักษา</Nav.Link>
                            </Nav>
                        </Col>
                    </Form.Row>
                </Form>
                    
                     
                </div>
            </div>)

        }
            

    }
}




export default OM
