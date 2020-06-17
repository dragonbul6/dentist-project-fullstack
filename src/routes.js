import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import login from './components/pages/login'
import dashboard from './components/pages/dashboard'
import Maindoc2 from './components/pages/Maindoc2'
import List from './components/pages/listofForm'
import Maindoc1 from './components/pages/MainDoc1'
import PreviewDoc1 from './components/items/doc1_component/Doc1Preview'
import DashboardPerio from './components/pages/periodashboard'
import DashbPerio from './components/pages/perioformCenter'
import Main from './components/pages/main'
export default function AppRouter(){
    return (
        <Router>
        <Switch>
            <Route path="/" exact component={dashboard} />
            <Route path="/dashboard" component = {Main} />
            <Route path="/login" component = {login}/>
            <Route path ="/doc1/" component = {Maindoc1} />
            <Route path='/previewDoc1' component = {PreviewDoc1} />
            <Route path='/Periodetail' component = {DashboardPerio} />
            <Route path='/previewPerio' component = {DashbPerio} />
            <Route path="/doc2/" component = {Maindoc2} />
            <Route path ='/list/' component = {List} />
        </Switch>
        </Router>
    )
}
