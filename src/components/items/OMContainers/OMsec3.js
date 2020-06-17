import React from 'react'
import {Form,Badge} from 'react-bootstrap'


export default class OMsec3 extends React.Component{
    constructor(){
        super()
     
        this.state = {_0:'',_1:'',_2:''}
    }

    componentDidMount(){
        let item = this.props.value
        
            this.setState({_0:item[0],_1:item[1],_2:item[2],preview:true})
        
    }

    render(){
       
            return(
            <div>
                <hr></hr>
                <Form.Label>แผนการรักษา</Form.Label>
                <hr></hr>
                        <div><Form.Label>รวบรวมปัญหาของผู้ป่วยได้ (20) <Badge variant='danger'>{this.state._0}</Badge></Form.Label><br></br>
                        <hr></hr>
                        <Form.Label>แผนการรักษา (50)<Badge variant='danger'>{this.state._1}</Badge></Form.Label></div>
                       <hr></hr>
                       <Form.Label>บันทึกข้อมูล (30)<Badge variant='danger'>{this.state._2}</Badge></Form.Label>
                            <hr></hr>

                       </div>
                       
        )}

}