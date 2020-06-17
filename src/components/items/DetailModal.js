import React from 'react'
import { Button,Modal,Table,Spinner,Form,Badge} from 'react-bootstrap'
import {fetchCode,onUpdateStatus} from '../../redux/actions/fetchCodeFunction'
import {getConductbyconId} from '../../redux/actions/ac-doc1'

import {getAllbySubject} from '../../redux/actions/ac.perio'

export default class DetailModal extends React.Component{
    
    constructor(){
        super()
        this.state = {show:false,perio:[],loaded:false,OM:[],showver:false,TN:'',loading:false,currentid:0}
    }

    componentDidMount(){
        this.setState({show:this.props.show})
        this.setState({OM : JSON.parse(sessionStorage.getItem('OM'))})
        
        setTimeout(() => {
           this.setState({loaded:true})
        }, 1200) 
  
    }
  
    onClose(){
        this.setState({show:false})
        this.props.fncallback(false)
        sessionStorage.removeItem('OM')
        sessionStorage.removeItem('HN')
        sessionStorage.removeItem('conduct')
    }

    ShowReview(answer){
            sessionStorage.setItem('currentSubject','omPre')
            sessionStorage.setItem('answers',JSON.stringify(answer))    
            window.open('/doc2')
    }

    showConduct(id){
        getConductbyconId(id)
        setTimeout(() => {
            window.open('/previewDoc1')
        }, 200)
    }

    // handleFormsPerio(id,subject){
    //     sessionStorage.setItem('currentSubject',subject)
    //     getPreviewPeriobyId(id,subject)
    //     window.location.href = '/doc2'
    // }

    renderBtnPerio(subject){
        return <Button onClick={()=>{
            sessionStorage.setItem('currentSubject',subject)    
            setTimeout(() => {
                window.location.href = '/Periodetail'
            }, 200);
        }}>{subject}</Button>
        
    }

    
    render(){
       if(this.state.loaded){
        return(
            <Modal show = {this.state.show} onHide = {()=>this.onClose()} size='lg'>
                    <Modal.Header closeButton>
                    <Modal.Title>รายการแบบฟอร์ม</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <div>
                            <h3>วิชา OM</h3>
                            <Table hover borderless size="sm" class='container'>
                            <thead>
                                <tr>
                                    <th>วันที่</th>
                                    <th>อาจารย์</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            {this.state.OM ? (this.state.OM.map((item) => <tr>
                            <td>{item.date} {item.interval ? <Badge variant='warning'>เช้า</Badge> :  <Badge variant='primary'>บ่าย</Badge>}</td>
                            <td>{item.TN}</td>
                            <td> 
                            <Button variant='outline-warning' onClick={()=>this.ShowReview(item.answer)}>ดู OM </Button>&nbsp;
                            <Button variant='outline-warning' onClick={()=>this.showConduct(item.conduct_id)}>ดู Conduct </Button>&nbsp;
                            </td>
                            </tr>) ) : (<tr></tr>)}      
                            </tbody>
                        </Table>
                        <hr></hr>
                        <h3>วิชา Perio</h3>
                            <Table hover borderless size="sm" class='container'>
                            <thead>
                                <tr>
                                    <th>charting</th>
                                    <th>recall</th>
                                    <th>recheck</th>
                                    <th>rescalling</th>
                                    <th>Sc&Rp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                     <td>{this.renderBtnPerio('Charting')}</td>
                                     <td>{this.renderBtnPerio('Recall')}</td>
                                     <td>{this.renderBtnPerio('Recheck')}</td>
                                     <td>{this.renderBtnPerio('Rescalling')}</td>
                                     <td>{this.renderBtnPerio('ScnRp')}</td>
                                     </tr>                     
                            </tbody>
                        </Table>
                        </div> 
                        </Modal.Body>
                <Modal.Footer>
                 <Button variant='outline-danger' onClick={()=>this.onClose()}>ปิด</Button>
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



