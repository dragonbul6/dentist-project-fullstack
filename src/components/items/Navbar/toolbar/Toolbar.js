import React from 'react';
import './Toolbar.css';
import { Button} from 'react-bootstrap'
import DrawerButtonToggle from '../SideDrawer/DrawerButtonToggle'
import {connect} from 'react-redux'
import {fetchItem} from '../../../../redux/actions/ac-main'




class toobar extends React.Component{
    
    constructor(){
        super()
        this.state = {loaded : false}
    }
    async componentDidMount(){
        await this.props.fetchList()
        this.setState({loaded : true})
    }

    logout(e){
        e.preventDefault()
        localStorage.clear()
        sessionStorage.clear()
        document.location.href = '/login'
    }

    render(){
        if(this.state.loaded){
        let Account = this.props.account
        return(
                <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle-button">
                    <DrawerButtonToggle click={this.props.drawerClickHandler}/>
                    </div>
                    <div   className="toolbar_logo"><a href="/"><img src="https://dentistry.mfu.ac.th/fileadmin/templatescenter/assets/img/dentistry/Header-School-Dentistry-MFU_Thai.png" width="80%" alt="" /></a></div>
                    <div className="spacer"/>
                                        <div className="text2">  
                                            ชื่อผู้ใช้ : {Account.forename} {Account.surname} &nbsp;                                     
                                        </div>
                                        <Button variant="danger" onClick={(e) => this.logout(e)}>ออก</Button>          
                                    
                </nav>
            </header>
            )
        }else{
            return(null)
        }
        }
        
    }

    toobar.defaultProps = {
        account:[]
    }

    const StatetoProps = (state) => {
        return {
            account : state.mainReducers.getPersonInfo.item
        }
    }

    const DispatchtoProp = (dispatch) => {
        return {
            fetchList : () => dispatch(fetchItem()),
        }
    }



export default connect(StatetoProps,DispatchtoProp)(toobar);