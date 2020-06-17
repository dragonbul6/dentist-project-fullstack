import React from 'react'


const Knowledge = ({value,fn,disable}) => {
    return (
    <div>
        <h2>Knowledge Area</h2>
        {disable ? <input type='range' disabled min = "0" max = "10" value={value} /> : <input type='range' min = "0" max = "10" value={value} onChange={(e) => fn(e.target.value)}/>}
        <label>{value}</label>
    </div>
)
}

export default Knowledge