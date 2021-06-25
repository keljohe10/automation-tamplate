import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from "../components/common/header/Header";


const AutomationRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header {...rest} />
      <Route
        {...rest}
        component={(props) =>
          <Component {...props} />
        }
      />
    </>
  );
};

AutomationRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

AutomationRoute.defaultProps = {
  component: () => { }
};

export default AutomationRoute;
