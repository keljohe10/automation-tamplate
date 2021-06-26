import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'emerald-ui/lib/DropdownButton';
import DropdownItem from 'emerald-ui/lib/DropdownItem';
import getHeaderLabel from "../../../utils/index";


const AutomationDropdownButton = ({ title, options, history }) => {
    const redirectReportPage = (key) => {
        history.push(key);
    }
    return (
        <>
            <DropdownButton title={title} color='info' className='app-header-button'>
                {options.map(option => 
                    <DropdownItem key={option} eventKey={option} onSelect={redirectReportPage}>{getHeaderLabel(option).title}</DropdownItem>
                )}
            </DropdownButton>
        </>
    )
}

AutomationDropdownButton.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
    history: PropTypes.object
};

AutomationDropdownButton.defaultProps = {
    title: '',
    options: [],
    history: {}

};

export default AutomationDropdownButton;
