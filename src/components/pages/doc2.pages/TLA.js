import React from 'react'
import Conduct from '../MainDoc1'
import Knowledge from '../../items/knowledge'
import {sendFormDoc1 as sendConduct,sendTLA} from '../../../redux/actions/ac-doc1'
import ToolbarTest from '../../items/Navbar/toolbarTest'

class TLA extends React.Component{
    
    constructor(){
        super()
        this.state = {knValue:5,conduct:false,conduct_data:[],talkcase:false}
    }

    componentDidMount(){
        this.setState({talkcase : this.props.talkcase})
    }

    handleConduct = (payload) => {

        this.setState({conduct_data : payload})
        sendConduct(payload)  
        if(this.state.talkcase){
            setTimeout(()=>sendTLA(this.state.knValue),200)
        }else{
            setTimeout(()=>sendTLA(0),200)
        }
 
    }

    render(){
        return(
            <div>
                <div>
                    <ToolbarTest />
                </div>
                <div style={{marginTop:100}}>
        <h1>{this.props.name}</h1>
               {this.state.talkcase && <Knowledge value = {this.state.knValue.toString()} fn ={(res) => this.setState({knValue:Number(res)})}/>} 
                <Conduct data = {(payload) => this.handleConduct(payload)} status = {(e) => this.setState({conduct : e})}/>

                </div>
            </div>
        )
    }


}

export default TLA