import routePath from "../routers/routePath";

const getHeaderLabel = (pathname) =>{
    let title, button
    switch (pathname) {
        case routePath.manipulation:
            title = 'Manipulations';
            button = '+ New manipulation'
            break;
        case routePath.reports:
            title = 'Reports';
            button = '+ New report'
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