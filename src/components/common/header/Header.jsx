import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'emerald-ui/lib/PageHeader';
import routePath from "../../../routers/routePath";
import getHeaderLabel from "../../../utils/index";
import AutomationButton from "../buttons/AutomationButton";

import { AuthContext } from '../../../auth/AuthContext';

import "./styles.css";

const Header = ({ location }) => {
    let { title, button } = getHeaderLabel(location.pathname);
    const { auth } = useContext(AuthContext);

    return (
        <header>
            <PageHeader className="app-page-header-icon" />
            <PageHeader>
                <div className="app-header-nav">
                    <h2>{title}</h2>
                    {(button.display && auth.isAutorizedToViewPage) && (
                        <AutomationButton title={button.title} />
                    )}
                </div>
            </PageHeader>
        </header>
    )
}

Header.propTypes = {
    location: PropTypes.object.isRequired,
};

Header.defaultProps = {
    location: {
        pathname: routePath.reports
    },
};

export default Header;
