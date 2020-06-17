import React from 'react'
import { Card} from 'react-bootstrap'

const itemsec2 = {answer : new Array(4)}
export default class om02 extends React.Component{
    
    constructor(){
        super()
        this.state = {_7:'',_8:'',_9:'',_10:''}
        this.state = {totalscore_sec2:0}
    }
    

    
checkLengthsec2 = (id) => {
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
    this.handleChangeSec2(payload)
    
}
handleChangeSec2(payload){
    this.setState({['_'+payload.id.id] : payload.value.result})
    var result = payload.value
    if(result === ""){
        this.setAnswerSec2('0',payload.id.id-7)   
    }else{
        this.setAnswerSec2(Number(result),payload.id.id-7) 
    }
}
setAnswerSec2(number,i){
    var index = Number(i)
    var value = Number(number)
    var arr = itemsec2.answer
    arr[index] = value
    itemsec2.answer = arr
    this.showscoreSec2(itemsec2.answer) 
    this.handleStatusSec2()
}
showscoreSec2(arr){
    var x = arr.reduce((total,num) => total + num)
    this.state.totalscore_sec2 = x
    return x
}
handleStatusSec2(){
    var count = 0
    for(let i = 0 ; i < 4 ; i++){
        if(itemsec2.answer[i] !== undefined){
            if(itemsec2.answer[i] === 0){
                count--
            }
            count++
    }
    
    if(count === 4){
        this.props.data(itemsec2.answer)
    }
}
}

    render(){
        return(
            <div className="c1">
                    <Card >
                        <Card.Header className="text-center">การวินิจฉัย</Card.Header>
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
                                        <td class="border_bottom" rowspan="1">การวินิจฉัยเบื้องต้น(40)</td>
                                        <td class="border_bottom">
                                            <p>การวินิจฉัยเบื้องต้น(10)</p>
                                        </td>
                                        <td class="border_bottom" colspan="1"><input class="input2" value={this.state._7} type="number"  id="7" max="10" onChange={this.checkLengthsec2.bind(this,'7')}></input></td>
                                    </tr>
                                    <tr >
                                        <td rowspan="3">การวินิจฉัยโรค(60)&nbsp;&nbsp;</td>
                                        <td >&nbsp;การใช้ข้อมูลจากการตรวจเพิ่มเติม(5)</td>
                                        <td ><input class="input2" value={this.state._8} type="number"  id="8" max="5" onChange={this.checkLengthsec2.bind(this,'8')}></input></td>
                                    </tr>
                                    <tr >
                                        <td>การบอกสาเหตุการเกิดโรค(15)</td>
                                        <td ><input class="input2" value={this.state._9} type="number"  id="9" max="15" onChange={this.checkLengthsec2.bind(this,'9')}></input></td>
                                    </tr>
                                    <tr>
                                        <td>การวินิจฉัยโรค(40)</td>
                                        <td><input class="input2" value={this.state._10} type="number" id="10" max="40" onChange={this.checkLengthsec2.bind(this,'10')}></input></td>
                                    </tr>

                                </tbody>
                            </table>
                        </Card.Body>
                        <Card.Footer className="text-muted" className="text-center">รวม : {this.state.totalscore_sec2}</Card.Footer>
                    </Card>
                </div>
        )
    }
}