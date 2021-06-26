import routePath from "../routers/routePath";

const getHeaderLabel = (pathname) =>{
    let title = null;
    let button = {};
    switch (pathname) {
        case routePath.manipulation:
            title = 'Manipulations';
            button = { title: '+ New manipulation', display: true}
            break;
        case routePath.reports:
            title = 'Reports';
            button =  { title: '+ New report', display: true}
            break;
        case routePath.boardApprovedCourses:
            title = 'Board approved courses'
            button =  { title: null, display: false}
            break;
        case routePath.updateCourseApplications:
            title = 'Update course applications'
            button =  { title: null, display: false}
            break;
        case routePath.deleteCourseHistoryEntries:
            title = 'Delete course history entries'
            button =  { title: null, display: false}
            break;
        default:
            break;
    }
    return {
        title,
        button
    };
}

export default getHeaderLabel;