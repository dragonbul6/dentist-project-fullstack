import _ from 'lodash'
import React from 'react'
import { Search, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const initialState = {isLoading : false, result : [],value:''}
const State = {item : []}
export default class Dropdown extends React.Component{
    state = initialState
    
    componentDidMount(){
        var request = new Request('http://localhost:3000/api/teachers')
        fetch(request).then((res) => res.json())
        .then((res) => {
            this.prepareforDrop(res)
        })
    }

    prepareforDrop(json){
        var newJson = []
        json.map((items,key)=>{
            newJson.push({title:items.forename,surname:items.surname,image:'https://vignette.wikia.nocookie.net/iz-one/images/8/81/SakuraBuenosAriesPromo.jpg'})
        })
        State.item = newJson
    }
    
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title + " " + result.surname})
        this.props.data(result.title + " " + result.surname)
    }
        

    searchChange = (e,{ value }) => {
        this.setState({isLoading:true,value})

        setTimeout(() => {
            if(this.state.value.length < 1){
                return this.setState(initialState)
            }

            const re = new RegExp(_.escapeRegExp(this.state.value),'i')
            const isMatch = result => re.test(result.title)
            this.setState({
                isLoading: false,
                results: _.filter(State.item, isMatch),
              })
        },300)
    }

    render(){
        const {isLoading,value,results} = this.state
        return(
            
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.searchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              {...this.props}
              size='small'
            />
         
        )
    }
}  