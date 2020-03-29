import React, { Component } from 'react';

import './Performance.css';

class Performance extends Component {
    
    render(){
        return (
            <div className="performance">
                {this.props.performance}
            </div>
        )
    }
}

export default Performance;