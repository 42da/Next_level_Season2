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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('연차', '23-01-01', '그냥', '대기', '미사용'),
    createData('오전반차', '23-01-01', '퇴사를 위한 자기계발', '승인', '사용'),
    createData('오후반차', '23-01-01', '개인 사유', '반려', '미사용'),
    createData('대체휴가', '23-01-01', '숙취로 인한 휴가', '반려', '미사용'),
    createData('경조사휴가', '23-01-01', '결혼식', '대기', '미사용'),
];

function CustomTabPanel(props) {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [reset, setReset] = useState(false);
    const resetHandler = () => {
        setReset(true);
    }
    const submit = () => {
        // 신청
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
                        <ApplicationForm reset={reset} setReset={setReset} />
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
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
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">연차 종류</TableCell>
                                    <TableCell align="center">기간</TableCell>
                                    <TableCell align="center">사유</TableCell>
                                    <TableCell align="center">상태</TableCell>
                                    <TableCell align="center">사용 유무</TableCell>
                                    <TableCell align="center">수정</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.calories}</TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                        <TableCell align="center">{row.carbs}</TableCell>
                                        <TableCell align="center">{row.protein}</TableCell>
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
                                    <TableCell align="center">사용 유무</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.calories}</TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                        <TableCell align="center">{row.carbs}</TableCell>
                                        <TableCell align="center">{row.protein}</TableCell>
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