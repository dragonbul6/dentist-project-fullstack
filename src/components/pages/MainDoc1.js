import React from 'react'
import { Form, Button,Badge } from 'react-bootstrap'
import Dropdown from '../items/search'

import Sec1 from '../items/doc1_component/Docsec1'
import Sec2 from '../items/doc1_component/Docsec2'
import Sec3 from '../items/doc1_component/Docsec3'
import Sec4 from '../items/doc1_component/Docsec4'
import Sec5 from '../items/doc1_component/Docsec5'
import ConductPreview from '../items/doc1_component/Doc1Preview'


import '../styles/Ommain.css'


class Doc1 extends React.Component {
    constructor() {
        super()
        this.state = { value: null,preview:false,itemPreview:[],err:'',time:"" ,
        aday:"",timeStatus:false}
        this.state = { zero1:5,plus1:0,minus1:0, sec1data: [2,2,2,2,2] }
        this.state = { zero2:3,plus2:0,minus2:0, sec2data: [2,2,2] }
        this.state = {  zero3:2,plus3:0,minus3:0, sec3data: [2,2] }
        this.state = { zero4:6,plus4:0,minus4:0, sec4data: [2,2,2,2,2,2] }
        this.state = {zero5 : 4 ,plus5:0,minus5:0, sec5data:[2,2,2,2]}

        this.state = {date : ''}

    }
    componentDidMount(){
        var today = new Date()            
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time
            let interval = ''
            if(today.getHours() < 11 && today.getMinutes() < 59){
                
                interval = 'ช่วงเช้า'
            }else{
                interval = 'ช่วงบ่าย'
            }
            this.setState({date:dateTime,aday:interval,time:interval}) 
    }


    sendForm(e) {
        e.preventDefault()
        if(this.state.value){
            let { sec1data, sec2data, sec3data, sec4data , sec5data } = this.state
            var arr = { "sec1": sec1data, "sec2": sec2data, "sec3": sec3data, "sec4": sec4data ,"sec5" : sec5data}
            let payload = {
                answer : arr,
                TN : this.state.value,
                HN :sessionStorage.getItem('HN'),
                doc_id : sessionStorage.getItem('student_id'),
                date : this.state.date,
                interval : this.state.time 
            }
            document.getElementById('btnSave').disabled = true
            this.setState({err:'กรอกฟอร์มเสร็จสิ้น'})
            this.props.data(payload)
            this.props.status(true) 
        }else{
            this.setState({err : 'กรุณาเลือกอาจารย์ด้วยครับ'})
        }
        
    }

    setValue(value) {
        this.setState({ value: value })
        sessionStorage.setItem('TN',value)
    }

    statussec1(answer, status) {
        this.setState({sec1data : answer,zero1:status[0],plus1:status[1],minus1:status[2]})
    }
    setData1 = (index,value,plus,zero) => {
        
            let item = this.state.sec1data
            item[index] = value
        if(value == 1){
            this.setState({sec1data:item,plus1:plus,zero1:zero})
        }else if(value == 3){
            this.setState({sec1data:item,minus1:plus,zero1:zero})
        }
        
        
        
    }
    statussec2(answer,status) {
        this.setState({sec2data : answer,zero2:status[0],plus2:status[1],minus2:status[2]})
    }
    setData2 = (index,value,plus,zero) => {
        
            let item = this.state.sec1data
            item[index] = value
        if(value == 1){
            this.setState({sec2data:item,plus2:plus,zero2:zero})
        }else if(value == 3){
            this.setState({sec2data:item,minus2:plus,zero2:zero})
        }
        
        
    }

