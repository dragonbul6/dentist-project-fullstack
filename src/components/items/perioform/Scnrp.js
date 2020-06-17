import React, { Component } from 'react'
import { Image,Tooltip, Button, Row, Col,Card, OverlayTrigger, Accordion, InputGroup, FormControl, Modal,Spinner } from 'react-bootstrap'
import '../../styles/perio.css'

import {fetchItem} from '../../../redux/actions/ac-main'
import {connect} from 'react-redux'
import {SC_RPForm} from '../../../redux/actions/ac.perio'
import {fetchCode} from '../../../redux/actions/fetchCodeFunction'

let areas = new Array(6)
class MyVerticallyCenteredModal extends React.Component {
    constructor() {
        super()
        this.state = { show: false , area:[],loaded : false }
        
    }

    componentDidMount() {
        this.setState({ show: this.props.show })
        if(this.props.item){
            this.setState({area : this.props.item})
            areas = this.props.item  
    }
    this.setState({loaded : true})
}

    onHide = () => {
        this.setState({ show: false })
        this.props.fncallback(true,this.state.area)
    }

    onClickChange = (e) =>{
       let info = e.target.id.split(" ")
       if(areas[Number(info[1])]){
           areas[Number(info[1])] = null
       }else{
        areas[Number(info[1])] = e.target.value
       }
        this.setState({area : areas})  
    }

    render() {

        return (
            <Modal
            show={this.state.show} onHide={this.onHide}
            size="lg"
            aria-labelledby="example-custom-modal-styling-title"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>เลือกขอบเขต</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Row>
                        <Col className="text-center">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">UA</Tooltip>}>
                                <li><input type="checkbox" id="area 0" value='UA' onClick={this.onClickChange}/>
                                    <label for="cb1"><img style={{ width: '15rem' }} src="https://www.img.in.th/images/5442f00497905155c373f3ca11d39dad.png" /></label>
                                </li>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col >
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">URP</Tooltip>}>
                                    <li><input type="checkbox" id="area 1" value='URP' onClick={this.onClickChange} />
                                    <label for="cb2"><img style={{ width: '10rem' }} src="https://www.img.in.th/images/b9ac468cadf09677f51452c8950aee83.png" /></label>
                                </li>
                                    </OverlayTrigger> 

                            
                                    </Col>
                            <Col>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">ULP</Tooltip>}>
                           <li><input type="checkbox" id="area 2" value='ULP' onClick={this.onClickChange}/>
                                    <label for="cb3"><img style={{ width: '10rem' }} src="https://www.img.in.th/images/4081eca2294cfcb2632a3056b3d0f6eb.png" /></label>
                                </li>
                                    </OverlayTrigger> </Col>
                    </Row>
                        <hr></hr>

                        <Row className="text-center">
                            <Col >
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">DRP</Tooltip>}>
                                <li><input type="checkbox" id="area 3" value='DRP' onClick={this.onClickChange}/>
                                    <label for="cb4"><img style={{ width: '10rem' }} src="https://www.img.in.th/images/3dd7a2ae1cc22874966d0de62605ecca.png" /></label>
                                </li>
                                </OverlayTrigger></Col>
                            <Col > 
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">DLP</Tooltip>}>
                            <li><input type="checkbox" id="area 4" value='DLP' onClick={this.onClickChange}/>
                                    <label for="cb5"><img style={{ width: '10rem' }} src="https://www.img.in.th/images/70f20b7c4f106e413a2fed302aed7f5b.png" /></label>
                                </li></OverlayTrigger></Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">DA</Tooltip>}>
                                <li><input type="checkbox" id="area 5" value='DA' onClick={this.onClickChange} />
                                    <label for="cb6"><img style={{ width: '15rem' }} src="https://www.img.in.th/images/a7f992e65b62f734ef9bf675dcd272bf.png" /></label>
                                </li>
                                </OverlayTrigger> </Col>
                        </Row>

                </div>
            </Modal.Body>
                <Modal.Footer>
                    จำนวนที่เลือก : {JSON.stringify(this.state.area)}<br></br>
                    <Button variant="primary" onClick={this.onHide}>บันทึก</Button>
                </Modal.Footer>
        </Modal>

)
    }
}


