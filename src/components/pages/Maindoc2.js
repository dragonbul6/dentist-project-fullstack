import React from 'react'
import OM from './doc2.pages/OM'
import Perio from './doc2.pages/perio'
import TLA from './doc2.pages/TLA'



export default class Maindoc2 extends React.Component{


    convertStringtoId(id){
        switch (id) {
            case "OM":
                return 1
                break;
            case "Perio":
                return 2
                break
            case "omPre":
                return 3 
                break 
            case "TLA1A":
                return 4
                break  
            case "TLA1L":
                return 5
                break
            case "TLA2":
                return 6
                break        
            default:
                break;
        }
    }

    renderForm(){
        let id = this.convertStringtoId(sessionStorage.getItem('currentSubject'))
        let answer = JSON.parse(sessionStorage.getItem('answers'))
        let perioItems = JSON.parse(sessionStorage.getItem('perioItems'))
           if(id == 1){
            return (<OM/>)
           }
            else if(id == 2){
                return (<Perio />)
            }else if(id == 3){
                return(<OM answer={answer}/>)
            }else if(id == 4){
                return(<TLA talkcase = {false} name="Assistence"/>)
            }else if(id == 5){
                return(<TLA talkcase = {false} name="Laboratory" />)
            }else if(id == 6){
                return(<TLA talkcase = {true} name = "Talk Case"/>)
            }
            else{
                return (<div style = {{position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'}}>
                            <h1>น่าจะเข้าให้ถูกต้องนะครับแบบนี้... </h1>
                        </div>) 
            }   


       
    }
    
    
    render(){ 
            return(this.renderForm())
    }
}