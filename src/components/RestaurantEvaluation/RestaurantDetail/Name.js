import React, { Component } from 'react';
import { Col,Badge } from 'react-bootstrap';

import './Name.css';

const Name = (props) => {
    
    return (
        <div className="name">
            {props.name}     
        </div>
    )
}

export default Name;