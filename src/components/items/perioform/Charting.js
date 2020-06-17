import React, { Component } from 'react'
import { Button, Card, Accordion,  InputGroup, FormControl,Spinner } from 'react-bootstrap'
import '../../styles/perio.css'
import {fetchItem} from '../../../redux/actions/ac-main'
import {connect} from 'react-redux'
import {ChartingForm} from '../../../redux/actions/ac.perio'

import {fetchCode} from '../../../redux/actions/fetchCodeFunction'


const data = new Array(11)
export class Charting extends Component {
    constructor() {
        super()
        this.state = {
            a0: '', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '',
            a8: '', a9: '', a10: '', a11: '', a12: '', a13: '', a14: '',date:'',sel1:'Mild',sel2:'Gingivitis',attempt:'',status:false
        }
    }
    async componentDidMount() {
        var today = new Date()        
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time
        this.setState({date:dateTime})  
        await this.props.fetchAccount()  
        if(sessionStorage.getItem('getDX')){
           console.log(true)
            let dx = sessionStorage.getItem('getDX').split(" ")
            this.setState({sel1:dx[0],sel2:dx[1]})
        }
        this.setState({status : true})
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
        var today = new Date()            
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time
        
        let payload 
            if(finished){
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),
                "finish":true,"date" : dateTime,"HN":sessionStorage.getItem('HN'),"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                for (let i = 1; i < data.length+1; i++) {
                    let name = 'ct'+i
                    document.getElementsByName([name])[0].disabled = true
                    document.getElementsByName([name])[1].disabled = true
                    document.getElementsByName([name])[2].disabled = true
                   }
                   document.getElementById('chartsel0').disabled = true
                   document.getElementById('chartsel1').disabled = true
                   document.getElementById('chartsel2').disabled = true
            }else{
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),
                "date":dateTime,"finish":false,"HN":sessionStorage.getItem('HN'),"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                setTimeout(() => {
                    alert('บันทึกเสร็จสิ้น')
                }, 600); 
            }
            
            ChartingForm(payload)

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
             return <Button onClick={this.handleOnSend.bind(this,false)} variant='outline-warning'>บันทึกไว้ทำต่อ</Button>
         }     
     }


    render() {

        return (
            <div>

                <div className="c2">
                    <Card style={{ width: '100%' }} className="text-center">
                        <Card.Header ><h4>แบบฟอร์มประเมิน Charting</h4></Card.Header>
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

                    <Card>
                        <table border="1">
                            <thead className="th"><tr>
                                <td >Charting</td>
                                <td>
                                    <input  id='chartsel0' onChange={(e)=>this.setState({attempt : e.target.value})} type='number'></input>
                                </td>
                                <td >
                                        <select class="form-control" id="chartsel1" name="sellist1" value={this.state.sel1} onChange={(e) => this.setState({sel1:e.target.value})}>
                                            <option value='Mild'>Mild</option>
                                            <option value='Moderate'>Moderate</option>
                                            <option value='Severe'>Severe</option>
                                        </select>
                                    </td>

                                    <td ><select class="form-control" id="chartsel2" name="sellist2" value={this.state.sel2} onChange={(e) => this.setState({sel2:e.target.value})}>
                                        <option value='Gingivitis'>Gingivitis</option>
                                        <option value='Periodontitis'>Periodontitis</option>
                                    </select></td>
                                <td>
                                    <InputGroup >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>other</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl />
                                    </InputGroup>
                                </td>
                            </tr></thead>
                            <tbody>
                                <tr>
                                    <td>1. Begining Check</td>
                                    <td id="a001">A</td>
                                    <td id="a002">B</td>
                                    <td id="a003">C</td>
                                    <td></td>
                                </tr>
                                <tr onChange={(e) => data[0] = e.target.value}>
                                    <td>รายงานเคสผู้ป่วย</td>
                                    <td><input type="radio" name="ct1" value="(10) ให้ความสำคัญครบถ้วนเป็นลำดับ " onClick={(e) => this.setState({ a1: e.target.value })} /></td>
                                    <td><input type="radio" name="ct1" value="(6) ได้ความสำคัญแต่ไม่ครบถ้วน" onClick={(e) => this.setState({ a1:e.target.value  })} /></td>
                                    <td><input type="radio" name="ct1" value="(2) ไม่ได้ความสำคัญ ไม่ครบถ้วน" onClick={(e) => this.setState({ a1: e.target.value })} /></td>
                                    <td>{this.state.a1}</td>
                                </tr>
                                <tr onChange={(e) => data[1] = e.target.value}>
                                    <td>การจัดเรียงเครื่องมือและยูนิต</td>
                                    <td><input type="radio" name="ct2" value="(5) ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ a2:e.target.value  })} /></td>
                                    <td><input type="radio" name="ct2" value="(3) ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ a2: e.target.value })} /></td>
                                    <td><input type="radio" name="ct2" value="(1) เตรียมแต่ไม่ครบถ้วน ไม่พร้อมใช้งาน" onClick={(e) => this.setState({ a2: e.target.value })} /></td>
                                    <td>{this.state.a2}</td>
                                </tr>
                                <tr>
                                    <td>2. Charting </td>
                                    <td>A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td></td>
                                </tr>
                                <tr onChange={(e) => data[2] = e.target.value}>
                                    <td>ตรวจและบันทึกระดับเหงือก</td>
                                    <td><input type="radio" name="ct3" value="(5) ถูกต้องดีมาก/อาจมีผิดพลาดเล็กน้อย" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td><input type="radio" name="ct3" value="(3) มีผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td><input type="radio" name="ct3" value="(1) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td>{this.state.a3}</td>
                                </tr>
                                <tr onChange={(e) => data[3] = e.target.value}>
                                    <td>ตรวจและบันทึก MGJ</td>
                                    <td><input type="radio" name="ct4" value="(5) ถูกต้องดีมาก/อาจมีผิดพลาดเล็กน้อย" onClick={(e) => this.setState({ a4: e.target.value })} /></td>
                                    <td><input type="radio" name="ct4" value="(3) มีผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a4: e.target.value})} /></td>
                                    <td><input type="radio" name="ct4" value="(1) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a4: e.target.value })} /></td>
                                    <td>{this.state.a4}</td>
                                </tr>
                                <tr onChange={(e) => data[4] = e.target.value}>
                                    <td>ตรวจและบันทึกค่าร่องลึกปริทันต์</td>
                                    <td><input type="radio" name="ct5" value="(5) ถูกต้องดีมาก/อาจมีผิดพลาดเล็กน้อย" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td><input type="radio" name="ct5" value="(3) มีผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td><input type="radio" name="ct5" value="(1) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td>{this.state.a5}</td>
                                </tr>
                                <tr onChange={(e) => data[5] = e.target.value}>
                                    <td>ตรวจและบันทึกค่า Gringival Index</td>
                                    <td><input type="radio" name="ct6" value="(5) ถูกต้องดีมาก/อาจมีผิดพลาดเล็กน้อย" onClick={(e) => this.setState({ a6: e.target.value })} /></td>
                                    <td><input type="radio" name="ct6" value="(3) มีผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a6: e.target.value })} /></td>
                                    <td><input type="radio" name="ct6" value="(1) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a6: e.target.value })} /></td>
                                    <td>{this.state.a6}</td>
                                </tr>
                                <tr onChange={(e) => data[6] = e.target.value}>
                                    <td>ตรวจและบันทึกค่า Plaque Index</td>
                                    <td><input type="radio" name="ct7" value="(5) ถูกต้องดีมาก/อาจมีผิดพลาดเล็กน้อย" onClick={(e) => this.setState({ a7:e.target.value })} /></td>
                                    <td><input type="radio" name="ct7" value="(3) มีผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a7: e.target.value })} /></td>
                                    <td><input type="radio" name="ct7" value="(1) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a7: e.target.value })} /></td>
                                    <td>{this.state.a7}</td>
                                </tr>
                                <tr>
                                    <td>3. Diagnosis</td>
                                    <td>A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td></td>
                                </tr>
                                <tr onChange={(e) => data[7] = e.target.value}>
                                    <td>ระบุปัญหาสาเหตุผู้ป่วย(H/A/E)</td>
                                    <td><input type="radio" name="ct8" value="(10) ถูกต้อง ครบถ้วน เหมาะสม" onClick={(e) => this.setState({ a8: e.target.value })} /></td>
                                    <td><input type="radio" name="ct8" value="(6) ถูกต้องแต่ไม่ครบถ้วน เหมาะสม" onClick={(e) => this.setState({ a8: e.target.value })} /></td>
                                    <td><input type="radio" name="ct8" value="(2) ไม่ถูกต้องเหมาะสม มีข้อผิดพลาดมาก" onClick={(e) => this.setState({ a8: e.target.value })} /></td>
                                    <td>{this.state.a8}</td>
                                </tr>
                                <tr onChange={(e) => data[8] = e.target.value}>
                                    <td>การให้คำวินิจฉัย</td>
                                    <td><input type="radio" name="ct9" value="(10) ถูกต้อง" onClick={(e) => this.setState({ a9: e.target.value })} /></td>
                                    <td><input type="radio" name="ct9" value="(6) ผิดพลาด แต่สามารถแก้ไขได้เมื่อชี้แนะ" onClick={(e) => this.setState({ a9: e.target.value })} /></td>
                                    <td><input type="radio" name="ct9" value="(2) ผิดพลาด และไม่สามารถแก้ไขได้" onClick={(e) => this.setState({ a9: e.target.value })} /></td>
                                    <td>{this.state.a9}</td>
                                </tr>
                                <tr onChange={(e) => data[9] = e.target.value}>
                                    <td >การให้พยากรณ์โรค</td>
                                    <td><input type="radio" name="ct10" value="(10) ถูกต้องครบถ้วน" onClick={(e) => this.setState({ a10: e.target.value })} /></td>
                                    <td><input type="radio" name="ct10" value="(6) ผิดพลาดบ้างไม่เกิน 30%" onClick={(e) => this.setState({ a10: e.target.value })} /></td>
                                    <td ><input type="radio" name="ct10" value="(2) ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a10: e.target.value })} /></td>
                                    <td>{this.state.a10}</td>
                                </tr>
                                <tr onChange={(e) => data[10] = e.target.value}>
                                    <td >การวางแผนการรักษา</td>
                                    <td><input type="radio" name="ct11" value="(15) ถูกต้อง ครบถ้วน มีลำดับเหมาะสมสอดคล้องกับบริบทของผู้ป่วย" onClick={(e) => this.setState({ a11: e.target.value })} /></td>
                                    <td><input type="radio" name="ct11" value="(10) ผิดพลาดเล็กน้อย หรือ ลำดับไม่เหมาะสมแต่ยังสอดคล้องกับบริบทของผู้ป่วย" onClick={(e) => this.setState({ a11: e.target.value })} /></td>
                                    <td ><input type="radio" name="ct11" value="(5) ผิดพลาดและลำดับไม่เหมาะสม และ/หรือไม่คำนึงถึงบริบท/ข้อจำกัดของผู้ป่วย" onClick={(e) => this.setState({ a11: e.target.value })} /></td>
                                    <td>{this.state.a11}</td>
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

                                                    <td>การเลือกอุปกรณ์ทำความสะอาดและเทคนิค</td>
                                                    <td><input type="radio" name="oh0" value="Bike" onClick={() => this.setState({ a13: '(5) ถูกต้องเหมาะสมกับผู้ป่วย/ตำแหน่ง' })} /></td>
                                                    <td><input type="radio" name="oh0" value="Bike" onClick={() => this.setState({ a13: '(3) ถูกต้องเหมาะสมแต่มีข้อผิดพลาดบ้าง' })} /></td>
                                                    <td><input type="radio" name="oh0" value="Bike" onClick={() => this.setState({ a13: '(2) ไม่ถูกต้องเหมาะสม มีข้อผิดพลาดมาก' })} /></td>
                                                    <td>{this.state.a13}</td>
                                                </tr>
                                                <tr>

                                                    <td>การให้อนามัยช่องปาก</td>
                                                    <td><input type="radio" name="oh1" value="Bike" onClick={() => this.setState({ a14: '(10) สอนดี และ ผู้ป่วยทำได้ถูกต้อง' })} /></td>
                                                    <td><input type="radio" name="oh1" value="Bike" onClick={() => this.setState({ a14: '(6) สอนได้ดีแต่ยังมีข้อผิดพลาดบ้าง' })} /></td>
                                                    <td><input type="radio" name="oh1" value="Bike" onClick={() => this.setState({ a14: '(2) สอนไม่ดีผู้ป่วยทำตามได้ยาก ' })} /></td>
                                                    <td>{this.state.a14}</td>
                                                </tr>


                                            </tbody>
                                        </table>

                                        <Button onClick={()=>{
                                        let condit = window.confirm('ส่งย่าง')
                                        if(condit){
                                            for (let index = 1; index < 3; index++) {
                                                let name = 'oh'+index
                                                document.getElementsByName([name])[0].disabled = true
                                                document.getElementsByName([name])[1].disabled = true
                                                document.getElementsByName([name])[2].disabled = true
                                            }
                                        }
                                        
                                        
                                    }}>ส่ง</Button>

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

Charting.defaultProps = {
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
export default connect(mapStatetoProps,mapDispatchtoProp)(Charting)
