import React from 'react';
import {Col} from 'react-bootstrap';

import './HeaderRow.css';

const HeaderRow = () => {
    return (
        <div className="header d-flex flex-row">
            <Col sm="auto" className='logo'>Signal</Col>
            <Col className="flex-grow-1">Restaurant Evaluation</Col>
            <Col sm="auto">Stakeholders</Col>
        </div>
    )
}

export default HeaderRow