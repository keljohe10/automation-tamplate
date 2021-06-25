import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CourseApprovedReport from "./courseApprovedReport/CourseApprovedReport";
import UpdateCourseApplications from "./updateCourseApplications/UpdateCourseApplications";

import routePath from "../../routers/routePath";

const MainContent = () => {
    
    return (
        <main className="eui-container">
            <Switch>
                <Route exact path={routePath.reports} component={CourseApprovedReport}></Route>
                <Route exact path={routePath.manipulation} component={UpdateCourseApplications}></Route>
                <Redirect to={routePath.reports} />
            </Switch>
        </main>
    )
}

export default MainContent;
