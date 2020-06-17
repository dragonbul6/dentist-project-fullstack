import React, { Component } from 'react'
import './modal.css'
export default class modal extends Component {
    render() {
        return (
            <div>
                <input type="checkbox" id="toggle"/>
                    <label for="toggle">Open Overlay</label>
                        <dialog >
                                <p>      
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Ipsa nihil dolore similique quis qui ad blanditiis ex eum! Enim
                                    maiores ipsam fugiat officiis earum distinctio natus reprehenderit
                                    aliquam est iusto!
                                </p>                    
                                <label for="toggle">close overlay</label>
                        </dialog>
            </div>
        )
    }
}
