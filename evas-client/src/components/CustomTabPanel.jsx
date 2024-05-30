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

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import EditIcon from '@mui/icons-material/Edit';
import ApprovalIcon from '@mui/icons-material/Approval';
import DeleteIcon from '@mui/icons-material/Delete';
import Cancel from '@mui/icons-material/Cancel';

import ApplicationForm from "./ApplicationForm";
import { IconButton } from "@mui/material";

import {absCode, approvalStatus, useStatus} from "../data/abscode";
import { instance } from "../interceptors/axios";
// import EmployeeList from "./EmployeeList";

dayjs.locale('ko');

function CustomTabPanel(props) {
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState([dayjs(), dayjs()]);   // [start, end]

    const [modifyOpen, setModifyOpen] = useState([]);   // 각 row 의 수정 버튼 클릭 여부

    // const handleChange = (event) => {
    //     setEmployee(event.target.value);
    //     if (props.value == 0) {

    //     } else {
    //         console.log(props.value === 1 ? 'application' : 'vacation');
    //         axios.post('http://localhost:8080/admin/list', {
    //             employeeId: event.target.value,
    //             listType: props.value === 1 ? 'application' : 'vacation',
    //         }).then((response) => {

    //         }).catch((error) => {
    //         });
    //     }
    // }

    const deleteList = (vacationIdx) => {
        instance.post('/main/delete', {
            idx: vacationIdx,
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
        setModifyOpen([...props.data.applicationList.map(() => false)]);
    }, [props.data.applicationList]);

    return (
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
        >
            {props.value === 0 && (
                <Box sx={{ pt: 3 }}>
                    <ApplicationForm date={date} setDate={setDate} employeeId={props.employeeId} setValue={props.setValue} setData={props.setData} data={props.data} isModify={false} isAdmin={props.isAdmin} adminComp={props.adminComp} employee={props.employee} setEmployee={props.setEmployee} />
                </Box>
            )}
            {props.value === 1 && (
                <Box sx={{ pt: 3 }}>
                    {/* {(props.isAdmin && props.adminComp) && (
                        <EmployeeList value={props.value} onChange={handleChange} employee={employee} />
                    )} */}
                    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '15%' }} align="center">연차 종류</TableCell>
                                    <TableCell sx={{ width: '25%' }} align="center">기간</TableCell>
                                    <TableCell sx={{ width: '25%' }} align="center">사유</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">상태</TableCell>
                                    <TableCell sx={{ width: '20%' }} align="center">{props.adminComp ? "승인 및 거절" : "수정 및 삭제"}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.applicationList.map((row, idx) => (
                                    <React.Fragment key={row.idx + "application"}>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ minWidth: '20%' }} align="center" scope="row">
                                                {absCode[row.code]}
                                            </TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{row.start} ~ {row.end}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{row.content}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">{approvalStatus[row.approvalStatus]}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">
                                                <IconButton onClick={() => { modify(idx) }}>
                                                    {props.adminComp ? (
                                                        <ApprovalIcon fontSize="small" />
                                                    ) : (<EditIcon fontSize="small" />)}
                                                    
                                                </IconButton>
                                                {!props.adminComp && (<IconButton onClick={() => { deleteList(row.idx) }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>)}
                                                
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
                                                                        <ApplicationForm date={date} setDate={setDate} employeeId={props.employeeId} value={props.value} setValue={props.setValue} setData={props.setData} data={props.data} isModify={true} rowIdx={row.idx} idx={idx} modify={modify} adminComp={props.adminComp}/>
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
                    {/* {(props.isAdmin && props.adminComp) && (
                        <EmployeeList value={props.value} onChange={handleChange} employee={employee} />
                    )} */}
                    <TableContainer component={Paper} sx={{maxHeight: 600}}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '15%' }} align="center">연차 종류</TableCell>
                                    <TableCell sx={{ width: '25%' }} align="center">기간</TableCell>
                                    <TableCell sx={{ width: '25%' }} align="center">사유</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">상태</TableCell>
                                    <TableCell sx={{ width: '20%' }} align="center">취소</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.vacationList.map((row, idx) => (
                                    <React.Fragment key={idx + "cancel"}>
                                        <TableRow
                                            key={row.idx + "vacation"}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" scope="row">
                                                {absCode[row.code]}
                                            </TableCell>
                                            <TableCell align="center">{row.start} ~ {row.end}</TableCell>
                                            <TableCell align="center">{row.content}</TableCell>
                                            <TableCell align="center">{useStatus[row.useStatus]}</TableCell>
                                            <TableCell sx={{ minWidth: '20%' }} align="center">
                                                {
                                                    (row.useStatus != "U" && (props.adminComp || row.isWhole !== "Y")) && (
                                                        <IconButton onClick={() => { modify(idx) }}>
                                                            <Cancel fontSize="small" />
                                                        </IconButton>
                                                    )
                                                }

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
                                                                        <ApplicationForm employeeId={props.employeeId} value={props.value} setValue={props.setValue} setData={props.setData} data={props.data} isModify={true} rowIdx={row.idx} idx={idx} modify={modify} adminComp={props.adminComp} />
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
        </div>
    );
}

export default CustomTabPanel;