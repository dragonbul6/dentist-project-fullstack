import React from 'react'

import Rescalling from '../items/perioform/preview/rescallPreview'
import Recheck from '../items/perioform/preview/recheckPreview'
import Recall from '../items/perioform/preview/recallPreview'
import Charting from '../items/perioform/preview/chartingPreview'

import {getTNbyConductId} from '../../redux/actions/ac.perio'
import ScnRp from '../items/perioform/preview/scnrpPreview'


export default class Perio_Center extends React.Component{

    constructor(){
        super()
        this.state = {items : []}
    }


    componentDidMount(){
        let perioItems = this.props.location.state.items
        let conductId = this.props.location.state.conduct_id
        getTNbyConductId(conductId)
        this.setState({items : perioItems})
    }

    renderForm(){
        let name = sessionStorage.getItem('currentSubject')
        

        if(name === 'Rescalling'){
            return(<Rescalling items={this.props.location.state.items}/>)
        }else if(name === 'Recheck'){
            return (<Recheck items={this.props.location.state.items}/>)
        }else if(name === 'Recall'){
            return (<Recall items={this.props.location.state.items} />)
        }else if(name === 'Charting'){
            return (<Charting items={this.props.location.state.items} />)
        }else if(name === 'ScnRp'){
            return (<ScnRp items={this.props.location.state.items}></ScnRp>)
        }
        
    }
    
    
    render(){ 
            return(this.renderForm())
    }
}