let data = new Array(9)
class Scnrp extends Component {
    constructor() {
        super()
        this.state = {
            sp1: ''
        }
        this.state = {
            sp2: ''
        }
        this.state = {
            sp3: ''
        }
        this.state = {
            sp4: ''
        }
        this.state = {
            sp5: ''
        }
        this.state = {
            sp6: ''
        }
        this.state = {
            sp7: ''
        }
        this.state = {
            sp8: ''
        }
        this.state = {
            sp9: ''
        }
        this.state = {
            sp10: '',
            showModal: false,date:'',sel1:'Mild',sel2:'Gingivitis',area:new Array(6),status:false,validate:false,loading:false
        }

    }

    async componentDidMount(){
        var today = new Date()
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time
        this.setState({date:dateTime})  
        await this.props.fetchAccount()  
        if(sessionStorage.getItem('getDX')){
            let dx = sessionStorage.getItem('getDX').split(" ")
            this.setState({sel1:dx[0],sel2:dx[1]})
        }
        this.setState({status : true})
    }

    highlight = (e) => {
        let id = e;
        if (id === 1) {
            setTimeout(() => {
                document.getElementById("1").style.borderColor = "red"
            }, 1000);
        }
    }

    
    validateProcess = () => {
        this.setState({loading : true})
        let pass = this.refs.pass.value
        setTimeout(() => {
            if(pass === atob(sessionStorage.getItem('pass'))){
                this.setState({loading : false})
                alert('ถูกต้องครับ')
                this.handleOnSend(true)
                sessionStorage.removeItem('pass')
            }else{
                this.setState({loading : false})
                this.refs.pass.value = null
                alert('ไม่ถูกต้องครับ')
            }
        }, 1200);
        
    }

