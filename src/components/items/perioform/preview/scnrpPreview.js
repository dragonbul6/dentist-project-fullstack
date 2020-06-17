import React, { Component } from 'react'
import { Card,Accordion, InputGroup, FormControl , Button , Spinner } from 'react-bootstrap'
import {fetchItem} from '../../../../redux/actions/ac-main'
import {connect} from 'react-redux'
import {updatePerioFormbyId} from '../../../../redux/actions/ac.perio'
import {fetchCode} from '../../../../redux/actions/fetchCodeFunction'
import ToolbarTest from '../../Navbar/toolbarTest'
import Knowledge from '../../knowledge'
import '../../../styles/perio.css'


let data = new Array(9)
export class Scnrp extends Component {
    constructor() {
        super()
        this.state = { id:'',date : '',area:[],sel1:'Mild',sel2:'Gingivitis',
        validate:false,loading:false,finish:false,onclose:false,kn:0}
        this.state = {sp1:'',sp2:'',sp3:'',sp4:'',sp5:'',sp6:'',sp7:'',sp8:'',sp9:''}
        
    }

    async componentDidMount(){
       sessionStorage.removeItem('perioDash')
          let items = this.props.items
        this.setState({attempt:items.attempt,sel1:items.sel1,sel2:items.sel2,finish:true,date:items.date,id:items.id,area:items.area.filter((item) => item != null),kn:items.kn}) 
        
        if(items.finish){
            this.setState({onclose : true})
        }
        items.answer.map((item,i) => {
            let name = 'sp'+(i+1)
            data[i] = item
            this.setState({[name] : item})
            document.getElementById('spsel0').disabled = true
            document.getElementById('spsel1').disabled = true
            if(data[i]){ 
            }
        })

        for (let index = 0; index < data.length; index++) {
            let name = 'sp'+(index+1)
            document.getElementsByName([name])[0].disabled = true
            document.getElementsByName([name])[1].disabled = true
            document.getElementsByName([name])[2].disabled = true
            
        }
        await this.props.fetchAccount()  

}
   

