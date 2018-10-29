import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class RenderBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }
    }

render(){
    return(
        <>
                <p>{this.props.value}</p>
        </>
    )
}
}

export default RenderBody;