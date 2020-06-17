import React from 'react'
import {Form,Badge} from 'react-bootstrap'



export default class OMsec2 extends React.Component{
    constructor(){
        super()
        this.state = {_0:'',_1:'',_2:'',_3:''}
    }

    componentDidMount(){
        let item = this.props.value
   
            this.setState({_0:item[0],_1:item[1],_2:item[2],_3:item[3],preview:true})
        
    }

   
    render(){
            return(
                <div>
                    <hr></hr>
                    <Form.Label>การวินิจฉัยเบื้องต้น</Form.Label>
                    <hr></hr>
                        <div><Form.Label>การวินิจฉัยโรคเบื้องต้น (40)<Badge variant='danger'>{this.state._0}</Badge></Form.Label><br></br></div>
                       <hr></hr>
                       <Form.Label>การวินิจฉัยโรค</Form.Label>
                            <hr></hr>
                            <div>
                                <Form.Label>การใช้ข้อมูลจากการตรวจเพิ่มเติม (5)<Badge variant='danger'>{this.state._1}</Badge></Form.Label><br></br> 
                            <hr></hr>
                             <Form.Label>การบอกสาเหตุของการเกิดโรค (15)<Badge variant='danger'>{this.state._2}</Badge></Form.Label><br></br> 
                            <hr></hr>
                             <Form.Label>การวินิจฉัยโรค (40)<Badge variant='danger'>{this.state._3}</Badge></Form.Label><br></br>
                             </div> 
                            <hr></hr>

                       </div>          
        )
  
        
    }
}