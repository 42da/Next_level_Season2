import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';

export default function EmployeeList(props) {
    const [employeeList, setEmployeeList] = useState([{employeeId: 'abs08', name: '전체'}]);
    //const [employee, setEmployee] = useState('');

    const handleChange = (event) => {
        props.setEmployee(event.target.value);
    };

    useEffect(() => {
        axios.post('http://localhost:8080/employee', {
        }).then((response) => {
            //const newEmployeeList = employeeList.concat(response.data.employeeList);
            setEmployeeList([...employeeList, ...response.data.employeeList]);
            console.log("employee response : ", response);

        }).catch((error) => {
            console.log(error);
        });
        console.log("EmployeeList props : ", props);
    }, []);
    return (
        <Box sx={{ pb: 3, display: 'flex', justifyContent: "flex-end", alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">사원 정보</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.employee}
                    label="사원 정보"
                    onChange={handleChange}
                >
                    {/* {props.data.applicationList.map((row, i) => (<MenuItem key={i} value={row.employeeId}>{row.employeeId} 이름</MenuItem>))} */}
                    {employeeList.map((row, i) => (
                        
                            <MenuItem key={i} value={row.employeeId}>{row.employeeId} {row.name}</MenuItem>
                        )
                    )}

                </Select>
            </FormControl>
        </Box>
    );
}