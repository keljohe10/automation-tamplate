import React from 'react';
import { Switch } from 'react-router-dom';
import MainContent from "../components/main/MainContent";
import AutomationRoute from "./AutomationRoute";


const AppRouter = () => {

  return (
      <>
        <Switch>
          <AutomationRoute
            path="/"
            component={MainContent}
          />
        </Switch>
      </>
   
  );
};

export default AppRouter;
