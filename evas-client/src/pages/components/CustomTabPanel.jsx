import React, { useEffect } from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ResetTv from '@mui/icons-material/ResetTv';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function CustomTabPanel(props) {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [reset, setReset] = useState(false);
    const resetHandler = () => {
        setReset(true);
    }
    return (
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
        >
            {props.value === 0 && (
                <>
                    <Box sx={{ pt: 3 }}>
                        <BasicSelect reset={reset} setReset={setReset} />
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={resetHandler} variant="outlined" startIcon={<ResetTv />}>
                            초기화
                        </Button>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            신청
                        </Button>
                    </Stack>
                </>
            )}
            {props.value === 1 && (
                <Box sx={{ pt: 3 }}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {[1, 2, 3].map((value) => (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton aria-label="comment">
                                        <EditIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={`Line item ${value}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

        </div>
    );
}

function BasicSelect({ reset, setReset }) {
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
        </>
    );
}

export default CustomTabPanel;