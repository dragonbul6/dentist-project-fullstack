import React from 'react'
import { Button,Modal} from 'react-bootstrap'
import Sec1 from './Docsec1'
import Sec2 from './Docsec2'
import Sec3 from './Docsec3'
import Sec4 from './Docsec4'


export default class Doc1Modal extends React.Component{
    
    constructor(){
        super()
        this.state = {show:false}
    }

    componentDidMount(){
        this.setState({show:this.props.status})
    }
    
    onClose(){
        this.setState({show:false})
        this.props.fncallback(1)
        
    }
    
    render(){
        return(
            <Modal size="lg" show = {this.state.show} onHide = {()=>this.onClose()}>
                    <Modal.Header style={{background:"purple"}} closeButton>
                    <Modal.Title style={{color:"white"}}>รายละเอียดของฟอร์ม DOC1</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <h3>ชื่อผู้ส่ง : {sessionStorage.getItem('DN')} | {sessionStorage.getItem('date')}</h3>
                            <Sec1 readonly={true} data = {sessionStorage.getItem('sec1')}/>
                            <hr></hr>
                            <Sec2 readonly={true} data = {sessionStorage.getItem('sec2')} />
                            <hr></hr>
                            <Sec3 readonly={true} data = {sessionStorage.getItem('sec3')}/>
                            <hr></hr>
                            <Sec4 readonly={true} data = {sessionStorage.getItem('sec4')} />
                        </Modal.Body>
                <Modal.Footer>
                <Button style={{background:"red"}}  onClick={()=>this.onClose()}>Close</Button>
                </Modal.Footer>
        </Modal>
        )
    }
}
