import React from 'react'
import { Form,Badge} from 'react-bootstrap'



export default class OMsec4 extends React.Component {
    constructor() {
        super()
        this.state = {
            preview : false
        }
        this.state = { _0: '', _1: '', _2: '', _3: '', _4: '', _5: '', _6: '', _7: '', _8: '', _9: '' }
    }

    componentDidMount() {
        let item = this.props.value
       
            this.setState({
                _0: item[0], _1: item[1], _2: item[2], _3: item[3], _4: item[4], _5: item[5], _6: item[6]
                , _7: item[7], _8: item[8], _9: item[9] , preview : true
            })
        
    }

   

    render() {
            return (

                <div>

                    <div>
                        <Form.Label>การซักประวัติ</Form.Label>
                        <div><Form.Label>อาการสำคัญ (5)<Badge variant='danger'>{this.state._0}</Badge></Form.Label><br></br>
                            <Form.Label>อาการเจ็บป่วยปัจจุบัน (8)<Badge variant='danger'>{this.state._1}</Badge></Form.Label><br></br>
                            <Form.Label>ประวัติทางการแพทย์ (2)<Badge variant='danger'>{this.state._2}</Badge></Form.Label></div>
                    </div>
                    <div><Form.Label>การตรวจ</Form.Label>
                        <div><Form.Label>วิธีการตรวจ (20)<Badge variant='danger'>{this.state._3}</Badge></Form.Label><br></br>
                        </div>
                    </div>
                    <div><Form.Label>การตรวจ</Form.Label>
                        <div><Form.Label>การเลือกส่งตรวจเพิ่มเติม (5)<Badge variant='danger'>{this.state._4}</Badge></Form.Label><br></br>
                            <Form.Label>การแปรผลของการตรวจเพิ่ม (5)<Badge variant='danger'>{this.state._5}</Badge></Form.Label><br></br>
                        </div>
                    </div>
                    <div><Form.Label>การวินิจฉัยโรค</Form.Label>
                        <div><Form.Label>การวินิจฉัยโรค (15)<Badge variant='danger'>{this.state._6}</Badge></Form.Label><br></br>
                        </div>
                    </div>
                    <div><Form.Label>การรักษาโรค</Form.Label>
                        <div><Form.Label>แผนการรักษา (15)<Badge variant='danger'>{this.state._7}</Badge></Form.Label><br></br>
                            <Form.Label>การติดตามผลการรักษา (15)<Badge variant='danger'>{this.state._8}</Badge></Form.Label>
                        </div>
                    </div>
                    <div><Form.Label>การบันทึกข้อมูล</Form.Label>
                        <div><Form.Label>การบันทึกข้อมูล (10)<Badge variant='danger'>{this.state._9}</Badge></Form.Label><br></br>
                        </div>
                    </div>
                    {this.state.preview ? null : (<Form.Label>ผลรวม(100) : {this.state.totalscore}</Form.Label>)}
                
                </div>

            )
        }
    
}