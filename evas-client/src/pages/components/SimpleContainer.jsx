import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import DateCalendarValue from './DateCalendarValue';
import CustomCalendar from './CustomCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function SimpleContainer() {
  return (
    <CustomCalendar />
  );
}