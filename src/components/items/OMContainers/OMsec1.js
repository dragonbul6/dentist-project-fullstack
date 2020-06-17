import React from 'react'
import {Form, Badge} from 'react-bootstrap'


const item = {answer : new Array(7)}
export default class OMsec1 extends React.Component{
    constructor(){
        super()
        this.state = {totalscore:0,preview:false}
        this.state = {_0:'',_1:'',_2:'',_3:'',_4:'',_5:'',_6:''}
    }

    componentDidMount(){
        let item = this.props.value
            this.setState({_0:item[0],_1:item[1],_2:item[2],_3:item[3],_4:item[4],_5:item[5],_6:item[6],preview:true})


    }

    render(){
                    return(
                <div style={{backgroundColor:'#f5f5f5',color:'#7b71a9'}}>
                    <hr></hr>
                    <Form.Label>การซักประวัติ</Form.Label>
                    <hr></hr> 
                    <div style={{backgroundColor:'#f5f5f5',color:'#7b71a9'}}><Form.Label>อาการสำคัญ (10)<Badge variant='danger'>{this.state._0}</Badge></Form.Label></div>
                                <div style={{backgroundColor:'#f5f5f5',color:'#7b71a9'}}><Form.Label>อาการเจ็บป่วยปัจจุบัน (15)<Badge variant='danger'>{this.state._1}</Badge></Form.Label></div>
                                <div style={{backgroundColor:'#f5f5f5',color:'#7b71a9'}}><Form.Label>ประวัติทางการแพทย์ (10)<Badge variant='danger'>{this.state._2}</Badge></Form.Label></div>
                           <hr></hr>
                           <div>
                           <Form.Label>การตรวจ</Form.Label>
                                <div style={{ color:'#7b71a9'}}><Form.Label>วิธีการตรวจ (35) <Badge variant='danger'>{this.state._3}</Badge></Form.Label></div>
                                <Form.Label>บันทึกข้อมูล (15)<Badge variant='danger'>{this.state._4}</Badge></Form.Label>
                                </div>
                                <hr></hr>
                            <Form.Label>การส่งตรวจเพิ่มเติม</Form.Label>
                                    <div style={{backgroundColor:'#f5f5f5',color:'#7b71a9'}}><Form.Label>การเลือกส่งตรวจเพิ่มเติม (5)<Badge variant='danger'>{this.state._5}</Badge></Form.Label></div>
                                    <Form.Label>การแปรผลของการตรวจเพิ่ม (10) <Badge variant='danger'>{this.state._6}</Badge></Form.Label>
                                    <hr></hr>
                                    
                           
                           </div>
                           
            )
        
        
    }
}