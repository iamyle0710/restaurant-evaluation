import React, { Component } from 'react';

import './Legend.css';

class Legend extends Component {

    renderTypes(){
        const rst = this.props.types.map((type) => {
            return (
                <div className="legendRow" key={type.name}>
                    <span className={"legendCircle " + type.name.toLowerCase()}></span>
                    <span>{type.name}</span>
                </div>
            )
        });
        return rst;
    }
    render(){
        return (
            <div className="legendContainer">
                <span className="legendTitle">{this.props.title}</span>
                {this.renderTypes()}
            </div>
        )
    }
}

export default Legend;