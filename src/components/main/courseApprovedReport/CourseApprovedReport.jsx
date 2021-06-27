import React, { useEffect, useState } from 'react'
import SearchableSelect from 'emerald-ui/lib/SearchableSelect';
import Button from 'emerald-ui/lib/Button';
import Icon from 'emerald-ui/lib/Icon';
import DatePicker from 'emerald-ui/lib/DatePicker';
import Toggle from 'emerald-ui/lib/Toggle';
import MultipleSelect from 'emerald-ui/lib/MultipleSelect';
import TextField from 'emerald-ui/lib/TextField';

import { getBoards, scheduleTask } from "../../../api/request";

import swal from 'sweetalert';

import "./styles/styles.css";

const CourseApprovedReport = () => {

    const mock = {
        "type": "GENERATE_COURSES_BOARD",
        "startReportAt": "12/02/2020",
        "endReportAt": "01/02/2021",
        "boardId": 18,
        "blackList": [2405, 2432],
        "notificationFTP": false,
        "sendEmailNotification": false,
        "routedApps": false,
        "comment": "hello world"
    }

    const [boards, setBoards] = useState([]);
    const [boardSelected, setBoardSelected] = useState({});
    const [showError, setShowError] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false)
    const helpMessage = `Please select a board`;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let queryString = `query{
                    boards{
                      id 
                      basic_data{
                        name
                        code
                        in_status
                      }
                    }
                  }`;
                let data = await getBoards(queryString);
                data = data.boards.filter(board => board.basic_data.in_status === 1);
                setBoards(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const onSelectBoard = item => {

        let boardFound = boards.find(board => board.id === item);
        setBoardSelected(boardFound);
        setShowError(false);
    };

    const scheduleReport = async (e) => {
        e.preventDefault();

        if (Object.keys(boardSelected).length === 0) {
            setShowError(true);
            return false;
        }

        try {
            setButtonStatus(true);
            await scheduleTask(mock);
            setButtonStatus(false);
            swal(
                'Successful!',
                'The process was successfully scheduled!',
                'success'
            );
        } catch (error) {
            setButtonStatus(false);
            console.error(error);
            swal('Error!', 'fail process', 'error');
        }


    }

    const handleCreate = () => {
        console.log('create')
    }
    return (
        <form onSubmit={scheduleReport} className="app-form">
            <div>
                <SearchableSelect
                    label="Board"
                    id="boardSearch"
                    errorMessage={showError ? helpMessage : ''}
                    className="app-search-select"
                    helpText="Select Board"
                    placeholder="Search"
                    onSelect={onSelectBoard}
                >
                    {boards.map(board => (
                        <option
                            key={board.id}
                            value={board.id}
                            selected={
                                boardSelected ? boardSelected.id === board.id : false}
                        >
                            {board.basic_data.name}
                        </option>
                    ))}
                </SearchableSelect>
            </div>

            <div>
                <DatePicker ariaLabel="Initial date" className="app-datapicker" label="Start date" />
                <DatePicker ariaLabel="Final date" className="app-datapicker" label="End date" />
            </div>

            <div>
                <MultipleSelect label="Provider blacklist" id="s1" onCreate={handleCreate} className="app-multiselect" />
            </div>


            <div className="app-toggle">
                <Toggle label="toggle" />
                <span className="app-label-toggle">Routed to Committee prior to approval</span>
            </div>

            <div className="app-textarea">
                <TextField label="Comment" textarea={true} />
            </div>

            <div className="app-button-report">
                <Button type="submit" color="info" loading={buttonStatus} disabled={buttonStatus}>
                    <Icon name="cloud" />
                    <span>Generate report</span>
                </Button>
            </div>

        </form>
    )
}

export default CourseApprovedReport;