    render() {
        return (
            <div className="backgroud">
                    <div>
                        <ToolbarTest />
                    </div>
                    
                <div className="c2" id='Rescaling' style={{marginTop:100}}>
                    <Card style={{ width: '100%' }} className="text-center">
                        <Card.Header ><h4>แบบฟอร์มประเมิน SC&RP</h4></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer">
                                    ทำเมื่อวัน่ที่ {this.state.date}
                                    </footer>
                            </blockquote>
                            <Knowledge disable={true} value={this.state.kn}/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="c1">
                    <Card >
                        <table border="1">
                            <thead className="th">
                                <tr>
                                    <td colspan="2">Sc & Rp </td>
                                    <td>
                                            คุณทำ : {JSON.stringify(this.state.area)}
                                    </td>
                                    <td>
                                        <select class="form-control" id="spsel0" name="sellist1" onChange={(e) => this.setState({sel1:e.target.value})}>
                                            <option value='Mild'>Mild</option>
                                            <option value='Moderate'>Moderate</option>
                                            <option value='Severe'>Severe</option>
                                        </select>
                                    </td>

                                    <td ><select class="form-control" id="spsel1" name="sellist2" onChange={(e) => this.setState({sel2:e.target.value})}>
                                        <option value='Gingivitis'>Gingivitis</option>
                                        <option value='Periodontitis'>Periodontitis</option>
                                    </select></td>

                                    <td >
                                        <InputGroup size="sm">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>other</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl />
                                        </InputGroup>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">1.Beginning check&nbsp;&nbsp;</td>
                                    <td >A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td></td>
                                </tr>
                                <tr onChange={(e) => data[0] = e.target.value} >
                                    <td colspan="2">รายงานเคสผู้ป่วย&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp1" value="ได้ความสำคัญครบถ้วน เป็นลำดับ" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp1" value="ได้ความสำคัญแต่ไม่ครบถ้วน" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp1" value="ไม่ได้ความสำคัญ ไม่ครบถ้วน" onClick={(e) => this.setState({ sp1: e.target.value })} /></td>
                                    <td >{this.state.sp1}</td>
                                </tr>
                                <tr onChange={(e) => data[1] = e.target.value}>
                                    <td colspan="2">การจัดเตรียมเครื่องมือและยูนิต&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp2" value="ครบถ้วนถูกต้องพร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp2" value="เตรียมแต่ไม่ครบถ้วน ไม่พร้อมใช้งาน" onClick={(e) => this.setState({ sp2: e.target.value })} /></td>
                                    <td >{this.state.sp2}</td>
                                </tr>
                                <tr >
                                    <td colspan="2">2.Process: Scaling &amp; Root planing&nbsp;&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                </tr>
                                <tr onChange={(e) => data[2] = e.target.value}>
                                    <td colspan="2">การจัดตำแหน่งผู้ป่วยตาม area of operation</td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยุ่ในตำแหน่งที่ถูดต้องเหมาะสมตลอดเวลา" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยู่ในตำแหน่งที่เหมาะสม แต่ไม่ตลอดเวลา" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp3" value="ผู้ป่วยอยู่ในตำแหน่งที่ไม่เหมาะสมบ่อยครั้ง" onClick={(e) => this.setState({ sp3: e.target.value })} /></td>
                                    <td >{this.state.sp3}</td>
                                </tr>
                                <tr onChange={(e) => data[3] = e.target.value}>
                                    <td colspan="2">ตำแหน่งของทันตแพทย์ตาม area of operation&nbsp;&nbsp;</td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ถูกต้องเหมาะสม ตลอดเวลา" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ถูกต้องเหมาะสม แต่ไม่ตลอดเวลา" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp4" value="อยู่ในตำแหน่งที่ไม่เหมาะสมบ่อยครั้ง" onClick={(e) => this.setState({ sp4: e.target.value })} /></td>
                                    <td >{this.state.sp4}</td>
                                </tr>
                                <tr onChange={(e) => data[4] = e.target.value}>
                                    <td rowspan="2">การปฏิบัติงานในช่องปาก</td>
                                    <td >ใช้เครื่องมือได้ถูกต้องตาม area of operation ได้ตลอดเวลา</td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือได้ถูกต้อง ตาม area of operation ได้ตลอดเวลา" onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือได้ถูกต้อง ตาม area of operation แต่ไม่ตลอดเวลา"  onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp5" value="ใช้เครื่องมือไม่ได้ถูกต้อง ตาม area of operation มีข้อผิดพลาดบ่อยครั้ง"  onClick={(e) => this.setState({ sp5: e.target.value })} /></td>
                                    <td >{this.state.sp5}</td>
                                </tr>
                                <tr onChange={(e) => data[5] = e.target.value}>
                                    <td >มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม ตลอดเวลา</td>
                                    <td ><input type="radio" name="sp6" value="มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม ตลอดเวลา"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp6" value="มี Rest & Guard และ Visibility ที่ดีถูกต้องเหมาะสม แต่ไม่ตลอดเวลา"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp6" value="ไม่มี Rest & Guard และ Visibility ที่ดี"  onClick={(e) => this.setState({ sp6: e.target.value })} /></td>
                                    <td >{this.state.sp6}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">&nbsp;4.Product&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                    <td >&nbsp;</td>
                                </tr>
                                <tr onChange={(e) => data[6] = e.target.value}>
                                    <td rowspan="2">&nbsp;&nbsp;ความสะอาดและความเรียบ</td>
                                    <td>เหนือเหงือก&nbsp;</td>
                                    <td ><input type="radio" name="sp7" value="สะอาดและเรียบดีมากทุกด้าน"  onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp7" value="สะอาดและเรียบดี มีข้อผิดพลาดบ้าง ไม่เกิน 2 ตำแหน่ง" onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp7" value="ไม่สะอาดและไม่เรียบ มีข้อผิดพลาดมากเกิน 2 ตำแหน่ง"  onClick={(e) => this.setState({ sp7: e.target.value })} /></td>
                                    <td >{this.state.sp7}</td>
                                </tr>
                                <tr onChange={(e) => data[7] = e.target.value}>
                                    <td >ใต้เหงือก&nbsp;</td>
                                    <td ><input type="radio" name="sp8" value="สะอาดและเรียบดีมากทุกด้าน / หรือติดเล็กน้อย"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp8" value="สะอาดและเรียบดี มีข้อผิดพลาดบ้าง ไม่เกิน 3-4 ตำแหน่ง"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp8" value="ไม่สะอาดและไม่เรียบ มีข้อผิดพลาดมากเกิน 4 ตำแหน่ง"  onClick={(e) => this.setState({ sp8: e.target.value })} /></td>
                                    <td >{this.state.sp8}</td>
                                </tr>
                                <tr onChange={(e) => data[8] = e.target.value}>
                                    <td colspan="2">&nbsp;&nbsp;สภาพ soft tissue</td>
                                    <td ><input type="radio" name="sp9" value="ไม่พบ tissue trauma / หรือพบ IDP traumaไม่เกิน 1 ตำแหน่ง"  onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp9" value="tissue trauma บริเวณ marginal gingiva และ IDP trauma ไม่เกิน 2 ตำแหน่ง"  onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td ><input type="radio" name="sp9" value="tissue trauma บริเวณ marginal ginggiva หรือIDP trauma มากกว่า 2 ตำแหน่งขึ้นไป" onClick={(e) => this.setState({ sp9: e.target.value })} /></td>
                                    <td >{this.state.sp9}</td>
                                </tr>
                            </tbody>
                        </table>

                       <Button onClick={()=>{
                                window.location.href = '/Periodetail'
                        }}>ไปหน้าหลัก</Button>

                       
                        
                        <p>&nbsp;</p>
                    </Card>

                    <Card>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    OHI!
                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <table border="1">
                                            <tbody>
                                                <tr>
                                                    <td>OHI</td>
                                                    <td>A</td>
                                                    <td>B</td>
                                                    <td>C</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr>

                                                    <td>การประเมินปัญหาอนามัยช่องปากผู้ป่วย</td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi1" value="Bike" /></td>

                                                </tr>
                                                <tr>

                                                    <td>ตรวจและบันทึกค่า Gingival Index</td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi2" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>ตรวจและบันทึกค่า Plaque Index</td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi3" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>การเลือกอุปกรณ์ทำความสะอาด</td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi4" value="Bike" /></td>

                                                </tr>
                                                <tr>
                                                    <td>การให้อนามัยช่องปาก</td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>
                                                    <td><input type="radio" name="ohi5" value="Bike" /></td>

                                                </tr>

                                            </tbody>
                                        </table>



                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Card>


                    <Card>
                    </Card>



                </div>




            </div>
            
        )
    }
}

Scnrp.defaultProps = {
    account : [],
}

const mapStatetoProps = (state) =>{
    
    return{
        account : state.mainReducers.getPersonInfo.item,
    }
}

const mapDispatchtoProp = (dispatch) => {
    return{
        fetchAccount : () => dispatch(fetchItem()),
    }
}
export default connect(mapStatetoProps,mapDispatchtoProp)(Scnrp)