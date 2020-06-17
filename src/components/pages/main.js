import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Button,Table,Card} from 'react-bootstrap'
import {fetchItem} from '../../redux/actions/ac-main'
import {getConductbyDocId,getAmountofPerio} from '../../redux/actions/ac-doc1'
import ToolbarTest from '../items/Navbar/toolbarTest'

const CardStaticConduct = ({props}) => (
                    <Card bg="success" text="white" 
                    style={{ width: '25rem' , margin:10 , marginLeft:'auto',marginRight:'auto'}}>
                    <Card.Body>
                    <Card.Title>สถิติ Conduct</Card.Title>
                    <Card.Text>
                        จำนวนครั้ง : {props} <br></br>
                        <hr></hr>
                        คะแนน : {(20-(Number(sessionStorage.getItem('count'))*0.2)).toFixed(2)}% <br></br>
                    </Card.Text>
                    </Card.Body>
                    </Card>
)

const CardPerio = ({props}) => (
                <Card bg="light" text="black" 
                    style={{ width: '40rem' , margin:10 , marginLeft:'auto',marginRight:'auto'}}>
                    <Card.Body>
                    <Card.Title>สถิติ Perio</Card.Title>
                    <Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="row">Charting</th>
                                    <th  scope="row">Sc&RP</th>
                                    <th  scope="row">Rescalling</th>
                                    <th  scope="row">Recheck</th>
                                    <th  scope="row">Recall</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {props && (
                                <tr>
                                <td>{props[0].count}</td>
                                <td>{props[4].count}</td>
                                <td>{props[1].count}</td>
                                <td>{props[3].count}</td>
                                <td>{props[2].count}</td>
                                </tr>)}
                                
                                
                            </tbody>
                        </Table>
                    </Card.Text>
                    </Card.Body>
                    </Card>
)



class main extends Component{

    constructor(){
        super()
        this.state = {loaded:false,start:0,stop:5}
    }

    async componentDidMount(){
        if(localStorage.getItem('token') === null){
            this.props.history.push('/login')
        }
        await this.props.fetchAccount()
        this.props.fetchAmountPerio(sessionStorage.getItem('student_id'))
        this.props.fetchConduct(sessionStorage.getItem('student_id'))
        this.setState({loaded : true})
    }



   renderscoreFromAnswer = (answer) =>{     
        
    if(answer){
        let countsec1 = answer.sec1.filter((i) => i == 3).length
        let countsec2 = answer.sec2.filter((i) => i == 3).length
        let countsec3 = answer.sec3.filter((i) => i == 3).length
        let countsec4 = answer.sec4.filter((i) => i == 3).length
        let countsec5 = answer.sec5.filter((i) => i == 3).length
        let count = countsec1+countsec2+countsec3+countsec4+countsec5
        return (count * 0.2).toFixed(2)
    }else{
        return 0
    }
        
    }

    render(){
        let {start,stop} = this.state
        return(
        <div>
            <div><ToolbarTest /></div>
                <div style={{paddingTop:100}}>
                    <div class='row'>
                        <div class = 'col-12'>
                        {this.state.loaded && <CardStaticConduct props = {this.props.conducts.length} />}
                        </div>
                        </div>
                        <div class = 'row'>
                            <div class='col-12 text-center'>
                            <Button onClick={()=>this.setState({start : 0,stop : 5})}>ต่ำกว่า5</Button>
                            <Button onClick={()=>this.setState({start : 5,stop : 10})}>มากกว่า5</Button>
                            <Button onClick={()=>this.setState({start : 10,stop : 20})}>ดูมากกว่า10</Button>
                            <Button onClick={()=>this.setState({start : 20,stop : 30})}>ดูมากกว่า20</Button>
                            </div>
                        </div>
                <Table className='col-8' style={{marginLeft:'auto',marginRight:'auto'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>ลำดับล่าสุด</th>
                            <th>ผู้ป่วย</th>
                            <th>อาจารย์</th>
                            <th>คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded ? this.props.conducts.slice(start,stop).map((item,i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.HN}</td>
                                <td>{item.TN}</td>
                                <td>- {this.renderscoreFromAnswer(item.answer)}%</td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
               
                <div class='col-12'>
                    {this.state.loaded && <CardPerio props = {this.props.counts}/>}
                </div>
                <div className='col-md-12 text-center'>
                <Button class = 'col-12' onClick={()=>this.props.history.push('/')}>ทำแบบฟอร์ม</Button>
                </div>
                
                </div>
        </div>)
    }

       
}

main.defaultProps = {
    account : [],
    conducts : []
}


const mapStatetoProps = (state) => {
  
    return {
        account : state.mainReducers.getPersonInfo.item,
        conducts : state.mainReducers.getClass.item,
        counts : state.mainReducers.setCode.item
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchAccount: () => dispatch(fetchItem()),
        fetchConduct : (id) => dispatch(getConductbyDocId(id)),
        fetchAmountPerio : (id) => dispatch(getAmountofPerio(id))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(main)