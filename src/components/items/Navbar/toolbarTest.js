import React, { Component } from 'react'
import Toobar from '../Navbar/toolbar/Toolbar'
import SideDrawer from '../Navbar/SideDrawer/SideDrawer'
import BackDrop from '../Navbar/Backdrop/BackDrop.js'
import '../Navbar/toolbarTest.css'
export default class toolbarTest extends Component {
    state={
        sideDrawerOpen:false
    };
    drawerToggleClickHandler=()=>{
        this.setState((prevState)=>{
            return{sideDrawerOpen:!prevState.sideDrawerOpen};
        });
    };
    backdropClickHandler=()=>{
        this.setState({sideDrawerOpen:false})
    };
    render() {
        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop=<BackDrop click={this.backdropClickHandler}/>
        }
        return (
            <div className='vert-align'>
                <Toobar drawerClickHandler={this.drawerToggleClickHandler} name={this.props.name}/>
                        <SideDrawer show={this.state.sideDrawerOpen}/>
                        {backdrop}
            </div>
           
        )
    }
}