    handleOnSend=(finished)=>{
        
        let payload 
            if(finished){
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),"finish":true,
                "date" : this.state.date,"HN":sessionStorage.getItem('HN'),"area":this.state.area,"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                for (let i = 1; i < data.length+1; i++) {
                    let name = 'sp'+i
                    document.getElementsByName([name])[0].disabled = true
                    document.getElementsByName([name])[1].disabled = true
                    document.getElementsByName([name])[2].disabled = true
                   }
                   document.getElementById('spsel0').disabled = true
                   document.getElementById('spsel1').disabled = true
                   document.getElementById('spsel2').disabled = true
                   SC_RPForm(payload)
                   setTimeout(() => {
                    alert('บันทึกเสร็จสิ้น')
                    window.location.href ='/'
                }, 600); 
            }else{
                let bool = window.confirm('หากส่งแล้วจะไม่สามารถกลับมาแก้ไขได้ จะส่งหรือไม่?')
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),
                "date":this.state.date,"finish":false,"HN":sessionStorage.getItem('HN'),"area":this.state.area,"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                if(bool){
                    SC_RPForm(payload)
                    setTimeout(() => {
                        alert('บันทึกเสร็จสิ้น')
                        window.location.href ='/'
                    }, 600); 
                }        
            }

     }

     checkdatainConst(){
       let finished = true
       for (let index = 0; index < data.length; index++) {
          if(!data[index]){
              finished = false
          }       
       }
         return finished
     }

     renderButton = () => {
         if(this.checkdatainConst()){
             return <Button onClick={()=>{
                 this.setState({validate : true})
                 fetchCode(sessionStorage.getItem('TN'))  
                }
                } variant='outline-success'>ส่งให้อาจารย์</Button>
         }else{
             return <Button onClick={this.handleOnSend.bind(this,false)} variant='outline-warning'>ส่งแบบฟอร์ม</Button>
         }     
     }



    render() {
        return (
            <div>
                <div className="c2">
                    <Card style={{ width: '100%' }} className="text-center">
                        <Card.Header ><h4>แบบฟอร์มประเมิน Sc & Rp</h4></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {' '}
                                    {this.state.status ? <p>{this.props.account.forename} {this.props.account.surname}</p> : <p>Loading..</p>}
                            <br></br>
                                    อาจารย์ {sessionStorage.getItem('TN')}{' '}
                                </p>
                                <footer className="blockquote-footer">
                                    ณ วัน่ที่ {this.state.date}
                        </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>


                <div className="c1">
                    <Card >
                        <table border="1">
                            <thead className="th">
                                <tr>
                                    <td colspan="2">Sc & Rp </td>
                                    <td>
                                        
                                        <Button id='spsel0' variant="light" onClick={() => this.setState({ showModal: true })}>
                                            Area</Button><br></br>
                                            คุณเลือก :{JSON.stringify(this.state.area.filter((area) => area != null))}

                                        {this.state.showModal && <MyVerticallyCenteredModal  
                                        item = {this.state.area}
                                        show={this.state.showModal} 
                                        fncallback={(e,area) => e && this.setState({ showModal: false , area : area })} />}
                                    </td>
                                    <td> 
                                        <select class="form-control" id="spsel1" name="sellist1" 
                                        value={this.state.sel1}
                                        onChange={(e) => this.setState({sel1:e.target.value})}>
                                            <option value='Mild'>Mild</option>
                                            <option value='Moderate'>Moderate</option>
                                            <option value='Severe'>Severe</option>
                                        </select>
                                    </td>

                                    <td ><select class="form-control" id="spsel2" name="sellist2" 
                                    value={this.state.sel2}
                                    onChange={(e) => this.setState({sel2:e.target.value})}>
                                        <option value='Gingivitis'>Gingivitis</option>
                                        <option value='Periodontitis'>Periodontitis</option>
                                    </select></td>

                                    <td >
                                        <InputGroup size="sm">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>other</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl />
                                        </InputGroup>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">1.Beginning check&nbsp;&nbsp;</td>
                                    <td >A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td></td>
                                </tr>
                                <tr onChange={(e) => data[0] = e.target.value} >
                                    <td colspan="2">รายงานเคสผู้ป่วย&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp1" value="ได้ความสำคัญครบถ้วน เป็นลำดับ" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp1" value="ได้ความสำคัญแต่ไม่ครบถ้วน" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp1" value="ไม่ได้ความสำคัญ ไม่ครบถ้วน" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td >{this.state.sp1}</td>
                                </tr>
                                <tr onChange={(e) => data[1] = e.target.value}>
                                    <td colspan="2">การจัดเตรียมเครื่องมือและยูนิต&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp2" value="เตรียมแต่ไม่ครบถ้วน ไม่พร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td >{this.state.sp2}</td>
                                </tr>
                                <tr >
                                    <td colspan="2">2.Process: Scaling &amp; Root planing&nbsp;&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                </tr>
                                <tr onChange={(e) => data[2] = e.target.value}>
                                    <td colspan="2">การจัดตำแหน่งผู้ป่วยตาม area of operation</td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยุ่ในตำแหน่งที่ถูดต้องเหมาะสมตลอดเวลา" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยู่ในตำแหน่งที่เหมาะสม แต่ไม่ตลอดเวลา" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยู่ในตำแหน่งที่ไม่เหมาะสมบ่อยครั้ง" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td >{this.state.sp3}</td>
                                </tr>
                                <tr onChange={(e) => data[3] = e.target.value}>
                                    <td colspan="2">ตำแหน่งของทันตแพทย์ตาม area of operation&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ถูกต้องเหมาะสม ตลอดเวลา" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ถูกต้องเหมาะสม แต่ไม่ตลอดเวลา" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ไม่เหมาะสมบ่อยครั้ง" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td >{this.state.sp4}</td>
                                </tr>
                                <tr onChange={(e) => data[4] = e.target.value}>
                                    <td rowspan="2">การปฏิบัติงานในช่องปาก</td>
                                    <td >ใช้เครื่องมือได้ถูกต้องตาม area of operation ได้ตลอดเวลา</td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือได้ถูกต้อง ตาม area of operation ได้ตลอดเวลา" onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือได้ถูกต้อง ตาม area of operation แต่ไม่ตลอดเวลา"  onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือไม่ได้ถูกต้อง ตาม area of operation มีข้อผิดพลาดบ่อยครั้ง"  onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td >{this.state.sp5}</td>
                                </tr>
                                <tr onChange={(e) => data[5] = e.target.value}>
                                    <td >มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม ตลอดเวลา</td>
                                    <td ><input type="radio" name="sp6" value="มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม ตลอดเวลา"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp6" value="มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม แต่ไม่ตลอดเวลา"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp6" value="ไม่มี Rest & Guard และ Visibility ที่ดี"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td >{this.state.sp6}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">&nbsp;4.Product&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                </tr>
                                <tr onChange={(e) => data[6] = e.target.value}>
                                    <td rowspan="2">&nbsp;&nbsp;ความสะอาดและความเรียบ</td>
                                    <td>เหนือเหงือก&nbsp;</td>
                                    <td ><input type="radio" name="sp7" value="สะอาดและเรียบดีมากทุกด้าน"  onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp7" value="สะอาดและเรียบดี มีข้อผิดพลาดบ้าง ไม่เกิน 2 ตำแหน่ง" onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp7" value="ไม่สะอาดและไม่เรียบ มีข้อผิดพลาดมากเกิน 2 ตำแหน่ง"  onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td >{this.state.sp7}</td>
                                </tr>
                                <tr onChange={(e) => data[7] = e.target.value}>
                                    <td >ใต้เหงือก&nbsp;</td>
                                    <td ><input type="radio" name="sp8" value="สะอาดและเรียบดีมากทุกด้าน / หรือติดเล็กน้อย"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp8" value="สะอาดและเรียบดี มีข้อผิดพลาดบ้าง ไม่เกิน 3-4 ตำแหน่ง"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp8" value="ไม่สะอาดและไม่เรียบ มีข้อผิดพลาดมากเกิน 4 ตำแหน่ง"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td >{this.state.sp8}</td>
                                </tr>
                                <tr onChange={(e) => data[8] = e.target.value}>
                                    <td colspan="2">&nbsp;&nbsp;สภาพ soft tissue</td>
                                    <td ><input type="radio" name="sp9" value="ไม่พบ tissue trauma / หรือพบ IDP traumaไม่เกิน 1 ตำแหน่ง"  onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp9" value="tissue trauma บริเวณ marginal gingiva และ IDP trauma ไม่เกิน 2 ตำแหน่ง"  onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp9" value="tissue trauma บริเวณ marginal ginggiva หรือIDP trauma มากกว่า 2 ตำแหน่งขึ้นไป" onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td >{this.state.sp9}</td>
                                </tr>
                            </tbody>
                        </table>
                       
                        {this.props.conduct ? this.renderButton() :<h1>กรุณากรอก conduct ก่อนทำ</h1>}
                        
                        {this.state.validate && <div>
                            <h3>ยืนยันให้อาจารย์</h3>
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
                                <Button variant='danger' onClick={()=>this.setState({validate:false})}>ยกเลิก</Button>
                                </div>)}

                    </div>}
                        
                        <p>&nbsp;</p>
                    </Card>

                    <Card>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    OHI!
                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <table border="1">
                                            <tbody>
                                                <tr>
                                                    <td>OHI</td>
                                                    <td>A</td>
                                                    <td>B</td>
                                                    <td>C</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr>

                                                    <td>การประเมินปัญหาอนามัยช่องปากผู้ป่วย</td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>

                                                </tr>
                                                <tr>

                                                    <td>ตรวจและบันทึกค่า Gingival Index</td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>ตรวจและบันทึกค่า Plaque Index</td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>การเลือกอุปกรณ์ทำความสะอาด</td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>การให้อนามัยช่องปาก</td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>

                                                </tr>

                                            </tbody>
                                        </table>



                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Card>


                    <Card>
                    </Card>



                </div>




            </div>
        )
    }
}


Scnrp.defaultProps = {
    account : [],

}

const mapStatetoProps = (state) =>{
    
    return{
        account : state.mainReducers.getPersonInfo.item,

    }
}

const mapDispatchtoProp = (dispatch) => {
    return{
        fetchAccount : () => dispatch(fetchItem()),

    }
}

export default connect(mapStatetoProps,mapDispatchtoProp)(Scnrp)