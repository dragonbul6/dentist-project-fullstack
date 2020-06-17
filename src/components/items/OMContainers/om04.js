import React, { Component } from 'react'
import { Table, Button, Row, Col, Container, Card, Nav, Accordion, Form } from 'react-bootstrap'

import '../../styles/om.css'

const item = { answer: new Array(10) }
export class om02 extends Component {
   

    
    constructor(){
        super()
        this.state = {date:'',totalscore_sec4:0}
        this.state = {_14:'',_15:'',_16:'',_17:'',_18:'',_19:'',_20:'',_21:'',_22:'',_23:''}
        

    }

    componentDidMount(){
        var date = new Date(). getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.setState({date:date+'/'+month+'/'+year}) 
}

checkLength = (id) => {
    
    var item = document.getElementById([id])

    let max = Number(item.max)
    let value = Number(item.value)
    var result
    if (value > max) {
        result = item.max
    } else {
        result = item.value
    }
    item.value = result


    var payload = {
        id: item,
        value: result
    }
    this.handleChange(payload)

}

handleChange(payload) {
    this.setState({ ['_' +Number(payload.id.id)]: payload.value.result })
    var result = payload.value
    if (result === "") {
        this.setAnswer('0', Number(payload.id.id -14))
    } else {
        this.setAnswer(Number(result), Number(payload.id.id-14))
    }

}

setAnswer(number, i) {
    var index = Number(i)
    var value = Number(number)
    var arr = item.answer
    arr[index] = value
    item.answer = arr
    this.showscore(item.answer)
    this.handleStatus()

}

handleStatus() {
    var count = 0
    for (let i = 0; i < 10; i++) {
        if (item.answer[i] !== undefined) {
            if (item.answer[i] === 0) {
                count--
            }
            count++
        }
        if(count === 10){
        
            this.props.data(item.answer)
        }
       
    }
}

showscore(arr){
    var x = arr.reduce((total,num) => total + num)
    this.state.totalscore_sec4 = x
    return x
}

   
   
    render() {
        return (
            <div>
                <div className="c1">
                        <Card style={{ width: '100%' }} className="text-center" >
                            <Card.Header ><h4>การติดตามผลการรักษา</h4></Card.Header>
                        </Card>
                    </div>
                    
                    <div className="c1" >
                        <Card >
                            <Card.Header className="text-center">การวางแผนการรักษา</Card.Header>
                            <Card.Body >
                                <table>
                                    <thead>
                                        <tr>
                                        <th className="text-center" colspan="2">รายการ</th>
                                        <th className="text-center" >คะแนน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowspan="3">&nbsp;การซักประวัติ(15)</td>
                                            <td >
                                                <p>อาการสำคัญ(5)</p>
                                            </td>
                                            <td  colspan="1"><input class="input2" value={this.state._14} type="number" id="14" max="5" onChange={this.checkLength.bind(this, '14')}></input></td>
                                        </tr>
                                        <tr >
                                            <td >
                                                <p>อาการเจ็บป่วยปัจจุบัน(8)</p>
                                            </td>
                                            <td  colspan="1"><input class="input2" value={this.state._15} type="number" id="15" max="8" onChange={this.checkLength.bind(this, '15')}></input></td>
                                        </tr>
                                        <tr class="border_bottom">
                                            <td >
                                                <p>ประวัติทางการแพทย์(2)</p>
                                            </td>
                                            <td  colspan="1"><input class="input2" value={this.state._16} type="number" id="16" max="2" onChange={this.checkLength.bind(this, '16')}></input></td>
                                        </tr>
                                        <tr class="border_bottom">
                                            <td rowspan="1">การตรวจ(20)&nbsp;&nbsp;</td>
                                            <td >&nbsp;วิธีการตรวจ(20)</td>
                                            <td  ><input class="input2" value={this.state._17} type="number" id="17" max="20" onChange={this.checkLength.bind(this, '17')} ></input></td>
                                        </tr>
                                        <tr >
                                            <td rowspan="2">การตรวจเพิ่มเติม(10)</td>
                                            <td >การเลือกส่งตรวจเพิ่มเติม(5)</td>
                                            <td  ><input class="input2" value={this.state._18} type="number" id="18" max="5" onChange={this.checkLength.bind(this, '18')}></input></td>
                                        </tr>
                                        <tr class="border_bottom">
                                            <td >การแปลผลของการตรวจเพิ่มเติม(5)</td>
                                            <td  ><input class="input2" value={this.state._19} type="number" id="19" max="5" onChange={this.checkLength.bind(this, '19')} ></input></td>
                                        </tr>
                                        <tr class="border_bottom" >
                                            <td >&nbsp;การวินิจฉัยโรค(15)</td>
                                            <td >&nbsp;การวินิจฉัยโรค(15)</td>
                                            <td  >
                                                <input class="input2" value={this.state._20} type="number" id="20" max="15" onChange={this.checkLength.bind(this, '20')}></input>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td rowspan="2">การรักษา(30)</td>
                                            <td >แผนการรักษา(15)</td>
                                            <td ><input class="input2" value={this.state._21} type="number" id="21" max="15" onChange={this.checkLength.bind(this, '21')}></input></td>
                                        </tr>
                                        <tr class="border_bottom">
                                            <td >การติดตามผลการรักษา(15)</td>
                                            <td ><input class="input2" value={this.state._22} type="number" id="22" max="15" onChange={this.checkLength.bind(this, '22')}></input></td>
                                        </tr>
                                        <tr >
                                            <td colspan="2">การบันทึกข้อมูล</td>
                                            <td ><input class="input2" value={this.state._23} type="number" id="23" max="10" onChange={this.checkLength.bind(this, '23')}></input></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </Card.Body>
                            <Card.Footer className="text-muted" className="text-center">รวม : {this.state.totalscore_sec4}</Card.Footer>
                        </Card>
                    </div>
            </div>
        )
    }
}

export default om02
