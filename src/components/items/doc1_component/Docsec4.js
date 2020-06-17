import React from 'react'
import {Form,Card} from 'react-bootstrap'


export default class Docsec4 extends React.Component{
    constructor(){
        super()
        this.state = {zero:2,plus:0,minus:0,answer:[]}
        this.state = {_0:2,_1:2,_2:2,_3:2,_4:2,_5:2}
    }

    componentDidMount(){
        let {zero,plus,minus} = this.state
        let item = [2,2,2,2,2,2]
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
            <div className="row" style={{ color: "black",paddingTop:"15px"}}>
            <div className="col-sm-4">
                <Card>
                <Card.Header> <p style={{fontSize:"15px"}}>ปฏิเสธ/ละทิ้งการนัดหมาย/ทอดทิ้งผู้ป่วย</p></Card.Header> 
                    <Card.Body>
                         
                         
                    <div onChange={(event) => this.handleonChange('0',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='l' type="radio"/>
                            <Form.Check inline label="0" value="0" id='1' name='l' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='l' type="radio"/>
                            </div>
                    </Card.Body>
                </Card>
                <br></br>
            </div>
            
            <div className="col-sm-4">
                <Card>
                <Card.Header><p style={{fontSize:"15px"}}>นัดผู้ป่วยซ้ำซ้อน(มากกว่า1คน)</p></Card.Header>
                    <Card.Body>
                     
                    <div onChange={(event) => this.handleonChange('1',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='m' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='m' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='m' type="radio" />
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
            
            <div className="col-sm-4">
                <Card>
                <Card.Header><p style={{fontSize:"15px"}}>เริ่มปฏิบัติงานช้ากว่านัดผู้ป่วยมากกว่า 30 นาที</p></Card.Header>
                    <Card.Body>  
                    <div onChange={(event) => this.handleonChange('2',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='n' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='n' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='n' type="radio" />
                            </div>
                    </Card.Body>
                </Card>
            </div>
            
            <div className="col-sm-4">
                <Card>
                <Card.Header><p style={{fontSize:"15px"}}>เริ่มปฏิบัติงานเกินเวลาและไม่มีอาจารย์คุม</p></Card.Header>
                    <Card.Body>  
                    <div onChange={(event) => this.handleonChange('3',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='n' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='n' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='n' type="radio" />
                            </div>
                    </Card.Body>
                </Card>
            </div>
            
            <div className="col-sm-4">
                <Card >
                <Card.Header><p style={{fontSize:"15px"}}>ปฏิบัติงานนอกเวลา/สถานที่</p></Card.Header>
                    <Card.Body>
                    <div onChange={(event) => this.handleonChange('4',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='o' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='o' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='o' type="radio" />
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="col-sm-4">
                <Card >
                <Card.Header><p style={{fontSize:"15px"}}>ส่ง record เกินกำหนดเวลา</p></Card.Header>
                    <Card.Body>
                    <div onChange={(event) => this.handleonChange('5',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='o' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='o' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='o' type="radio" />
                        </div>
                    </Card.Body>
                </Card>
            </div>
 
    </div>
                       
        )
        
    }
}