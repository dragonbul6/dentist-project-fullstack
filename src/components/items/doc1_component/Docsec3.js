import React from 'react'
import {Form,Card} from 'react-bootstrap'




export default class Docsec3 extends React.Component{
    constructor(){
        super()
        this.state = {_0:0,_1:0}
        this.state = {zero:2,plus:0,minus:0,answer:[]}
        
    }


    
    componentDidMount(){
        let {zero,plus,minus} = this.state
        let item = [2,2]
        let status = [zero,plus,minus]
        
            this.props.defualtData(item,status)
            
       
    }

    handleonChange(id,value){
        
        let index = '_'+id
        let {zero,plus,minus} = this.state
        
        if(value === '+'){
            this.setState({[index] : 1,plus:plus+1,zero:zero-1})
            this.props.data(id,1,plus+1,zero-1)
        }else if(value === '-'){
            this.setState({[index] : 3,minus:minus+1,zero:zero-1})
            this.props.data(id,3,minus+1,zero-1)
            
            
        }
           
    }

    toggleSec1(){
        this.setState({showsec31 : !this.state.showsec31})
    }
    

    render(){
            return(
                <div className="row"  style={{ color: "black",paddingTop:"15px",padding:'20px' }}>
                <div className="col-sm-6" >
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความปลอดภัยของผู้ป่วย,ทีมงาน,และผู้เกี่ยวข้อง</p></Card.Header>
                        <Card.Body>
                        <div onChange={(event)=>this.handleonChange('0',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='i' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='i' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='i' type="radio" />
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-6">
                    <Card>
                    <Card.Header><p style={{fontSize:"15px"}}>ใช้หลักการมาตรฐานของ Infection control</p></Card.Header>
                        <Card.Body>
                         
                        <div onChange={(event)=>this.handleonChange('1',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='j' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='j' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='j' type="radio" />
                            </div>
                            
                        </Card.Body>
                    </Card>
                    <br></br>
                </div>

       </div>
                           
            )

    }
}