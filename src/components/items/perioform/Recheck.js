import React, { Component } from 'react'
import {Button, Card, Accordion, InputGroup, FormControl ,Spinner } from 'react-bootstrap'
import '../../styles/perio.css'
import {fetchItem} from '../../../redux/actions/ac-main'
import {connect} from 'react-redux'
import {RecheckForm} from '../../../redux/actions/ac.perio'

import {fetchCode} from '../../../redux/actions/fetchCodeFunction'


let data = new Array(8)
export class Recheck extends Component {

    constructor() {
        super()
        this.state = {
            a1: ''
        }
        this.state = {
            a2: ''
        }
        this.state = {
            a3: ''
        }
        this.state = {
            a4: ''
        }
        this.state = {
            a5: ''
        }
        this.state = {
            a6: ''
        }
        this.state = {
            a7: ''
        }
        this.state = {
            a8: ''
        }
        this.state = {
            a9: ''
        }
        this.state = {
            a10: ''
        }
        this.state = {
            date:'',sel1:'Mild',sel2:'Gingivitis',attempt:'',status:false
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

checkdatainConst(){
    let finished = true
    for (let index = 0; index < data.length; index++) {
       if(!data[index]){
           finished = false
       }       
    }
      return finished
  }

  handleOnSend=(finished)=>{
    
    let payload 
            if(finished){
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),
                "finish":true,"date" : this.state.date,"HN":sessionStorage.getItem('HN'),"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                for (let i = 1; i < data.length+1; i++) {
                    let name = 'a'+i
                    document.getElementsByName([name])[0].disabled = true
                    document.getElementsByName([name])[1].disabled = true
                    document.getElementsByName([name])[2].disabled = true
                   }
                   document.getElementById('rccel0').disabled = true
                   document.getElementById('rccel1').disabled = true
                   document.getElementById('rccel2').disabled = true
            }else{
                payload = {"answer" : data , "sel1":this.state.sel1 ,"sel2":this.state.sel2 ,"attempt" : Number(this.state.attempt),
                "date":this.state.date,"finish":false,"HN":sessionStorage.getItem('HN'),"doc_id":sessionStorage.getItem('student_id'),
                "interval":this.props.interval,"kn":this.props.kn}
                setTimeout(() => {
                    alert('บันทึกเสร็จสิ้น')
                }, 600); 
            }
        
        RecheckForm(payload)

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

    highlight = (e) => {
        let id = e;
        if(id===1){
            setTimeout(() => {
            document.getElementById("1").style.borderColor="red"
          }, 1000 );
        } 
    } 
    render() {
        return (
            <div>
                <div className="c2">
                    <Card style={{ width: '100%' }} className="text-center">
                        <Card.Header ><h4>แบบฟอร์มประเมิน Recheck</h4></Card.Header>
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
                                <td>Recheck</td>
                                <td>
                                <input type='number' id='rccel0' onChange={(e)=>this.setState({attempt : e.target.value})}></input>
                                </td>
                                <td >
                                        <select class="form-control" id="rccel1" name="sellist1" value={this.state.sel1} onChange={(e) => this.setState({sel1:e.target.value})}>
                                            <option value='Mild'>Mild</option>
                                            <option value='Moderate'>Moderate</option>
                                            <option value='Severe'>Severe</option>
                                        </select>
                                    </td>

                                    <td ><select class="form-control" id="rccel2" name="sellist2" value={this.state.sel2} onChange={(e) => this.setState({sel2:e.target.value})}>
                                        <option value='Gingivitis'>Gingivitis</option>
                                        <option value='Periodontitis'>Periodontitis</option>
                                    </select></td>
                                <td>
                                    <InputGroup size="sm">
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
                                    <td><input type="radio" name="a1" value="ได้ความสำคัญครบถ้วน เป็นลำดับ"  onClick={(e) => this.setState({ a1: e.target.value })}/></td>
                                    <td><input type="radio" name="a1" value="ได้ความสำคัญครบถ้วน" id="a002" onClick={(e) => this.setState({ a1: e.target.value })} /></td>
                                    <td><input type="radio" name="a1" value="ไม่ได้ความสำคัญ ครบถ้วน" id="a003" onClick={(e) => this.setState({ a1: e.target.value })} /></td>
                                    <td>{this.state.a1}</td>
                                </tr>
                                <tr onChange={(e) => data[1] = e.target.value}>
                                    <td>การจัดเรียงเครื่องมือและยูนิต</td>
                                    <td><input type="radio" name="a2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ a2: e.target.value })} /></td>
                                    <td><input type="radio" name="a2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ a2: e.target.value })} /></td>
                                    <td><input type="radio" name="a2" value="เตรียมเเต่ไม่ครบถ้วน ไม่พร้อมใช้งาน" onClick={(e) => this.setState({ a2: e.target.value })} /></td>
                                    <td>{this.state.a2}</td>
                                </tr>
                                <tr>
                                    <td  >2. Charting (If nessesary)</td>
                                    <td colSpan="4"></td>
                                </tr>
                                <tr onChange={(e) => data[2] = e.target.value}>
                                    <td>ตรวจและบันทึกค่าระดับเหงือก</td>
                                    <td><input type="radio" name="a3" value="ถูกต้องดีมาก/อาจมีผิดบ้างเล็กน้อย" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td><input type="radio" name="a3" value="มีผิดพลาด ไม่กิน 30%" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td><input type="radio" name="a3" value="ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a3: e.target.value })} /></td>
                                    <td>{this.state.a3}</td>
                                </tr>
                                <tr onChange={(e) => data[3] = e.target.value}>
                                    <td>ตรวจและบันทึก MGJ</td>
                                    <td><input type="radio" name="a4" value="ถูกต้องดีมาก/อาจมีผิดบ้างเล็กน้อย" onClick={(e) => this.setState({ a4: e.target.value })} /></td>
                                    <td><input type="radio" name="a4" value="มีผิดพลาด ไม่กิน 30%" onClick={(e) => this.setState({ a4: e.target.value })} /></td>
                                    <td><input type="radio" name="a4" value="ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a4: e.target.value })} /></td>
                                    <td>{this.state.a4}</td>
                                </tr>
                                <tr onChange={(e) => data[4] = e.target.value}>
                                    <td>ตรวจและบันทึกค่าร่องลึกปริทันต์</td>
                                    <td><input type="radio" name="a5" value="ถูกต้องดีมาก/อาจมีผิดบ้างเล็กน้อย" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td><input type="radio" name="a5" value="มีผิดพลาด ไม่กิน 30%" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td><input type="radio" name="a5" value="ผิดพลาดเกิน 30%" onClick={(e) => this.setState({ a5: e.target.value })} /></td>
                                    <td>{this.state.a5}</td>
                                </tr>
                                <tr>
                                    <td>3. Management</td>
                                    
                                    <td colSpan="4"> </td>
                                </tr>
                                <tr onChange={(e) => data[5] = e.target.value}>
                                    <td>ระบุปัญหาสาเหตุผู้ป่วย</td>
                                    <td><input type="radio" name="a6" value="ถูกต้อง ครบถ้วน เหมาะสม" onClick={(e) => this.setState({ a6: e.target.value })}  /></td>
                                    <td><input type="radio" name="a6" value="ถูกต้องเเต่ไม่ครบถ้่วน เหมาะสม" onClick={(e) => this.setState({ a6: e.target.value })} /></td>
                                    <td><input type="radio" name="a6" value="ไม่ถูกต้องหมาะสม มีข้อผิดพลาดมาก" onClick={(e) => this.setState({ a6: e.target.value })} /></td>
                                    <td>{this.state.a6}</td>
                                </tr>
                                <tr onChange={(e) => data[6] = e.target.value}>
                                    <td>การวางแผนการรักษา</td>
                                    <td><input type="radio" name="a7" value="ถูกต้อง ครบถ้วน มีลำดับเหมาะสมสอดคล้องกับบริบทของผู้ป่วย" onClick={(e) => this.setState({ a7: e.target.value })} /></td>
                                    <td><input type="radio" name="a7" value ="ผิดพลาดเล็กน้อย หรือ ลำดับไม่เหมาะสมเเต่ยังสอดคล้องกับบริบทของผู้ป่วย" onClick={(e) => this.setState({ a7: e.target.value })}/></td>
                                    <td><input type="radio" name="a7" value= "ผิดพลาด เเละ ลำดับไม่เหามะสม เเละ/หรือไม่คำนึงถึงบริบท/ข้อจำกัดของผู้ป่วย" onClick={(e) => this.setState({ a7: e.target.value })} /></td>
                                    <td>{this.state.a7}</td>
                                </tr>
                                <tr onChange={(e) => data[7] = e.target.value}>
                                    <td >Prophylaxis</td>
                                    <td><input type="radio" name="a8" value="สะอาดเเละเรียบดีมากทุกด้าน" onClick={(e) => this.setState({ a8: e.target.value })} /></td>
                                    <td><input type="radio" name="a8" value="สะอาดเเละเรียบดี มีข้อผิดพลาดบ้าง ไม่เกิน 2 ตำเเหน่ง" onClick={(e) => this.setState({ a8: e.target.value })}  /></td>
                                    <td ><input type="radio" name="a8" value="ไม่สะอาดเเละไม่เรียบ มีข้อผิดพลาดมากเกิน 2 ตำเเหน่ง" onClick={(e) => this.setState({ a8: e.target.value })}  /></td>
                                    <td>{this.state.a8}</td>
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
                                                    <td><input type="radio" name="ohi1" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike"  /></td>
                                                    
                                                </tr>
                                                <tr>

                                                    <td>ตรวจและบันทึกค่า Gingival Index</td>
                                                    <td><input type="radio" name="ohi2" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike"  /></td>
                                                     
                                                </tr>
                                                <tr>
                                                    <td>ตรวจและบันทึกค่า Plaque Index</td>
                                                    <td><input type="radio" name="ohi3" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike"  /></td>
                                                  
                                                </tr>
                                                <tr>
                                                    <td>การเลือกอุปกรณ์ทำความสะอาด</td>
                                                    <td><input type="radio" name="ohi4" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike"  /></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>การให้อนามัยช่องปาก</td>
                                                    <td><input type="radio" name="ohi5" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike"  /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike"  /></td>
                                                     
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div>
                                            <br></br>
                                        <Button 
                                        variant="secondary"
                                        size="lg"
                                        block
                                        onClick={()=>{
                                        let condit = window.confirm('ส่งย่าง')
                                        if(condit){
                                            for (let index = 1; index < 6; index++) {
                                                let name = 'ohi'+index
                                                document.getElementsByName([name])[0].disabled = true
                                                document.getElementsByName([name])[1].disabled = true
                                                document.getElementsByName([name])[2].disabled = true
                                            }
                                        }
                                        
                                        
                                    }}>ส่ง</Button>
                                    </div>
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

Recheck.defaultProps = {
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

export default connect(mapStatetoProps,mapDispatchtoProp)(Recheck)
