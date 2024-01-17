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

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ResetTv from '@mui/icons-material/ResetTv';
import EditIcon from '@mui/icons-material/Edit';

import ApplicationForm from "./ApplicationForm";

function CustomTabPanel(props) {
    const [rows, setRows] = useState([]);
    const createData = (code, period, content, approvalStatus) => {
        return { code, period, content, approvalStatus };
    }

    const [sendData, setSendData] = useState({
        idx: "",
        code: "",
        start: "",
        end: "",
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
            start: "2024-01-17",
            end: "2024-01-18",
            content: sendData.content,
            employeeId: sendData.employeeId,
        }).then((response) => {
            console.log(response);
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
                                {props.data.map((row) => (
                                    <TableRow
                                        key={row.idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="center">{row.start}</TableCell>
                                        <TableCell align="center">{row.content}</TableCell>
                                        <TableCell align="center">{row.approvalStatus}</TableCell>
                                        <TableCell align="center">
                                            <Button endIcon={<EditIcon />} />
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
                                {props.data.map((row) => (
                                    <TableRow
                                        key={row.idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="center">{row.start}</TableCell>
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