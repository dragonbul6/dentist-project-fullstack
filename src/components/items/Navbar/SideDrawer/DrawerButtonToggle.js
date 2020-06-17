import React from 'react';
import './DrawerButtonToggle.css';
const DrawerToggleButton =props=>(
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button_line"></div>
        <div className="toggle-button_line"></div>
        <div className="toggle-button_line"></div>
    </button>
);
export default DrawerToggleButton;