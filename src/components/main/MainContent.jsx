import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CourseApprovedReport from "./courseApprovedReport/CourseApprovedReport";
import UpdateCourseApplications from "./updateCourseApplications/UpdateCourseApplications";
import SummaryReport from "./courseApprovedReport/SummaryReport";
import SummaryManipulations from './updateCourseApplications/SummaryManipulations';
import DeleteCourseHistoryEntries from "./updateCourseApplications/DeleteCourseHistoryEntries";

import routePath from "../../routers/routePath";

const MainContent = () => {
    
    return (
        <main className="eui-container">
            <Switch>
                <Route exact path={routePath.reports} component={SummaryReport}></Route>
                <Route exact path={routePath.manipulation} component={SummaryManipulations}></Route>
                <Route exact path={routePath.boardApprovedCourses} component={CourseApprovedReport}></Route>
                <Route exact path={routePath.updateCourseApplications} component={UpdateCourseApplications}></Route>
                <Route exact path={routePath.deleteCourseHistoryEntries} component={DeleteCourseHistoryEntries}></Route>
                <Redirect to={routePath.reports} />
            </Switch>
        </main>
    )
}

export default MainContent;
