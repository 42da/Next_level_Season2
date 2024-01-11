import React, { useEffect } from "react";
import { useState } from "react";
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
  const [content, setContent] = useState('');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const refresh = () => {
    axios.post('http://localhost:8080/main/vacationList', {
      id: "test",
      passwd: "test",
    }).then((response) => {
      
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    // 데이터 요청
    // 신청 현황, 연차 목록, calander 에 뿌려줄 데이터
    axios.post('http://localhost:8080/main', {
      empolyeeId: "R20220202",
    }).then((response) => {
      
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
          <CustomTabPanel value={value} index={0} />
          <CustomTabPanel value={value} content={content} index={1} />
          <CustomTabPanel value={value} index={2} />
        </Grid>
        <Grid item xs={6}>
          <CustomCalendar />
        </Grid>
      </Grid>

    </div>
  );
}

export default Main;