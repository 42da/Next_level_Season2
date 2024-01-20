import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ResetTv from '@mui/icons-material/ResetTv';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ApplicationForm from "./ApplicationForm";
import { IconButton } from "@mui/material";

function CustomTabPanel(props) {
    const [rows, setRows] = useState([]);
    const createData = (code, period, content, approvalStatus) => {
        return { code, period, content, approvalStatus };
    }

    const [sendData, setSendData] = useState({
        idx: "",
        code: "",
        start: dayjs(new Date().toLocaleDateString()),
        end: dayjs(new Date().toLocaleDateString()),
        content: "",
        employeeId: props.employeeId,
    });

    const [reset, setReset] = useState(false);
    const resetHandler = () => {
        setReset(true);
    }
    const submit = () => {
        // 신청
        axios.post('http://localhost:8080/main/application', {
            //idx: "",
            code: sendData.code,
            start: sendData.start,
            end: sendData.end,
            content: sendData.content,
            employeeId: props.employeeId,
        }).then((response) => {
            //debugger;
            props.setData({ vacationList: [...props.data.vacationList], calendarList: [...props.data.calendarList, { start: sendData.start, end: sendData.end, employeeId: props.employeeId }], applicationList: [...props.data.applicationList, {idx: props.data.applicationList.slice(-1)[0].idx + 1, code: sendData.code, start: sendData.start, end: sendData.end, content: sendData.content, approvalStatus: "W" }] });
            props.setValue(1);
            console.log("response : ", response, "props.data.applicationList : ", props.data.applicationList);
        }).catch((error) => {
            console.log(error);
        });
    }
    const deleteList = (idx) => {
        axios.post('http://localhost:8080/main/delete', {
            idx: idx,
        }).then((response) => {
            
            props.setData({ vacationList: [...props.data.vacationList], calendarList: [...props.data.calendarList], applicationList: [...props.data.applicationList.filter((row) => row.idx !== response.data)] });
            console.log("delete response : ", response);
        }).catch((error) => {
            console.log(error);
        });
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
                        <ApplicationForm sendData={sendData} setSendData={setSendData} reset={reset} setReset={setReset} />
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
                        <Button onClick={resetHandler} variant="outlined" startIcon={<ResetTv />}>
                            초기화
                        </Button>
                        <Button onClick={submit} variant="contained" endIcon={<SendIcon />}>
                            신청
                        </Button>
                    </Stack>
                </>
            )}
            {props.value === 1 && (
                <Box sx={{ pt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">연차 종류</TableCell>
                                    <TableCell align="center">기간</TableCell>
                                    <TableCell align="center">사유</TableCell>
                                    <TableCell align="center">상태</TableCell>
                                    <TableCell align="center">수정</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.applicationList.map((row) => (
                                    <TableRow
                                        key={row.idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ minWidth: '20%' }} align="center" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '20%' }} align="center">{row.start} ~ {row.end}</TableCell>
                                        <TableCell sx={{ minWidth: '20%' }} align="center">{row.content}</TableCell>
                                        <TableCell sx={{ minWidth: '20%' }} align="center">{row.approvalStatus}</TableCell>
                                        <TableCell sx={{ minWidth: '20%' }} align="center">
                                            <IconButton>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => {deleteList(row.idx)}}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            {/* <Button endIcon={<EditIcon fontSize="large" />} /> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            {props.value === 2 && (
                <Box sx={{ pt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">연차 종류</TableCell>
                                    <TableCell align="center">기간</TableCell>
                                    <TableCell align="center">사유</TableCell>
                                    <TableCell align="center">상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.vacationList.map((row) => (
                                    <TableRow

                                        key={row.idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="center">{row.start} ~ {row.end}</TableCell>
                                        <TableCell align="center">{row.content}</TableCell>
                                        <TableCell align="center">{row.approvalStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </div>
    );
}

export default CustomTabPanel;