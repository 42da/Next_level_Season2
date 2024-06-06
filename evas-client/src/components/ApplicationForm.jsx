import React from 'react';
import { useState, useEffect, useRef } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import moment from 'moment';
import 'moment/locale/ko'; // For moment's locale settings

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ResetTv from '@mui/icons-material/ResetTv';

import axios from 'axios';

import Edit from '@mui/icons-material/Edit';

import holiday from "../data/holiday";
import { dayjsLocalizer } from 'react-big-calendar';
import { instance } from '../interceptors/axios';
import AuthServices from '../services/authServices';

// import EmployeeList from './EmployeeList';

// Localizer for the calendar
moment.locale('ko');
dayjs.locale('ko');

const dateVersion = 'dayjs'; // 'moment' or 'dayjs'

function ApplicationForm(props) {
    //const today = [dayjs(new Date()), dayjs(new Date())]; // [start, end]
    // state 로 받으면 렌더링 될 때 값이 들어가있지 않아서 아무것도 안보임.
    // props 로 받아서 뿌려주는 것으로 변경
    const [vacation, setVacation] = useState('');
    const [vacationReason, setVacationReason] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [cancelReason, setCancelReason] = useState('');
    const [sendData, setSendData] = useState({
        idx: "",
        code: "",
        start: "",   //dayjs(new Date().toLocaleDateString()), 2024-01-21
        end: "",
        content: "",
        date: [],
        employeeId: props.employeeId,
    });
    const [modifyOrCancel, setModifyOrCancel] = useState("modify"); // 수정 or 취소 여부
    const [apprOrRej, setApprOrRej] = useState("A"); // 승인 or 거절 여부

    const handleChange = (event, type) => {
        switch (type) {
            case 'vacation':
                if (event.target.value === "abs08" && props.adminComp) {
                    props.setEmployee(event.target.value);
                }
                setVacation(event.target.value);
                setSendData({ ...sendData, code: event.target.value });
                break;
            case 'appr':
                setApprOrRej(event.target.value);
                if (event.target.value === "R") {

                }
                break;
        }

    };
    const handleChangeReason = (event, type) => {
        // 수정 시 입력 안됨.(value 를 props 로 받아서 고정되는듯?)

        switch (type) {
            case 'V':
                setVacationReason(event.target.value);
                setSendData({ ...sendData, content: event.target.value });
                break;
            case 'R':
                setRejectReason(event.target.value);
                setSendData({ ...sendData, rejectionContent: event.target.value });
                break;
            case 'C':
                setCancelReason(event.target.value);
                setSendData({ ...sendData, cancellationContent: event.target.value });
                break;
        }
        // setVacationReason(event.target.value);
        // if (props.value === 1 && props.adminComp) {
        //     setSendData({ ...sendData, rejectionContent: event.target.value });
        // } else {
        //     setSendData({ ...sendData, content: event.target.value });
        // }
    };
    const handleChangeDate = (value, startOrEnd) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        setSendData({ ...sendData, [startOrEnd]: formattedDate });
    };

    const getInfoByIdx = (idx) => {     // list 에서 data idx 에 해당하는 정보 가져오기
        return props.data.applicationList.filter((row) => row.idx === idx)[0];
    }

    const getWeekDays = (start, end) => {
        let result = [];
        let startDate = dayjs(start);
        let endDate = dayjs(end);
        while (startDate <= endDate) {
            if (startDate.day() !== 0 && startDate.day() !== 6 && !holiday[dateVersion].some((day) => day.isSame(startDate))) {
                result.push(startDate.format("YYYY-MM-DD"));
            }
            startDate = startDate.add(1, "days");
        }
        return result;
    }

    const [reset, setReset] = useState(false);
    const resetHandler = () => {
        setReset(true);
    }

    const submit = () => {
        let url = AuthServices.API_URL + '/';
        if (props.adminComp) url += "admin/";
        else url += "main/";
        if (props.isModify && modifyOrCancel === "modify" && props.adminComp) url += "approve";
        else if (props.isModify && modifyOrCancel === "modify") url += "update";
        else if (modifyOrCancel === "cancel") url += "cancel";
        else {
            url += "apply";
        }

        let idx = null;
        if (props.isModify && modifyOrCancel === "modify") idx = props.data.applicationList.filter((row) => row.idx === props.rowIdx)[0].idx;
        else if (modifyOrCancel === "cancel") {
            idx = props.data.vacationList.filter((row) => row.idx === props.rowIdx)[0].idx;
            sendData.code = props.data.vacationList.filter((row) => row.idx === props.rowIdx)[0].code;
        }
        // 신청, 수정
        instance.post(url, {
            idx: idx,
            code: sendData.code,
            start: sendData.start,
            end: sendData.end,
            content: sendData.content,
            date: getWeekDays(sendData.start, sendData.end),
            employeeId: props.adminComp ? props.employee : props.employeeId,
            cancellationContent: modifyOrCancel === "cancel" ? sendData.content : "",
            rejectionContent: (props.value === 1 && props.adminComp) ? sendData.content : "",
        }).then((response) => {
            const responseData = response.data;
            const newData = {
                idx: responseData.idx,
                code: responseData.code,
                start: responseData.start,
                end: responseData.end,
                content: responseData.content,
                approvalStatus: responseData.approvalStatus, // 응답 와야함.
                cancellationContent: responseData.cancellationContent,
                employeeId: responseData.employeeId,
                date: responseData.date,
                rejectionContent: responseData.rejectionContent,
                type: responseData.type,
                useStatus: responseData.useStatus
            };
            if (props.isModify) {
                console.log("modify response : ", responseData);
                let modifiedAppList = props.data.applicationList;
                let modifiedVacList = props.data.vacationList;
                if (modifyOrCancel === "cancel") {
                    if (!props.adminComp) {
                        modifiedAppList.push(responseData);
                    }
                } else {
                    if (props.adminComp) {
                        modifiedAppList.splice(props.idx, 1);
                        modifiedVacList.push(responseData);
                    } else {
                        modifiedAppList.splice(props.idx, 1, responseData);
                    }
                }
                props.modify(props.idx);
                if (modifyOrCancel === "cancel") {
                    props.setData({
                        vacationList: [...props.data.vacationList.filter((row) => row.idx !== (typeof responseData === 'number' ? responseData : responseData.idx))],
                        calendarList: [...props.data.calendarList.filter((row) => row.idx !== (typeof responseData === 'number' ? responseData : responseData.idx))],
                        applicationList: modifiedAppList
                    });
                    if (!props.adminComp) props.setValue(1);
                } else {
                    props.setData({
                        vacationList: modifiedVacList,
                        calendarList: [...props.data.calendarList.filter((row) => row.idx !== responseData.idx), responseData],
                        applicationList: modifiedAppList
                    });
                }
            } else {
                console.log("apply response : ", responseData);
                if (props.adminComp) {
                    props.setValue(2);
                    props.setData({
                        vacationList: [...props.data.vacationList, responseData],
                        calendarList: [...props.data.calendarList, responseData],
                        applicationList: [...props.data.applicationList]
                    });
                } else {
                    props.setValue(1);
                    props.setData({
                        vacationList: [...props.data.vacationList],
                        calendarList: [...props.data.calendarList, responseData], 
                        applicationList: [...props.data.applicationList, responseData]
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (props.value !== 2) {    // reject, cancel 도 고려 필요
            if (reset) {
                setVacation('');
                setVacationReason('');
                setReset(false);
                props.setDate(dayjs(), dayjs());
            }

            if (props.isModify) {
                const info = getInfoByIdx(props.rowIdx);
                setVacation(info.code);
                setVacationReason(info.content);
                setSendData({ ...sendData, idx: props.rowIdx, code: info.code, content: info.content, start: info.start, end: info.end });
            } else {
                setSendData({ ...sendData, start: dayjs(props.date[0]).format("YYYY-MM-DD"), end: dayjs(props.date[1]).format("YYYY-MM-DD") });
            }
        } else setModifyOrCancel("cancel");
    }, [reset]);
    return (
        <>
            {
                (props.adminComp && props.value == 1) ? (<>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">승인 및 거절</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vacation}
                            label="연차 종류"
                            onChange={(e) => {handleChange(e, 'vacation')}}
                        >
                            <MenuItem value={"A"}>승인</MenuItem>
                            <MenuItem value={"R"}>거절</MenuItem>
                        </Select>
                    </FormControl>
                </>) : props.value !== 2 && (
                    <>
                        {/* {props.adminComp && <EmployeeList value={props.value} />} */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">연차 종류</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vacation}
                                label="연차 종류"
                                onChange={(e) => { handleChange(e, 'vacation') }}
                            >
                                {props.adminComp && <MenuItem value={"abs08"}>전체 연차</MenuItem>}
                                <MenuItem value={"abs01"}>연차</MenuItem>
                                <MenuItem value={"abs02"}>연차)오전반차</MenuItem>
                                <MenuItem value={"abs03"}>연차)오후반차</MenuItem>
                                <MenuItem value={"abs04"}>대체휴가</MenuItem>
                                <MenuItem value={"abs05"}>경조휴가</MenuItem>
                                <MenuItem value={"abs06"}>출산육아휴가</MenuItem>
                                <MenuItem value={"abs07"}>기타</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )
            }
            {
                !(apprOrRej === "A" && props.adminComp && props.value == 1) && (
                    <TextField
                        id="outlined-basic"
                        label={props.value === 2 ? "취소 사유" : ((props.value === 1 && props.adminComp) ? "거절 사유" : "연차 사유")}
                        variant="outlined"
                        value={props.value === 2 ? cancelReason : ((props.value === 1 && props.adminComp) ? rejectReason : vacationReason)}
                        onChange={(e) => handleChangeReason(e, props.value === 2 ? "C" : ((props.value === 1 && props.adminComp) ? "R" : "V"))}
                        sx={{ mt: props.value === 2 ? 0 : 3, width: '100%' }}
                    />
                ) // 거절 시 사유 입력란 추가
            }

            {
                !(props.value === 2 || (props.value === 1 && props.adminComp)) && (
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        {/* 주말 비활성화(shouldDisableDate) */}
                        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
                            {
                                ["start", "end"].map((item, idx) => {
                                    return (
                                        <DatePicker
                                            key={item}
                                            label={item.charAt(0).toUpperCase() + item.slice(1) + " Date"}
                                            name={item}
                                            /*
                                                주말 및 공휴일 비활성화 (Array.includes -> Array.some 으로 변경)
                                                primitive type (string, number 등) 에서만 사용 가능한 includes 대신 객체 배열에서 사용 가능한 some 사용하기 위해 변경함. 
                                                한가지 의문점은 day == date 으로 하면 안되고 day.isSame(date) 으로 동작된다는 점.)
                                            */

                                            shouldDisableDate={(date) => { return date.day() === 0 || date.day() === 6 || holiday[dateVersion].some((day) => day.isSame(date)) }}
                                            disablePast
                                            format='YYYY/MM/DD'
                                            sx={{ width: "50%" }}
                                            onChange={(value) => handleChangeDate(value, item)}
                                            value={props.isModify ? dayjs(getInfoByIdx(props.rowIdx)[item]) : dayjs(props.date[idx])} />
                                    )
                                })
                            }
                        </Stack>
                    </LocalizationProvider>
                )
            }

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
                {
                    props.isModify ? (
                        <Button onClick={() => { submit("update") }} variant="contained" startIcon={<Edit />}>
                            {modifyOrCancel === "modify" ? (props.adminComp ? "확인" : "수정") : "취소"}
                        </Button>
                    ) : (
                        <>
                            <Button onClick={resetHandler} variant="outlined" startIcon={<ResetTv />}>
                                초기화
                            </Button>
                            <Button onClick={() => { submit("application") }} variant="contained" endIcon={<SendIcon />}>
                                신청
                            </Button>
                        </>
                    )
                }
            </Stack>
        </>
    );
}

export default ApplicationForm;