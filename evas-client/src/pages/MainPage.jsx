import React from "react";
import { useState } from "react";

import DrawerAppBar from "./components/DrawerAppBar";
import SimpleContainer from "./components/SimpleContainer";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import CustomTabPanel from "./components/CustomTabPanel";

function Main() {
  const [value, setValue] = useState(1);
  const onChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <DrawerAppBar />
      <Grid container spacing={2} sx={{pl: 2}}>
        <Grid item xs={6} >
          <Tabs variant="fullWidth" value={value} onChange={onChange} sx={{ borderBottom: 1, borderColor: 'divider' }} centered>
            <Tab label="연차 신청" />
            <Tab label="신청 현황" />
            <Tab label="연차 목록" />
          </Tabs>
          <CustomTabPanel value={value} index={0} />
          <CustomTabPanel value={value} index={1} />
          <CustomTabPanel value={value} index={2} />
        </Grid>
        <Grid item xs={6}>
          <SimpleContainer />
        </Grid>
      </Grid>

    </div>
  );
}

export default Main;