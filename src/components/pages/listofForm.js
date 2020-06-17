import React from 'react'
import {Table,Button,Badge} from 'react-bootstrap'
import ToolbarTest from '../items/Navbar/toolbarTest'


class ListForm extends React.Component{
    
    constructor(){
        super()
        this.state = {OM : []}
    }

     componentDidMount(){

            if(sessionStorage.getItem('OM') === null){
                window.location.href = '/'
            }else{
                
                this.setState({OM:JSON.parse(sessionStorage.getItem('OM'))})
            }


    }

    ShowReview(answer,subject){
        switch (subject) {
            case "OM":
            sessionStorage.setItem('currentSubject','omPre')
            sessionStorage.setItem('answers',JSON.stringify(answer))    
            window.open('/doc2')
                break;
            case "Perio":
                
            break;
        
            default:
                break;
        }
    }


    render(){
            return(
                <div>
                <div>
                        <ToolbarTest name={this.state.name} />
                    </div>
                    <div style={{paddingTop : 100}}>
                    <div class='col-12'>
                        <h1>แบบฟอร์ม OM ทั้งหมดของผู้ป่วย : {sessionStorage.getItem('cp')}</h1>
                    </div>
                            <Table striped borderless hover size="sm" class='container'>
                            <thead class="thead-light">
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>วันที่</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.OM.map((item,index) =>(
                                         <tr>
                                        <td>{index +1}</td>
                                         <td>{item.date} {item.interval ? <Badge variant='warning'>เช้า</Badge> :  <Badge variant='primary'>บ่าย</Badge>}</td>
                                         <td>{item.status ? <Badge variant='success'>เสร็จสิ้น</Badge> : <Badge variant='danger'>รอการตรวจสอบ</Badge>}</td>
                                         <th>{item.status ? <Button variant='outline-success' onClick={()=>this.ShowReview(item.answer,"OM")}>ดูรายละเอียด</Button> : 
                                         (
                                            <Button variant='outline-warning' onClick={()=>this.ShowReview(item.answer,"OM")}>ดูรายละเอียด</Button>
                                         )}</th>
                                         </tr> 
                                    ))}  
                                               
                            </tbody>
                        </Table>
                        
                    </div>
                    </div>
                )
            
    }
}

export default ListForm
    

