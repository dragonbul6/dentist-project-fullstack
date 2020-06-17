import React from 'react'
import { Button,Modal,Table,Spinner,Form,Badge} from 'react-bootstrap'
import {getOM} from '../../redux/actions/ac-doc2' 

export default class DetailModal extends React.Component{
    
    constructor(){
        super()
        this.state = {show:false,loaded:false,pList:[]}
    }

    componentDidMount(){
        this.setState({show:this.props.show})
        this.setState({pList : JSON.parse(sessionStorage.getItem('pList'))})
        /* ฟอร์ม perio ในอนาคต */
        setTimeout(() => {
           this.setState({loaded:true})
        }, 1200) 
  
    }
    
    onClose(){
        this.setState({show:false})
        this.props.fncallback(false)
        sessionStorage.removeItem('pList')
        sessionStorage.removeItem('stCode')
        sessionStorage.removeItem('OM')
       
    }

    ShowReview(name,HN,subject){
        this.setState({loaded : false})
        switch (subject) {
            case "OM":
            getOM(HN)
            sessionStorage.setItem('cp',name)
            setTimeout(() => {
                window.location.href = '/list'
            }, 800);
            
                break;
            case "Perio":
                
            break;
        
            default:
                break;
        }
        
        
    }


    render(){
       if(this.state.loaded){
        return(
            <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='lg'>
                    <Modal.Header closeButton>
                    <Modal.Title>รายการแบบฟอร์มของนิสิต : {sessionStorage.getItem('stCode')}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <div>
                            <h3>วิชา OM</h3>
                            <Table hover borderless size="sm" class='container'>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผู้ป่วย</th>
                                    <th>Conduct</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.state.pList.map((item,index) =>(
                                         <tr>
                                         <td>{index +1}</td>
                                         <td>{item.forename} {item.surname}</td>
                                         <td>{item.conduct_id > 0 ? <Badge onClick={()=>alert('conduct')} style={{cursor:'pointer'}} variant='info'>ทำแล้ว</Badge> : <Badge variant='dark'>ไม่ทำ</Badge>}</td>
                                         <td>{item.conduct_id > 0 ? <Button variant='outline-warning' onClick={()=>this.ShowReview(item.forename+" "+item.surname,item.HN,"OM")}>รายละเอียด</Button>:<Button variant='outline-dark' disabled>ยังไม่ได้ทำ</Button>}</td>
                                         </tr> 
                                    ))}        
                            </tbody>
                        </Table>
                        <hr></hr>
                        <h3>วิชา Perio</h3>
                            <Table hover borderless size="sm" class='container'>
                            <thead>
                                <tr>
                                    <th>วันที่</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                     <td>..</td>
                                     <td>..</td>
                                     <td>..</td>
                                     </tr>                        
                            </tbody>
                        </Table>
                        </div> 
                        </Modal.Body>
                <Modal.Footer>
                {this.state.showver ? (
                <div>
                     <Form.Control type='password' ref='pass' placeholder='กรอกรหัส'/>
                    {this.state.loading ? (<div>
                        <Button variant='success'>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...
                            </Button><Button disabled variant='danger' onClick={()=>this.setState({showver:false})}>ยกเลิก</Button></div>):(<div><Button variant='success' onClick={this.Validation}>ยืนยัน</Button>&nbsp;<Button variant='danger' onClick={()=>this.setState({showver:false})}>ยกเลิก</Button></div>)}

                    </div>) 
                : <Button variant='outline-danger' onClick={()=>this.onClose()}>ปิด</Button>}
                
                </Modal.Footer>
        </Modal>
        
        )
       }else{
            return(
                <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='lg'>
                    <Modal.Header closeButton>
                    <Modal.Title>รายการแบบฟอร์ม</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <h3>กำลังโหลด..</h3>&nbsp;<Spinner animation="grow" role="status"/>
                    </div> 
                        </Modal.Body>
                <Modal.Footer>
                <Button variant='outline-danger' onClick={()=>this.onClose()}>ปิด</Button>
                </Modal.Footer> 
        </Modal>
                )
       }
        
    }
}



