import React from 'react';
import {Col, DropdownButton, Dropdown} from 'react-bootstrap';

import './HeaderRow.css';

const HeaderRow = () => {
    return (
        <div className="header d-flex flex-row">
            <Col sm="auto" className='logo'>Signal</Col>
            <Col className="flex-grow-1">
                <span className="headerMenu">Restaurant Evaluation</span>
            </Col>
            <Col sm="auto" className="pr-0">
                <DropdownButton id="dropdown-basic-button" title="Stakeholders">
                    <Dropdown.Item href="#/action-1">Stakeholders</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Travelers</Dropdown.Item>
                </DropdownButton>
            </Col>
        </div>
    )
}

export default HeaderRow