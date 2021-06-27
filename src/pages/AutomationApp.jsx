import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from 'emerald-ui/lib/Container';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import Spinner from 'emerald-ui/lib/Spinner';

import Navbar from "../components/common/navbar/Navbar";
import AppRouter from "../routers/AppRouter";
import NotFound from "./AccessDenied";

import { isUserAuthorized } from "../api/request";

import { AuthContext } from '../auth/AuthContext';

import './styles/styles.css';

const AutomationApp = () => {
    const [auth, setAuth] = useState({ isHelpdeskRole: false, isAutorizedToViewPage: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let authorized = await isUserAuthorized();
                setAuth({ isHelpdeskRole: authorized.isHelpdeskRole, isAutorizedToViewPage: authorized.isAutorizedToViewPage });
                setLoading(false);
            } catch (error) {
                if(error.response.status == 401) {
                    setAuth({ isHelpdeskRole: false, isAutorizedToViewPage: false });
                    setLoading(false);
                } 
                console.error(error);
                
            }
        };
        fetchData();
    }, [setAuth]);

    const renderPage = (authAutomation) => {
        if (authAutomation) {
            return (
                <>
                    <AuthContext.Provider value={{ auth }}>
                        <Router>
                            <Container fluid={true} className="animated faster fadeIn">
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
                    </AuthContext.Provider>
                </>
            )
        } else {
            return (
                <NotFound />
            )

        }
    }

    if (loading) {
        return (
            <div className="app-loading">
                <Spinner size="md" color="info" />
            </div>
        );
    } else {
        return renderPage(auth.isHelpdeskRole);
    }

}

export default AutomationApp;
