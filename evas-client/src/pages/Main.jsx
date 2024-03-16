import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DrawerAppBar from "../components/DrawerAppBar";
import CustomTabPanel from "../components/CustomTabPanel";
import CustomCalendar from '../components/CustomCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from "axios";
import { Box } from "@mui/system";

import EmployeeList from "../components/EmployeeList";

function Main() {
  const [adminComp, setAdminComp] = useState(false); // admin component 보여줄지 여부
  const [value, setValue] = useState(1);
  const [data, setData] = useState({
    applicationList: [],
    vacationList: [],
    calendarList: [],
  });

  const { state } = useLocation();

  const [employee, setEmployee] = useState('');

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
      <DrawerAppBar adminComp={adminComp} setAdminComp={setAdminComp} isAdmin={state.isAdmin} />
      <Grid container spacing={2} sx={{ pl: 2 }}>
        
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: "flex-end"}}>
        {(state.isAdmin && adminComp) && (
          <EmployeeList employee={employee} setEmployee={setEmployee} />
                    )}
            <Card sx={{ minWidth: 150, justifyContent: "flex-end", ml: 2 }} variant="outlined">
              <CardContent align="right">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  연차
                </Typography>
                <Typography variant="h5" component="div">
                  {state.totalVacationCount - state.useVacationCount}/{state.totalVacationCount}
                </Typography>
              </CardContent>
              {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
            </Card>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{maxWidth: 200, backgroundColor: "black"}}>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }} centered>
            <Tab label="연차 신청" />
            <Tab label={adminComp ? "전체 신청 현황" : "신청 현황"} />
            <Tab label={adminComp ? "전체 연차 목록" : "연차 목록"} />
          </Tabs>
          <>
            {
              [0, 1, 2].map((index) => {
                return (
                  <CustomTabPanel key={index}
                    adminComp={adminComp}
                    isAdmin={state.isAdmin}
                    setValue={index !== 2 ? setValue : null}
                    setData={index !== 2 ? setData : null}
                    employeeId={state.employeeId}
                    data={data}
                    value={value}
                    index={index}
                    setEmployee={setEmployee} />
                )
              })
            }
          </>
        </Grid>
        <Grid item xs={6}>
          <CustomCalendar data={data.calendarList} employeeId={state.employeeId} />
        </Grid>
      </Grid>

    </div>
  );
}

export default Main;