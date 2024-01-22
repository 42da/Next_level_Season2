import React from 'react';
import { useState, useEffect, useRef } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';
import { day } from 'date-arithmetic';
import { duration } from 'moment';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ResetTv from '@mui/icons-material/ResetTv';

import axios from 'axios';
import Edit from '@mui/icons-material/Edit';

function ApplicationForm(props) {
    //const today = [dayjs(new Date()), dayjs(new Date())]; // [start, end]
    // state 로 받으면 렌더링 될 때 값이 들어가있지 않아서 아무것도 안보임.
    // props 로 받아서 뿌려주는 것으로 변경
    const [vacation, setVacation] = useState('');
    const [vacationReason, setVacationReason] = useState('');
    const [sendData, setSendData] = useState({
        idx: "",
        code: "",
        start: "",   //dayjs(new Date().toLocaleDateString()), 2024-01-21
        end: "",
        content: "",
        employeeId: props.employeeId,
    });
    
    const handleChange = (event) => {
        setVacation(event.target.value);
        setSendData({ ...sendData, code: event.target.value });
    };
    const handleChangeReason = (event) => {
        // 수정 시 입력 안됨.(value 를 props 로 받아서 고정되는듯?)
        setVacationReason(event.target.value);
        setSendData({ ...sendData, content: event.target.value });
    };
    const handleChangeDate = (value, startOrEnd) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        setSendData({ ...sendData, [startOrEnd]: formattedDate });
    };

    const getInfoByIdx = (idx) => {     // list 에서 data idx 에 해당하는 정보 가져오기
        return props.data.applicationList.filter((row) => row.idx === idx)[0];
    }
    const [reset, setReset] = useState(false);
    const resetHandler = () => {
        setReset(true);
    }

    const submit = () => {
        
        // 신청, 수정
        axios.post('http://localhost:8080/main/application', {
            idx: props.isModify ? props.data.applicationList.filter((row) => row.idx === props.rowIdx)[0].idx : null,
            code: sendData.code,
            start: sendData.start,
            end: sendData.end,
            content: sendData.content,
            employeeId: props.employeeId,
        }).then((response) => {
            const responseData = response.data;
            if (props.isModify) {
                const modifiedList = props.data.applicationList;
                modifiedList.splice(props.idx, 1, responseData);
                props.modify(props.idx);
                props.setData({ vacationList: [...props.data.vacationList],
                    calendarList: [...props.data.calendarList.filter((row) => row.idx !== responseData.idx), { start: responseData.start, end: responseData.end, employeeId: props.employeeId }], 
                    applicationList: modifiedList
                });
            } else {
                props.setValue(1);
                props.setData({ vacationList: [...props.data.vacationList], 
                    calendarList: [...props.data.calendarList, { start: responseData.start, end: responseData.end, employeeId: props.employeeId }], applicationList: [...props.data.applicationList, { idx: responseData.idx, code: responseData.code, start: responseData.start, end: responseData.end, content: responseData.content, approvalStatus: responseData.approvalStatus }] 
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (reset) {
            setVacation('');
            setVacationReason('');
            setReset(false);
        }
        if (props.isModify) {
            const info = getInfoByIdx(props.rowIdx);
            setVacation(info.code);
            setVacationReason(info.content);
            setSendData({ ...sendData, idx: props.rowIdx, code: info.code, content: info.content, start: info.start, end: info.end });
        } else {
            setSendData({ ...sendData, start: dayjs(props.date[0]).format("YYYY-MM-DD"), end: dayjs(props.date[1]).format("YYYY-MM-DD") });
        }
    }, [reset]);
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">연차 종류</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={vacation}
                    label="연차 종류"
                    onChange={handleChange}
                >
                    <MenuItem value={"abs01"}>연차</MenuItem>
                    <MenuItem value={"abs02"}>연차)오전반차</MenuItem>
                    <MenuItem value={"abs03"}>연차)오후반차</MenuItem>
                    <MenuItem value={"abs04"}>대체휴가</MenuItem>
                    <MenuItem value={"abs05"}>경조휴가</MenuItem>
                    <MenuItem value={"abs06"}>출산육아휴가</MenuItem>
                    <MenuItem value={"abs07"}>기타</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="outlined-basic"
                label="연차 사유"
                variant="outlined"
                value={vacationReason}
                onChange={handleChangeReason}
                sx={{ mt: 3, width: '100%' }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                {/* 주말 비활성화(shouldDisableDate) */}
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
                    {
                        ["start", "end"].map((item, idx) => {
                            return (
                                <DatePicker
                                    key={item}
                                    label={item + " Date"}
                                    shouldDisableDate={(date) => { return date.day() === 0 || date.day() === 6 }}
                                    format='YYYY/MM/DD'
                                    sx={{ width: "50%" }}
                                    onChange={(value) => handleChangeDate(value, item)}
                                    value={props.isModify ? dayjs(getInfoByIdx(props.rowIdx)[item]) : dayjs(props.date[idx])} />
                            )
                        })
                    }
                    {/* <DatePicker
                        label="Start Date"
                        shouldDisableDate={(date) => { return date.day() === 0 || date.day() === 6 }} 
                        format='YYYY/MM/DD' 
                        sx={{ width: "50%" }} 
                        onChange={handleStartChangeDate} 
                        value={props.isModify ? dayjs(props.data.applicationList.filter((row) => row.idx === props.rowIdx)[0].start) : dayjs(props.date[0])} />
                    <DatePicker 
                        label="End Date"
                        shouldDisableDate={(date) => { return date.day() === 0 || date.day() === 6 }} 
                        format='YYYY/MM/DD' 
                        sx={{ width: "50%" }} 
                        onChange={handleEndChangeDate}
                        value={props.isModify ? dayjs(props.data.applicationList.filter((row) => row.idx === props.rowIdx)[0].end) : dayjs(props.date[1])} /> */}
                </Stack>
            </LocalizationProvider>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
                {
                    props.isModify ? (
                        <Button onClick={() => { submit("update") }} variant="contained" startIcon={<Edit />}>
                            수정
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