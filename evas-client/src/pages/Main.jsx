import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';

import DrawerAppBar from "../components/DrawerAppBar";
import CustomTabPanel from "../components/CustomTabPanel";
import CustomCalendar from '../components/CustomCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from "axios";

function Main() {
  const [value, setValue] = useState(1);
  const [data, setData] = useState({
    applicationList: [],
    vacationList: [],
    calendarList: [],
  });
  
  const {state} = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const refresh = () => {
    axios.post('http://localhost:8080/main/vacationList', {
      employeeId: state.employeeId,
    }).then((response) => {
      
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    // 데이터 요청
    // 신청 현황, 연차 목록, calander 에 뿌려줄 데이터
    console.log(state.employeeId);
    axios.post('http://localhost:8080/main', {
      employeeId: state.employeeId,
      resetVacationDate: state.resetVacationDate, // 연차 초기화 날짜(연차 목록)
    }).then((response) => {
      setData(response.data);
      console.log("main response : ", response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div>
      <DrawerAppBar />
      <Grid container spacing={2} sx={{pl: 2}}>
        <Grid item xs={6} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }} centered>
            <Tab label="연차 신청" />
            <Tab label="신청 현황" />
            <Tab label="연차 목록" />
          </Tabs>
          <CustomTabPanel isAdmin={state.isAdmin} setValue={setValue} setData={setData} employeeId={state.employeeId} data={data} value={value} index={0} />
          <CustomTabPanel isAdmin={state.isAdmin} setValue={setValue} setData={setData} employeeId={state.employeeId} data={data} value={value} index={1} />
          <CustomTabPanel isAdmin={state.isAdmin} employeeId={state.employeeId} data={data} value={value} index={2} />
        </Grid>
        <Grid item xs={6}>
          <CustomCalendar data={data.calendarList}/>
        </Grid>
      </Grid>

    </div>
  );
}

export default Main;