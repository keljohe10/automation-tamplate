import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'emerald-ui/lib/PageHeader';
import Button from 'emerald-ui/lib/Button';

import getHeaderLabel from "../../../utils/index";
import routePath from "../../../routers/routePath";

import "./styles.css";

const Header = ({ location }) => {
    let { title, button } = getHeaderLabel(location.pathname);

    return (
        <header>
            <PageHeader className="app-page-header-icon" />
            <PageHeader>
                <div className="app-header-nav">
                    <h2>{title}</h2>
                    <Button color='info'>
                        <span>{button}</span>
                    </Button>
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