    statussec3(answer,status) {
         this.setState({sec3data : answer,zero3:status[0],plus3:status[1],minus3:status[2]})
    }
    setData3 = (index,value,plus,zero) => {
        
            let item = this.state.sec3data
            item[index] = value
        if(value == 1){
            this.setState({sec3data:item,plus3:plus,zero3:zero})
        }else if(value == 3){
            this.setState({sec3data:item,minus3:plus,zero3:zero})
        }
        
        
    }
    statussec4(answer,status) {
        this.setState({sec4data : answer,zero4:status[0],plus4:status[1],minus4:status[2]})
    }
    setData4 = (index,value,plus,zero) => {
        
            let item = this.state.sec4data
            item[index] = value
        if(value == 1){
            this.setState({sec4data:item,plus4:plus,zero4:zero})
        }else if(value == 3){
            this.setState({sec4data:item,minus4:plus,zero4:zero})
        }
        
        
    }
    statussec5(answer,status) {
        this.setState({sec5data : answer,zero5:status[0],plus5:status[1],minus5:status[2]})
    }
    setData5 = (index,value,plus,zero) => {
        
            let item = this.state.sec5data
            item[index] = value
        if(value == 1){
            this.setState({sec5data:item,plus5:plus,zero5:zero})
        }else if(value == 3){
            this.setState({sec5data:item,minus5:plus,zero5:zero})
        }
        
        
    }


    render() {

        return (
                <div className="card" style={{width:'80%',fontSize:"15px"}}>
                    <div className="topic" style={{marginBottom:10}}>แบบประเมิน Conduct</div>
                    <h4 className="font">เลือกผู้สอน</h4>
                    <div><Dropdown data = {this.setValue.bind(this)} /></div>
                    <h4 className="font">วันที่ตรวจ</h4>
                    <div><p>{this.state.time} | {this.state.date}</p></div>
                    <div><label>ทั้งวัน</label> <input type='checkbox' value="ทั้งวัน" onClick={(e) => this.state.time == this.state.aday ? this.setState({time : e.target.value}) : this.setState({time : this.state.aday})}></input></div>
                    <h4 className="font">ชื่อผู้ป่วย</h4>
                    <div><h5>{sessionStorage.getItem('PN')}</h5></div>
                    <hr></hr>
                    <div className="forcard" >
                    <Form>
                        <div className="subtopic">
                        <Form.Label>Attitudes,Value,Behavior <Badge variant='danger'>0 : ({this.state.zero1})</Badge> <Badge variant='danger'>+ : ({this.state.plus1})</Badge> <Badge variant='danger'>- : ({this.state.minus1})</Badge></Form.Label>
                        <Sec1  defualtData={this.statussec1.bind(this)} data={this.setData1} />
                        </div>
                        <hr />
                        <div className="subtopic2">
                        <Form.Label>Consistenly place patient's <Badge variant='danger'>0 : ({this.state.zero2})</Badge> <Badge variant='danger'>+ : ({this.state.plus2})</Badge> <Badge variant='danger'>- : ({this.state.minus2})</Badge></Form.Label>
                        <Sec2 defualtData={this.statussec2.bind(this)} data={this.setData2} />
                        </div>
                        <hr></hr>
                        <div className="subtopic">
                        <Form.Label>Patient safety <Badge variant='danger'>0 : ({this.state.zero3})</Badge> <Badge variant='danger'>+ : ({this.state.plus3})</Badge> <Badge variant='danger'>- : ({this.state.minus3})</Badge></Form.Label>
                        <Sec3  defualtData={this.statussec3.bind(this)} data={this.setData3} />
                        </div>
                        <hr></hr>
                        <div className="subtopic2">
                        <Form.Label>Conduct สิทธิผู้ป่วย <Badge variant='danger'>0 : ({this.state.zero4})</Badge> <Badge variant='danger'>+ : ({this.state.plus4})</Badge> <Badge variant='danger'>- : ({this.state.minus4})</Badge></Form.Label>
                        <Sec4  defualtData={this.statussec4.bind(this)} data={this.setData4} />
                        </div>
                        <hr></hr>
                        <div className="subtopic2">
                        <Form.Label>Conduct<Badge variant='danger'>0 : ({this.state.zero5})</Badge> <Badge variant='danger'>+ : ({this.state.plus5})</Badge> <Badge variant='danger'>- : ({this.state.minus5})</Badge></Form.Label>
                        <Sec5  defualtData={this.statussec5.bind(this)} data={this.setData5} />
                        </div>
                        <hr></hr>
                        <h3 style={{color : 'red'}}>{this.state.err}</h3>
                        <Button id='btnSave' variant="primary" type="submit" onClick={(e) => this.sendForm(e)}>เสร็จสิ้น</Button>
                    </Form>
                    </div>
           </div> 
           
        
        )
        }
 
        }




export default Doc1
