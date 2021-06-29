import React, { useEffect, useState } from 'react'
import SearchableSelect from 'emerald-ui/lib/SearchableSelect';
import Button from 'emerald-ui/lib/Button';
import Icon from 'emerald-ui/lib/Icon';
import DatePicker from 'emerald-ui/lib/DatePicker';
import Toggle from 'emerald-ui/lib/Toggle';
import MultipleSelect from 'emerald-ui/lib/MultipleSelect';
import TextField from 'emerald-ui/lib/TextField';

import { getBoards, scheduleTask } from "../../../api/request";
import { isAlfanumericValue } from "../../../utils/index";

import swal from 'sweetalert';
import moment from 'moment-timezone';


import useForm from "../../../hooks/userForm";

import "./styles/styles.css";

const { REACT_APP_TIME_ZONE = 'America/New_York' } = process.env;

const CourseApprovedReport = () => {

    const [stateForm, handleChangeInput, handleChangeInputChecked, handleChangeInputDate] = useForm({
        type: 'GENERATE_COURSES_BOARD',
        boardSelected: {},
        comment: '',
        routeApp: false,
        providerBlackList: [],
        startDate: null,
        endDate: null
    });

    const [boards, setBoards] = useState([]);
    const [showError, setShowError] = useState(false);
    const [showErrorComment, setShowErrorComment] = useState(false);
    const [showErrorDateStart, setShowErrorDateStart] = useState(false);
    const [showErrorDateEnd, setShowErrorDateEnd] = useState(false);
    const [showErrorBlackList, setShowErrorBlackList] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false)
    const helpMessage = `Please insert a value`;

    const { boardSelected, comment, routeApp, providerBlackList, startDate, endDate } = stateForm;

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


    const validateInput = () => {
        let isValidateInput = [];
        if (Object.keys(boardSelected).length === 0) {
            setShowError(true);
            isValidateInput = [...isValidateInput, { field: 'boardSelected', validInput: false }]
        }
        if (!comment) {
            setShowErrorComment(true);
            isValidateInput = [...isValidateInput, { field: 'comment', validInput: false }]
        }

        if (!startDate) {
            setShowErrorDateStart(true)
            isValidateInput = [...isValidateInput, { field: 'startDate', validInput: false }]
        }
        if (!endDate) {
            setShowErrorDateEnd(true);
            isValidateInput = [...isValidateInput, { field: 'endDate', validInput: false }]
        }

        if (providerBlackList.length > 0) {
            let existInvalidValue = providerBlackList.some(provider => isAlfanumericValue(provider));
            setShowErrorBlackList(existInvalidValue);
            isValidateInput = [...isValidateInput, { field: 'providerBlackList', validInput: !existInvalidValue }]
        }

        return isValidateInput.length > 0 && isValidateInput.some(error => !error.validInput);

    }

    const onSelectBoard = item => {

        let boardFound = boards.find(board => board.id === item);
        let data = {
            target: {
                name: 'boardSelected',
                value: boardFound
            }
        }
        handleChangeInput(data);
        setShowError(false);
    };

    const onSelectProviders = (providers) => {
        setShowErrorBlackList(false);
        let dataProvidersBlacklist = providers.map(provider => +provider.value);

        let data = {
            target: {
                name: 'providerBlackList',
                value: dataProvidersBlacklist
            }
        }
        handleChangeInput(data);

    }
    const handleTextField = (e) => {
        setShowErrorComment(false);
        handleChangeInput(e);
    }

    const handleDate = (name, date) => {
        name === 'startDate' ? setShowErrorDateStart(false) : setShowErrorDateEnd(false);
        handleChangeInputDate(name, date)
    }

    const scheduleReport = async (e) => {
        e.preventDefault();

        if (validateInput()) return false;

        try {
            setButtonStatus(true);
            let scheduleData = {
                type: "GENERATE_COURSES_BOARD",
                startReportAt: moment(startDate).tz(REACT_APP_TIME_ZONE).format('MM/DD/YYYY'),
                endReportAt: moment(endDate).tz(REACT_APP_TIME_ZONE).format('MM/DD/YYYY'),
                boardId: boardSelected.id,
                ...(providerBlackList.length > 0 && { blackList: providerBlackList }),
                notificationFTP: true,
                sendEmailNotification: false,
                routedApps: routeApp,
                comment

            }
            const { data } = await scheduleTask(scheduleData);
            setButtonStatus(false);
            swal(
                'Successful!',
                `TrackingId: ${data.uuid}`,
                'success'
            );


        } catch (error) {
            setButtonStatus(false);
            swal('Error!', 'An unexpected error has occurred trying to schedule the report.', 'error');
        }
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
                <DatePicker
                    ariaLabel="Initial date"
                    className="app-datapicker"
                    label="Start date"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => handleDate('startDate', date)}
                    errorMessage={showErrorDateStart ? helpMessage : ''}
                />
                <DatePicker
                    ariaLabel="Final date"
                    className="app-datapicker"
                    label="End date"
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={(date) => handleDate('endDate', date)}
                    errorMessage={showErrorDateEnd ? helpMessage : ''}
                />
            </div>

            <div>
                <MultipleSelect
                    label="Provider blacklist"
                    id="s1"
                    className="app-multiselect"
                    onSelect={onSelectProviders}
                    onCreate={() => { }}
                    errorMessage={showErrorBlackList ? helpMessage : ''}
                />
            </div>


            <div className="app-toggle">
                <Toggle label="toggle" onChange={handleChangeInputChecked} name="routeApp" checked={routeApp} />
                <span className="app-label-toggle">Routed to Committee prior to approval</span>
            </div>

            <div className="app-textarea">
                <TextField
                    label="Comment"
                    onChange={handleTextField}
                    name="comment"
                    value={comment}
                    id="comment"
                    errorMessage={showErrorComment ? helpMessage : ''}
                />
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



