import React, { Component } from 'react'
import { Card } from 'react-bootstrap'


import '../../styles/om.css'

const itemsec1 = { answer: new Array(7) }
export class om01 extends Component {

    constructor() {
        super()
        this.state = { date: '', totalscore_sec1: 0 }
        this.state = { _0: '', _1: '', _2: '', _3: '', _4: '', _5: '', _6: '' }


    }

    componentDidMount() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        this.setState({ date: date + '/' + month + '/' + year })
    }
    


    checkLengthsec1 = (index) => {
        let id = index
        if(index == '0'){
            id = '000'
        }
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
        this.handleChangeSec1(payload)
    }

    handleChangeSec1(payload) {
        let id = payload.id.id
        if (payload.id.id > 100) {
            id = payload.id.id / 111
        }
        if(payload.id.id == '000'){
            id = '0'
        }

        this.setState({ ['_' + id]: payload.value.result })
        var result = payload.value
        if (result === "") {
            this.setAnswerSec1('0', id)
        } else {

            this.setAnswerSec1(Number(result), id)
        }
    }
    setAnswerSec1(number, i) {
        var index = Number(i)
        var value = Number(number)
        var arr = itemsec1.answer
        arr[index] = value
        itemsec1.answer = arr
        this.showscoreSec1(itemsec1.answer)
        this.handleStatusSec1()

    }

    showscoreSec1(arr) {
        var x = arr.reduce((total, num) => total + num)
        this.state.totalscore_sec1 = x
        return x
    }
    handleStatusSec1() {
        var count = 0
        for (let i = 0; i < 7; i++) {
            if (itemsec1.answer[i] !== undefined) {
                if (itemsec1.answer[i] === 0) {
                    count--
                }
                count++
            }

            if (count == 7) {
                this.props.data(itemsec1.answer)
            }
        }
    }

    render() {
        return (
            <div>
                <div className="c2">
                    {console.log(itemsec1)}
                    <Card style={{ width: '100%' }} className="text-center">
                        <Card.Header ><h4>แบบฟอร์มประเมินการปฏิบัติงานคลินิกโรคเยื่อเมือกช่องปาก</h4></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {' '}
                                    อาจารย์ {sessionStorage.getItem('TN')}{' '}
                                </p>
                                <footer className="blockquote-footer">
                                    {this.state.date}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
                <div className="c1">
                    <Card >
                        <Card.Header className="text-center">การตรวจ</Card.Header>
                        <Card.Body >

                            <table>
                                <thead>
                                    <tr >
                                        <th className="text-center" colspan="2">รายการ</th>
                                        <th className="text-center" >คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td rowspan="3">&nbsp;การซักประวัติ(35)</td>
                                        <td >
                                            <p>อาการสำคัญ(10)</p>
                                        </td>
                                        <td colspan="1"><input class="input2" value={this.state._0} type="number" id="000" max="10" onChange={this.checkLengthsec1.bind(this,'0')}></input></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>อาการเจ็บป่วยปัจจุบัน(15)</p>
                                        </td>
                                        <td colspan="1"><input class="input2" value={this.state._1} type="number" id="111" max="15" onChange={this.checkLengthsec1.bind(this, '111')}></input></td>
                                    </tr>
                                    <tr class="border_bottom">
                                        <td >
                                            <p>ประวัติทางการแพทย์(10)</p>
                                        </td>
                                        <td colspan="1"><input class="input2" value={this.state._2} type="number" id="222" max="10" onChange={this.checkLengthsec1.bind(this, '222')}></input></td>

                                    </tr>
                                    <tr >
                                        <td rowspan="2">การตรวจ(50)&nbsp;&nbsp;</td>
                                        <td>&nbsp;วิธีการตรวจ(35)</td>
                                        <td  ><input class="input2" value={this.state._3} type="number" id="3" max="35" onChange={this.checkLengthsec1.bind(this, '3')}></input></td>
                                    </tr>
                                    <tr class="border_bottom">
                                        <td >บันทึกข้อมูล(15)</td>
                                        <td  ><input class="input2" value={this.state._4} type="number" id="4" max="15" onChange={this.checkLengthsec1.bind(this, '4')}></input></td>
                                    </tr>
                                    <tr >
                                        <td rowspan="2">การตรวจเพิ่มเติม(15)</td>
                                        <td >การเลือกส่งตรวจเพิ่มเติม(5)</td>
                                        <td ><input class="input2" value={this.state._5} type="number" id="5" max="5" onChange={this.checkLengthsec1.bind(this, '5')}></input></td>
                                    </tr>
                                    <tr >
                                        <td>การแปลผลของการตรวจเพิ่มเติม(10)</td>
                                        <td><input class="input2" value={this.state._6} type="number" id="6" max="10" onChange={this.checkLengthsec1.bind(this, '6')}></input></td>
                                    </tr>

                                </tbody>
                            </table>
                        </Card.Body>
                        <Card.Footer className="text-muted" className="text-center">รวม : {this.state.totalscore_sec1}</Card.Footer>
                    </Card>
                </div>

            </div>
        )
    }
}

export default om01
