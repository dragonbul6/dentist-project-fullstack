import React from 'react'
import {Card, Table ,Badge,Button } from 'react-bootstrap'



export default class Doc1result extends React.Component {

    constructor() {
        super()
        this.state = { show: false , sec1:[] , sec2:[],sec3:[],sec4:[],sec5:[] }
    }

    componentDidMount() {
        let item = JSON.parse(sessionStorage.getItem('conduct'))
        this.setState({sec1 : item.answer.sec1 , sec2:item.answer.sec2 , sec3:item.answer.sec3 , sec4:item.answer.sec4 , sec5:item.answer.sec5})
        this.setState({ show: this.props.status })
    }

   ConvertNumbertoChar(item){
       if(item == 3){
           return <Badge variant='info'>-</Badge>
       }else if(item == 1){
           return <Badge variant='danger'>+</Badge>
       }else if(item == 2){
           return <Badge variant='warning'>0</Badge>
       }
   }

    render() {
        return (
            <div className="App-header">

                <Card style={{ width: "20%" }} style={{ background: "#ced4da" }} text="white" >
                    <Card.Body   >
                        <Card.Header><h1 >Attitudes,Value,Behavior</h1></Card.Header>
                        <Card.Text className="text-left" style={{ background: "white" }}>
                            {this.state.showsec11}
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เงื่อนไข</th>
                                        <th>คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>ความทุ่มเท ตั้งใจในการปฎิบัติงานให้ดีที่ที่สุด :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec1[0])}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>การเปิดใจรับฟังความเห็นที่แตกต่างในทีมงาน :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec1[1])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>ความมีวุฒิภาวะทางอารมณ์ที่ถูกต้องเหมาะสม :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec1[2])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>ความรับผิดชอบในเรื่องต่างๆ ทั้งส่วนตนและส่วนรวม :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec1[3])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>ความพยายามที่จะเพิ่มพูนความรู้ความสามารถในการเรียนรู้เพื่อให้เกิดการปฎิบัติงานที่ดีที่สุด :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec1[4])}</td>
                                    </tr>

                                </tbody>
                            </Table>


                            }
                            </Card.Text>
                    </Card.Body>




                    <Card.Body>
                        <Card.Header><h1>Consistenly place patient's</h1></Card.Header>

                        <Card.Text className="text-left" style={{ background: "white" }}>

                            {this.state.showsec21} &&
                     <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เงื่อนไข</th>
                                        <th>คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>ประเมินการมีกระบวนการคิดและตัดสินใจที่เหมาะสมโดยยึดประโยชน์ของผู้ป่วยเป็นหลัก :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec2[0])}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>ความอุทิศตนในการปฏิบัติงานอย่างซื่อสัตย์สุจริตเพื่อประโยชน์ของผู้ป่วย :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec2[1])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>ความกระตือรือล้นที่จะแก้ไขปัญหาเพื่อให้ได้สิ่งที่ดีที่สุดแก้ผู้ป่วย :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec2[3])}</td>
                                    </tr>


                                </tbody>
                            </Table>
                            }
                        </Card.Text>
                    </Card.Body>

                    <Card.Body>
                        <Card.Header><h1 >Patient safety</h1></Card.Header>

                        <Card.Text className="text-left" style={{ background: "white" }}>

                            {this.state.showsec31} &&
                         <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เงื่อนไข</th>
                                        <th>คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>มีความตระหนักและปฏิบัติงานอย่างคำนึงถึงความปลอดภัยของผู้ป่วย,ทีมงาน,และผู้เกี่ยวข้อง :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec3[0])}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>ปฏิบัติงานโดยใช้หลักการมาตรฐานของ infection control :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec3[1])}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            }
                        </Card.Text>
                    </Card.Body>


                    <Card.Body>
                        <Card.Header><h1 >Conduct สิทธิผู้ป่วย</h1></Card.Header>

                        <Card.Text className="text-left" style={{ background: "white" }}>
                            <div style={{ fontFamily: 'Prompt', justifySelf: "left", color: "black" }}>

                            </div>
                            {this.state.showsec41} &&
                     <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เงื่อนไข</th>
                                        <th>คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td> ปฏิเสธ/ละทิ้งการนัดหมาย/ทอดทิ้งผู้ป่วย :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec4[0])}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td> นัดผู้ป่วยซ้ำซ้อน(มากกว่า1คน):</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec4[1])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>เริ่มปฏิบัติงานช้ากว่านัดผู้ป่วยมากกว่า 30 นาที :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec4[2])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>เริ่มปฏิบัติงานเกินเวลาและไม่มีอาจารย์คุม:</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec4[3])}</td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>ส่ง record เกินกำหนดเวลา:</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec4[4])}</td>
                                        
                                    </tr>


                                </tbody>
                            </Table>
                            }
                        </Card.Text>
                        
                    </Card.Body>


                    <Card.Body>
                        <Card.Header><h1 >Conduct</h1></Card.Header>

                        <Card.Text className="text-left" style={{ background: "white" }}>
                            <div style={{ fontFamily: 'Prompt', justifySelf: "left", color: "black" }}>

                            </div>
                            {this.state.showsec41} &&
                     <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เงื่อนไข</th>
                                        <th>คะแนน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td> ขึ้นคลินิกตรงต่อเวลา :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec5[0])}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td> การแต่งกายสะอาดเรียบร้อย:</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec5[1])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>มีกิริยาสุภาพเหมาะสม :</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec5[2])}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>ช่วยเหลือผู้อื่น โอบอ้อมอารี:</td>
                                        <td>{this.ConvertNumbertoChar(this.state.sec5[3])}</td>
                                        
                                    </tr>
                                </tbody>
                            </Table>
                            }
                        </Card.Text>
                        <Button variant="primary" type="submit" onClick={()=>window.close()}>ปิด</Button>
                    </Card.Body>

                </Card>
                
            </div>
        )
    }
}
