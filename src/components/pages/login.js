import React from 'react'
import { connect } from 'react-redux'
import {fetchItem} from '../../redux/actions/ac-main'
import {getAllpatient} from '../../redux/actions/ac-dashboard'
import {checkAuth} from '../../redux/actions/ac-login'
import '../styles/logi.css'


class login extends React.Component{

    constructor(){
        super()
        this.state = {status : false}
    }


   async login(e){
        e.preventDefault()
        let payload = {
            username : this.refs.username.value,
            password : this.refs.password.value
        }
        await this.props.Login(payload)
        await this.props.fetchAccount()
        await this.props.getAllpatient()
        this.props.history.push('/dashboard')
        
        
    }

    render(){
        return(
          
            <header className="App-header2">
            <div className="container2">
              <div className="card2">
              <img src="https://dentistry.mfu.ac.th/fileadmin/templatescenter/assets/img/dentistry/Header-School-Dentistry-MFU_Thai.png" width="100%" alt="" />
              <form>
              <input className="" type="text" placeholder="Username" name="uname" ref='username' required />
              <input className="" type="password"placeholder="Password" name="psw" ref='password' required />
              <button type="submit" onClick={(e)=>this.login(e)}>LOGIN</button>
              </form>
            </div>
            </div>
            </header>
     

        )
    }
}

const mapStatetoProps = (state) => {
    if(!state){
        return {
            token : []
        }
    }else{
        return {
            token : state.SetToken,
        }
    }
    
}

const mapDispatchtoProps = (dispatch) => {
    return {
        Login : (payload) => dispatch(checkAuth(payload)),
        fetchAccount : () => dispatch(fetchItem()),
        getAllpatient : () => dispatch(getAllpatient()),
        
        
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(login)