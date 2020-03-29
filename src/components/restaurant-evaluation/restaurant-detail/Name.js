import React, { Component } from 'react';
import { Col,Badge } from 'react-bootstrap';

import './Name.css';

const Name = (props) => {
    
    return (
        <div className="name">
            <span className="name_text">{props.name}</span>
            <Badge pill variant="primary">{props.performance}</Badge>
        </div>
    )
}

export default Name;