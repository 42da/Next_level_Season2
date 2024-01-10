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
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';

function ApplicationForm({ reset, setReset }) {
    const [vacation, setVacation] = useState('');
    const [vactionReason, setVactionReason] = useState('');

    const handleChange = (event) => {
        setVacation(event.target.value);
    };
    const handleChangeReason = (event) => {
        setVactionReason(event.target.value);
    };
    useEffect(() => {
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
                    <MenuItem value={10}>연차</MenuItem>
                    <MenuItem value={20}>연차)오전반차</MenuItem>
                    <MenuItem value={30}>연차)오후반차</MenuItem>
                    <MenuItem value={30}>대체휴가</MenuItem>
                    <MenuItem value={30}>경조휴가</MenuItem>
                    <MenuItem value={30}>출산육아휴가</MenuItem>
                    <MenuItem value={30}>기타</MenuItem>
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
                        <DesktopDateRangePicker
                            defaultValue={[dayjs(new Date().toLocaleDateString()), dayjs(new Date().toLocaleDateString())]}
                        />
                    {/* </DemoItem>
                </DemoContainer> */}
            </LocalizationProvider>

        </>
    );
}

export default ApplicationForm;