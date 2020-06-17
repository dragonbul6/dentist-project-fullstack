import React from 'react'

import { Button,Table,} from 'react-bootstrap'
import ToolbarTest from '../items/Navbar/toolbarTest'

import {getConductbyconId} from '../../redux/actions/ac-doc1'
import {getAllbySubject} from '../../redux/actions/ac.perio'

export default class Maindoc2 extends React.Component{

constructor(){
    super()
    this.state = {items : [],loaded:false}
}

componentDidMount(){
    getAllbySubject(sessionStorage.getItem('currentSubject'),sessionStorage.getItem('HN'))
    setTimeout(()=>this.setState({loaded:true,items:JSON.parse(sessionStorage.getItem('perioDash'))}),500)
    
}

showConduct(id){
    getConductbyconId(id)
    setTimeout(() => {
        window.open('/previewDoc1')
    }, 200)
}
    
    render(){ 
            if(this.state.loaded){
                return(
                    <div>
                        <div>
                            <ToolbarTest/>
                        </div>
                        <div style={{paddingTop:100}}>
                                <h1>{sessionStorage.getItem('currentSubject')}</h1>
                                <Table striped bordered hover size="sm" class='container'>
                                <thead class="thead-light">
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>สถานะ</th>
                                        <th>วันที่</th>
                                        <th>การจัดการ</th>
                                        <th>Conduct</th>
                                    </tr>
                                </thead>
                                <tbody>      
                                       {this.state.items.map((item,i) => <tr>
                                        <td>{i + 1}</td>
                                        <td>{item.finish ? <p>เสร็จสิ้น</p> : <p>ยังไม่เสร็จ</p>}</td>
                                       <td> ทำเมื่อ {item.date} {item.interval}</td>
                                         <td><Button onClick={()=>this.props.history.push({
                                                                    pathname: '/previewPerio',
                                                                    state: { items:this.state.items[i],conduct_id:item.conduct_id }
                                                                    })}>คำตอบ</Button></td>
                                         <td><Button onClick={()=>this.showConduct(item.conduct_id)}>ดูรายละเอียด</Button></td>
                                         </tr>)}                       
                                </tbody>
                            </Table>
                            
                        </div>
                        </div>
                )
            }else{
                return (
                    <div style={{paddingTop:100}}>
                                <h1>{sessionStorage.getItem('currentSubject')}</h1>
                                <Table striped bordered hover size="sm" class='container'>
                                <thead class="thead-light">
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>สถานะ</th>
                                        <th>วันที่</th>
                                        <th>การจัดการ</th>
                                        <th>Conduct</th>
                                    </tr>
                                </thead>
                                <tbody>    
                                </tbody>
                            </Table>
                            
                        </div>
                )
            }
        
    }
}