import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import routePath from "../../../routers/routePath";

import AutomationDropdownButton from "./AutomationDropdownButton";

const AutomationButton = ({ title }) => {
    const history = useHistory();

    const renderButton = () => {

        if (history.location.pathname === routePath.reports) {
            return <AutomationDropdownButton title={title} options={[routePath.boardApprovedCourses]} history={history} />
        }
        if (history.location.pathname === routePath.manipulation) {
            return  <AutomationDropdownButton title={title} options={[routePath.updateCourseApplications, routePath.deleteCourseHistoryEntries]} history={history} />
        }

    }
    return renderButton();
}

AutomationButton.propTypes = {
    title: PropTypes.string,
};

AutomationButton.defaultProps = {
    title: ''
};

export default AutomationButton;
