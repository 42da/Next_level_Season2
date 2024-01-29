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
import Collapse from "@mui/material/Collapse";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import dayjs from 'dayjs';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ApplicationForm from "./ApplicationForm";
import { IconButton } from "@mui/material";

function CustomTabPanel(props) {
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState([dayjs(new Date()), dayjs(new Date())]);   // [start, end]

    const [modifyOpen, setModifyOpen] = useState([]);   // 각 row 의 수정 버튼 클릭 여부

    const handleChange = (event) => {
        setEmployee(event.target.value);
    };

    const deleteList = (idxArr) => {
        axios.post('http://localhost:8080/main/delete', {
            idx: idxArr,
        }).then((response) => {
            props.setData({ vacationList: [...props.data.vacationList], calendarList: [...props.data.calendarList], applicationList: [...props.data.applicationList.filter((row) => row.idx !== response.data)] });
            console.log("delete response : ", response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const modify = (idx) => {       // 수정 버튼 클릭 시
        let temp = [...modifyOpen];

        temp[idx] = !temp[idx];
        temp = temp.map((row, i) => row && idx === i ? row : false);    // 모든 수정 버튼 닫기(한번에 하나만 수정 가능)

        setModifyOpen(temp);
    }

    useEffect(() => {
        setModifyOpen([...props.data.applicationList.map((row) => false)]);
    }, [props.data.applicationList]);

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
                        <ApplicationForm date={date} setDate={setDate} employeeId={props.employeeId} setValue={props.setValue} setData={props.setData} data={props.data} isModify={false} />
                    </Box>
                </>
            )}
            {props.value === 1 && (
                <Box sx={{ pt: 3 }}>
                    {props.isAdmin && (
                        <Box sx={{ pb: 3, display: 'flex',justifyContent: "flex-end" }}>
                            <FormControl size="small" sx={{minWidth: 250}}>
                                <InputLabel id="demo-simple-select-label">사원 정보</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={employee}
                                    label="사원 정보"
                                    onChange={handleChange}
                                >
                                    {props.data.applicationList.map((row, i) => (<MenuItem key={i} value={row.employeeId}>{row.employeeId} 이름</MenuItem>))}
                                    
                                </Select>
                            </FormControl>
                        </Box>

                    )}
                    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
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
                                {props.data.applicationList.map((row, idx) => (
                                    <React.Fragment key={row.idx + "application"}>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ minWidth: '20%' }} align="center" scope="row">
                                                {row.code}
                                            </TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{row.start} ~ {row.end}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{row.content}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{row.approvalStatus}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">
                                                <IconButton onClick={() => { modify(idx) }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => { deleteList([row.idx]) }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ padding: 0, border: 0 }} colSpan={5}>
                                                <Collapse in={modifyOpen[idx]} timeout="auto" unmountOnExit>
                                                    <Table aria-label="modify vacation" sx={{ width: '100%' }}>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="left" scope="row">
                                                                    <Box sx={{ pt: 2, }}>
                                                                        <ApplicationForm date={date} setDate={setDate} employeeId={props.employeeId} setValue={props.setValue} setData={props.setData} data={props.data} isModify={true} rowIdx={row.idx} idx={idx} modify={modify} />
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
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

                                        key={row.idx + "vacation"}
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