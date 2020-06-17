import React from 'react'
import {Form,Card} from 'react-bootstrap'




export default class Docsec2 extends React.Component{
    constructor(){
        super()
        this.state = {_0:0,_1:0,_2:0}
        this.state = {zero:3,plus:0,minus:0,answer:[]}
    }

    componentDidMount(){
        let {zero,plus,minus} = this.state
        let item = [2,2,2]
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



    render(){
            return(
                <div className="row" style={{ color: "black",paddingTop:"15px" }}>
                <div className="col-sm-4">
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ประเมินการมีกระบวนการคิดและตัดสินใจที่เหมาะสมโดยยึดประโยชน์ของผู้ป่วยเป็นหลัก</p></Card.Header>
                        <Card.Body>
                        <div onChange={(event)=>this.handleonChange('0',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='f' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='f' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='f' type="radio" />
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-4">
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความอุทิศตนในการปฏิบัติงานอย่างซื่อสัตย์สุจริตเพื่อประโยชน์ของผู้ป่วย</p></Card.Header>
                        <Card.Body>
                       
                        <div onChange={(event)=>this.handleonChange('1',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='g' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='g' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='g' type="radio" />
                            </div>
                            
                        </Card.Body>
                    </Card>
                    <br></br>
                </div>
                
                <div className="col-sm-4">
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความกระตือรือล้นที่จะแก้ไขปัญหาเพื่อให้ได้สิ่งที่ดีที่สุดแก้ผู้ป่วย</p></Card.Header>
                        <Card.Body>
                        <div onChange={(event)=>this.handleonChange('2',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='h' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='h' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='h' type="radio" />
                            </div>
                            
                        </Card.Body>
                    </Card>
                </div>
         </div>       
        )
        }   
        
    
}