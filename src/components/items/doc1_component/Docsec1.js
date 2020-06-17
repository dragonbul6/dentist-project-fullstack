import React from 'react'
import { Form, Card} from 'react-bootstrap'



export default class Docsec1 extends React.Component {
    constructor() {
        super()
    
        this.state = {_0:0,_1:0,_2:0,_3:0,_4:0}
        this.state = {zero:5,plus:0,minus:0,answer:[]}
    }

    componentDidMount(){
        let {zero,plus,minus} = this.state
        let item = [2,2,2,2,2]
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

    render() {
        
            return (
                <div className="row" style={{ color: "black",paddingTop:"15px",padding:'20px' }}>
                <div className="col-sm-4">
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความทุ่มเท ตั้งใจในการปฎิบัติงานให้ดีที่ที่สุด</p></Card.Header>
                        <Card.Body>
                            <div onChange={(event)=>this.handleonChange('0',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='a' type="radio" /> 
                            <Form.Check inline label="0" value="0" id='1' name='a' type="radio" defaultChecked />
                            <Form.Check inline label="-" value="-" id='2' name='a' type="radio" />
                            </div>

                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-4">
                <Card>
                    <Card.Header><p style={{fontSize:"15px"}}>การเปิดใจรับฟังความเห็นที่แตกต่างในทีมงาน</p></Card.Header>
                        <Card.Body>
                            <div onChange={(event) => this.handleonChange('1',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='b' type="radio"/>
                            <Form.Check inline label="0" value="0" id='1' name='b' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='b' type="radio"/>
                            </div>
                        </Card.Body>
                    </Card>
                    <br></br>
                </div>

                <div className="col-sm-4">
                <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความมีวุฒิภาวะทางอารมณ์ที่ถูกต้องเหมาะสม</p></Card.Header>
                        <Card.Body> 
                        <div onChange={(event) => this.handleonChange('2',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='c' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='c' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='c' type="radio" />
                        </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-4">
                <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความรับผิดชอบในเรื่องต่างๆ ทั้งส่วนตนและส่วนรวม</p></Card.Header>
                        <Card.Body>
                       
                        <div onChange={(event) => this.handleonChange('3',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='d' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='d' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='d' type="radio" />
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-4">
                    <Card >
                    <Card.Header><p style={{fontSize:"15px"}}>ความพยายามที่จะเพิ่มพูนความรู้ความสามารถในการเรียนรู้เพื่อให้เกิดการปฎิบัติงานที่ดีที่สุด</p></Card.Header>
                        <Card.Body>
                           
                        <div onChange={(event) => this.handleonChange('4',event.target.value)}>
                            <Form.Check inline label="+" value="+" id='0' name='e' type="radio" />
                            <Form.Check inline label="0" value="0" id='1' name='e' type="radio" defaultChecked/>
                            <Form.Check inline label="-" value="-" id='2' name='e' type="radio" />
                        </div>
                        </Card.Body>
                    </Card>
                </div>

            </div>

            )
        }

    
}