import React from 'react'
import {fetchList,getAllpatient} from '../../redux/actions/ac-dashboard'
import {fetchItem} from '../../redux/actions/ac-main'
import {getOM} from '../../redux/actions/ac-doc2'
import {detailPerio} from '../../redux/actions/ac.perio'
import {connect} from 'react-redux'
import {Table,Button,Badge} from 'react-bootstrap'
import ToolbarTest from '../items/Navbar/toolbarTest'
import ModalPatient from '../items/PatientModal'
import ModalSubject from '../items/SubjectModal'
import ModalDetail from '../items/DetailModal'

import Dashboard_Teacher from '../pages/dashboardTeacher'


class Dashboard extends React.Component{
    
    constructor(){
        super()
        this.state = {loaded : false,show:false,patient:null,name:'',showSubject:false,max:0,showDetail:false}
        this.state = {teacher:false}
        
    }

     async componentDidMount(){
        if(localStorage.getItem('token') === null){
            this.props.history.push('/login')
        }
        
        await this.props.getAllpatient()
        await this.props.fetchAccount()
        await this.props.fetchList(sessionStorage.getItem('student_id'))
        

        if(sessionStorage.getItem('student_id') === 'null'){
            this.setState({teacher : true})
            
        }
        
        sessionStorage.removeItem('conduct')
        sessionStorage.removeItem('HN')
        sessionStorage.removeItem('TN')
        sessionStorage.removeItem('PN')
        sessionStorage.removeItem('OM')
        sessionStorage.removeItem('interval')
        sessionStorage.removeItem('currentSubject')
        sessionStorage.removeItem('answers')
        sessionStorage.removeItem('perio')
        sessionStorage.removeItem('perioDash')
        sessionStorage.removeItem('perioItems')
        sessionStorage.removeItem('forms')

        let reload = false

        
        if(reload){
            window.location.reload()
        }
        
        
        this.setState({loaded:true})
    }

    renderButton(pn,hn){    
        
            return (<div><Button variant="warning" 
            onClick={()=>{
                this.setState({showSubject : true})
                sessionStorage.setItem('PN',pn)
                sessionStorage.setItem('HN',hn)
            }
            }><p style={{color:'white'}}>ทำแบบฟอร์ม</p></Button>
            &nbsp;
            <Button variant="warning" onClick={()=>{
                getOM(hn) 
                sessionStorage.setItem('HN',hn)
                setTimeout(() => {
                    this.setState({showDetail:true})
                }, 100);   
            }}><p style={{color:'white'}}>ดูรายละเอียด</p></Button>
                </div>)
        
    }

    render(){
        if(this.state.loaded){
            if(this.state.teacher){
                return(<Dashboard_Teacher />)
            }else{
                return(
                    <div>
                    <div>
                        <ToolbarTest name={this.state.name} />
                    </div>
                    <div style={{paddingTop:100}}>
                    {this.state.show && <ModalPatient status = {this.state.show} 
                    fncallback={(value,status) => {
                        if(value){
                            this.setState({show : false})
                            
                        }else if(status){
                            window.location.reload()
                        }
                    }} 
                    temp = {this.props.DailyPatient}
                    />}
                    {this.state.showSubject && <ModalSubject status = {this.state.showSubject} 
                    fncallback={(value) => value && this.setState({showSubject:false})}/>}
                    {this.state.showDetail && <ModalDetail show ={this.state.showDetail} fncallback = {(unshow) => this.setState({showDetail:unshow})} />}
                        
                        <div className='row text-center'>
                        <div class='col-1'></div>
                        <div class='col-5'>   
                        <Button variant="danger" size="lg" style={{marginTop : 15,marginBottom:15,marginLeft:'auto',marginRight:'auto'}} onClick={() => this.setState({show : true})} block responsive>เพิ่มผู้ป่วย</Button>
                        </div>
                        <div class='col-5'>   
                        <Button variant="danger" size="lg" style={{marginTop : 15,marginBottom:15,marginLeft:'auto',marginRight:'auto'}} onClick={() => this.props.history.push('/dashboard')} block responsive>สถิติ</Button>
                        </div>
                        </div>
                            <Table striped bordered hover size="sm" class='container col-8' style={{marginLeft:'auto',marginRight:'auto'}}>
                            <thead class="thead-light">
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รหัสผู้ป่วย</th>
                                    <th>ชื่อและนามสกุลผู้ป่วย</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.list.map((item) => (
                                     <tr>
                                     <td>{Number(item.id) == Number(sessionStorage.getItem('max')) ? (<Badge variant='danger'>{item.id} ล่าสุด</Badge>): <Badge variant='dark'>{item.id}</Badge>}</td>
                                     <td>{item.HN}</td>
                                     <td>{item.forename} {item.surname}</td>
                                     <td>{this.renderButton(item.forename+" "+item.surname,item.HN)}</td>
                                     </tr> 
                                )
                                )}
                                               
                            </tbody>
                        </Table>
                        
                    </div>
                    </div>
                )
            }
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


Dashboard.defaultProps = {
    list : [],
    DailyPatient:[],
    account : []
}


const mapStatetoProps = (state) => {
    return {
        list: state.mainReducers.getClass.item,
        DailyPatient : state.mainReducers.setCode.item,
        account : state.mainReducers.getPersonInfo.item
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchList : (id) => dispatch(fetchList(id)),
        getAllpatient : () => dispatch(getAllpatient()),
        fetchAccount: () => dispatch(fetchItem())
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps)(Dashboard)
    

