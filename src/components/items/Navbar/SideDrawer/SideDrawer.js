import React from 'react'
import './SideDrawer.css'
const SideDrawer=props=>{
    let drawerClasses='Side-Drawer';
    if(props.show){
        drawerClasses='Side-Drawer open';
    }
    return(
    <nav className={drawerClasses}>
        <ul>
            <li><a href="/">Product</a></li>
            <li><a href="/">Owner</a></li>
        </ul>
    </nav>)
};
export default SideDrawer;