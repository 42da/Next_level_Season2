import React from 'react';
import { useState, useEffect } from 'react';

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

function ApplicationForm({ reset, setReset, sendData, setSendData, date }) {
    const today = [dayjs(new Date().toLocaleDateString()), dayjs(new Date().toLocaleDateString())]; // [start, end
    const [vacation, setVacation] = useState('');
    const [vactionReason, setVactionReason] = useState('');

    const handleChange = (event) => {
        setVacation(event.target.value);
        setSendData({ ...sendData, code: event.target.value });
    };
    const handleChangeReason = (event) => {
        setVactionReason(event.target.value);
        setSendData({ ...sendData, content: event.target.value });
    };
    const handleStartChangeDate = (value) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        setSendData({ ...sendData, start: formattedDate });
    };
    const handleEndChangeDate = (value) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        setSendData({ ...sendData, end: formattedDate });
    };
    useEffect(() => {
        setSendData({ ...sendData, start: dayjs(today[0]).format("YYYY-MM-DD"), end: dayjs(today[1]).format("YYYY-MM-DD") });
        if (reset) {
            setVacation('');
            setVactionReason('');
            setReset(false);
        }
    }, [reset]);
    return (
        <>
            <FormControl fullWidth sx={{ pb: 3 }}>
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
            <TextField value={vactionReason} onChange={handleChangeReason} sx={{ pb: 3, width: '100%' }} id="outlined-basic" label="연차 사유" variant="outlined" />

            <LocalizationProvider dateAdapter={AdapterDayjs} >
                {/* <DemoContainer
                    components={[
                        'DesktopDateRangePicker',
                    ]}
                >
                    <DemoItem label="연차 기간" component="DesktopDateRangePicker"> */}
                {/* <DesktopDateRangePicker
                            defaultValue={[dayjs(new Date().toLocaleDateString()), dayjs(new Date().toLocaleDateString())]}
                        /> */}
                {/* </DemoItem>
                </DemoContainer> */}
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pb: 3 }}>
                    <DatePicker format='YYYY/MM/DD' sx={{width: "50%"}} onChange={handleStartChangeDate} label="Start Date" defaultValue={today[0]} name='start' />
                    <DatePicker format='YYYY/MM/DD' sx={{width: "50%"}} onChange={handleEndChangeDate} label="End Date" defaultValue={today[1]} name='end'/>
                </Stack>
            </LocalizationProvider>

        </>
    );
}

export default ApplicationForm;