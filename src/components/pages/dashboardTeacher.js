import React from 'react'
import {fetchListStudent,getPatientListByStudentID} from '../../redux/actions/ac-dashboard'
import {connect} from 'react-redux'
import {Table,Button} from 'react-bootstrap'
import ToolbarTest from '../items/Navbar/toolbarTest'

import ModalDetail from '../items/DetailModal_teacher'


class DashboardTeacher extends React.Component{
    
    constructor(){
        super()
        this.state = {loaded : false,showDetail:false}  
    }

     componentDidMount(){
        sessionStorage.removeItem('pList')
        sessionStorage.removeItem('cp')
        if(localStorage.getItem('token') === null){
            this.props.history.push('/login')
        }
        setTimeout(() => {
        this.props.fetchList()
        this.setState({loaded : true})
        }, 100);

        
    }

    renderButton(student_id){    
        
            return (
           <Button variant="primary" onClick={()=>{
            getPatientListByStudentID(student_id)
            sessionStorage.setItem('stCode',student_id)
                setTimeout(() => {
                    this.setState({showDetail:true}) 
                }, 500);
                
                }}><p style={{color:'white'}}>ดูรายละเอียด</p></Button>)
        
    }

    render(){
        if(this.state.loaded){
            return(
                    <div>
                    <div>
                        <ToolbarTest name={this.state.name} />
                    </div>
                    <div style={{paddingTop:100}}>
                    {this.state.showDetail && <ModalDetail show ={this.state.showDetail} fncallback = {(unshow) => this.setState({showDetail:unshow})} />}
                            <Table striped bordered hover size="sm" class='container'>
                            <thead class="thead-light">
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รหัสนักศึกษา</th>
                                    <th>ชื่อนามสกุลนิสิต</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.list.map((item,index) => (
                                     <tr>
                                     <td>{index +1}</td>
                                     <td>{item.student_code}</td>
                                     <td>{item.forename} {item.surname}</td>
                                     <td>{this.renderButton(item.student_code)}</td>
                                     </tr> 
                                )
                                )}
                                               
                            </tbody>
                        </Table>
                        
                    </div>
                    </div>
                )
            }else{
            return(
            <div style = {{position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'}}>
                <h1>Items Are Loading ... </h1>
            </div>
            )
        }
    }
}


DashboardTeacher.defaultProps = {
    list : [],
}


const mapStatetoProps = (state) => {
    console.log(state)
    return {
        list: state.mainReducers.getClass.item,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        
        fetchList : () => dispatch(fetchListStudent()),
        
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(DashboardTeacher)
    

