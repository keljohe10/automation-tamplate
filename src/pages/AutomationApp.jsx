import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from 'emerald-ui/lib/Container';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';

import Navbar from "../components/common/navbar/Navbar";
import AppRouter from "../routers/AppRouter";

import './styles/styles.css';

const AutomationApp = () => {
    return (
        <Router>
            <Container fluid={true}>
                <Row>
                    <Col xs={2} className="sample-col app-row-col app-col-navbar">
                        <Navbar />
                    </Col>
                    <Col xs={10} className="sample-col app-row-col">
                        <AppRouter />
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default AutomationApp;
