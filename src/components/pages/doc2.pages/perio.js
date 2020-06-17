import React from 'react'

import { Col,Nav, Form } from 'react-bootstrap'

import ToolbarTest from '../../items/Navbar/toolbarTest'
import '../../styles/perio.css'
import Recheck from '../../items/perioform/Recheck'
import ScandRp from '../../items/perioform/Scnrp'
import Charting from '../../items/perioform/Charting'
import Recall from '../../items/perioform/Recall'
import Rescaling from '../../items/perioform/Rescaling'
import Conduct from '../MainDoc1'
import {sendFormDoc1 as sendConduct} from '../../../redux/actions/ac-doc1'
import {GetDXbyHnandDocId} from '../../../redux/actions/ac.perio'

import Knowledge from '../../items/knowledge'

class Perio extends React.Component {

    constructor(){
        super()
        this.state={forms:[],conduct:false,conduct_data:[],knValue:5}
    }

    componentDidMount(){
        this.setState({forms:JSON.parse(sessionStorage.getItem('forms'))})
        GetDXbyHnandDocId(sessionStorage.getItem('student_id'),sessionStorage.getItem('HN'))
    }

    handleConduct = (payload) => {

        this.setState({conduct_data : payload})
        sendConduct(payload)
    }

    render() {
            return (
                <div className="backgroud">
                    <div>
                        <ToolbarTest />
                    </div>
                    <Conduct data = {(payload) => this.handleConduct(payload)} status = {(e) => this.setState({conduct : e})}/>
                    <div className="center">
                    <Knowledge value = {this.state.knValue.toString()} fn ={(res) => this.setState({knValue:Number(res)})}/>
                        <Form>
                            <Form.Row>
                                <Col sm={10}>
                                    {this.state.forms.includes('Rescaling') && 
                                    (<div className="c1" id="c0" >
                                        <Rescaling 
                                        interval={this.state.conduct_data.interval} 
                                        conduct = {this.state.conduct}
                                        kn={this.state.knValue} />
                                    </div>)}
                                    {this.state.forms.includes('Recheck') &&
                                    (<div className="c1" id="c1" >
                                        <Recheck 
                                        interval={this.state.conduct_data.interval}  
                                        conduct = {this.state.conduct} 
                                        kn={this.state.knValue}/>
                                    </div>)
                                    }
                                    <div className="c1"></div>
                                    <hr ></hr>
                                    {this.state.forms.includes('Charting') &&
                                    (<div className="c1" id="c2" >
                                        <Charting 
                                        interval={this.state.conduct_data.interval}  
                                        conduct = {this.state.conduct} 
                                        kn={this.state.knValue}/>
                                    </div>)}
                                    <div className="c1"></div>
                                    <hr ></hr>
                                    {this.state.forms.includes('Sc&rp') && 
                                    (<div className="c1" id="c3" >
                                        <ScandRp 
                                        interval={this.state.conduct_data.interval}  
                                        conduct = {this.state.conduct} 
                                        kn={this.state.knValue}/>
                                    </div>)}
                                    <div className="c1"></div>
                                    <hr ></hr>
                                    {this.state.forms.includes('Recall') && 
                                    (<div className="c1" id="c4" >
                                        <Recall 
                                        interval={this.state.conduct_data.interval}  
                                        conduct = {this.state.conduct} 
                                        kn={this.state.knValue}/>
                                    </div>)}
                                </Col>
                                <Col>
                                    <Nav class="position-fixed" className="flex-column">
                                        <Nav.Link href="#c0">Rescaling</Nav.Link>
                                        <Nav.Link href="#c1">Recheck</Nav.Link>
                                        <Nav.Link href="#c2">Charting</Nav.Link>
                                        <Nav.Link href="#c3">ScandRp</Nav.Link>
                                        <Nav.Link href="#c4">Recall</Nav.Link>
                                        <Nav.Link eventKey="disabled" disabled>
                                            Disabled
    </Nav.Link>
                                    </Nav>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
    
            )
        
    }
}


export default Perio