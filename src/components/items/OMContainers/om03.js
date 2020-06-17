import React from 'react'
import {Card} from 'react-bootstrap'
const itemsec3 = {answer : new Array(3)}
export default class om03 extends React.Component{
    constructor(){
        super()
        this.state = {_11:'',_12:'',_13:''}
        this.state = {totalscore_sec3:0}
    }

    
checkLengthsec3 = (id) => {
    
    var item = document.getElementById([id])
    
    let max = Number(item.max) 
    let value = Number(item.value) 
    var result
    if(value > max){
        result = item.max
    }else{
        result = item.value
    }
    item.value = result
    
    
    var payload = {
        id : item,
        value : result
    }
    this.handleChangeSec3(payload)
    
}
handleChangeSec3(payload){
    this.setState({['_'+payload.id.id] : payload.value.result})
    var result = payload.value
    if(result === ""){
        this.setAnswerSec3('0',payload.id.id-11)   
    }else{
        this.setAnswerSec3(Number(result),payload.id.id-11) 
    }
}
setAnswerSec3(number,i){
    var index = Number(i)
    var value = Number(number)
    var arr = itemsec3.answer
    arr[index] = value
    itemsec3.answer = arr
    this.showscoreSec3(itemsec3.answer) 
    this.handleStatusSec3()
   
}
showscoreSec3(arr){
    var x = arr.reduce((total,num) => total + num)
    this.state.totalscore_sec3 = x
    return x
}
handleStatusSec3(){
    var count = 0
    for(let i = 0 ; i < 3 ; i++){
        if(itemsec3.answer[i] !== undefined){
            if(itemsec3.answer[i] === 0){
                count--
            }
            count++
    }
    
    if(count === 3){
        this.props.data(itemsec3.answer)
    }
}
}
    
    
    render(){
        return(
            <div className="c1" >
                    <Card >
                        <Card.Header className="text-center">การวางแผนการรักษา</Card.Header>
                        <Card.Body >
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-center" colspan="2">รายการ</th>
                                        <th className="text-center">คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="1" rowspan="2">&nbsp;แผนการรักษา(70)</td>
                                        <td >
                                            <p>รวบ รวมปัญหาของผู้ป่วยได้(20)</p>
                                        </td>
                                        <td colspan="1"><input class="input2" value={this.state._11} type="number" id="11" max="20" onChange={this.checkLengthsec3.bind(this,'11')}></input></td>
                                    </tr>
                                    <tr class="border_bottom">

                                        <td>
                                            <p>แผนการรักษา(50)</p>
                                        </td>
                                        <td><input class="input2" value={this.state._12} type="number" id="12" max="50" onChange={this.checkLengthsec3.bind(this,'12')}></input></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2">บันทึกข้อมูล (30)</td>
                                        <td  ><input class="input2" value={this.state._13} type="number" id="13" max="30" onChange={this.checkLengthsec3.bind(this,'13')}></input></td>

                                    </tr>

                                </tbody>
                            </table>
                        </Card.Body>
                        <Card.Footer className="text-muted" className="text-center">รวม : {this.state.totalscore_sec3}</Card.Footer>
                    </Card>
                </div>
        )
    }
}