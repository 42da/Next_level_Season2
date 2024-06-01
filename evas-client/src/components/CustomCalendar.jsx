import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, dayjsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko'; // For moment's locale settings

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

import holiday from '../data/holiday';
import { date } from 'date-arithmetic';
import employeeList from '../data/employee';
import { alignProperty } from '@mui/material/styles/cssUtils';

// Localizer for the calendar
moment.locale('ko');
dayjs.locale('ko');
dayjs.extend(isBetween);

const dateVersion = 'dayjs'; // 'moment' or 'dayjs'

//const localizer = momentLocalizer(moment);
const localizer = dayjsLocalizer(dayjs);

const CustomCalendar = (props) => {
  const [currDate, setCurrDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  
  const onRangeChange = useCallback((range) => {
    
    if (currDate < dayjs(range.end)) { // 현재 달이 end 보다 작으면 next
      if (currDate.add(1, "month").isBetween(dayjs(range.start), dayjs(range.end))) { // today 눌렀을 때 처리
        setCurrDate(currDate.add(1, "month")); 
      } else setCurrDate(dayjs());
    } else {
      if (currDate.subtract(1, "month").isBetween(dayjs(range.start), dayjs(range.end))) {  // today 눌렀을 때 처리
        setCurrDate(currDate.subtract(1, "month"));
      } else setCurrDate(dayjs());
    }
  }, [currDate]);
  const checkHoliday = (date) => {
    for (let i = 0; i < holiday[dateVersion].length; i++) 
    {
      if (dayjs(date).isSame(holiday[dateVersion][i]) && dayjs(date).isSame(currDate, "month")) { // && (holiday[i].isSameOrBefore(moment(), "month") && holiday[i].isSameOrAfter(moment(), "month"))) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    const getholidayArr = (calendarData) => {
      let result = [];
      for (let i = 0; i < calendarData.length; i++) {
        let startEnd = {
          start: '',
          end: '',
          employeeId: calendarData[i].employeeId,
        }
        let dateArr = calendarData[i].date.split(",");
        if (dateArr.length === 1) {
          result.push({...startEnd, start: dateArr[0], end: dateArr[0]});
          continue;
        }
        startEnd.start = dateArr[0];
        
        for (let j = 0; j < dateArr.length; j++) {
          if (j === dateArr.length - 1) {
            result.push({...startEnd, end: dateArr[j]});
          } else if (!dayjs(dateArr[j]).add(1, "day").isSame(dayjs(dateArr[j+1]))) {
            result.push({...startEnd, end: dateArr[j]});
            startEnd.start = dateArr[j+1];
          }
        }
      }
      return result;
    };
    console.log("calendarData : ", props.data);
    setEvents(getholidayArr(props.data).map((item) => {
      return {
        start: new Date(item.start), //new Date("2023-11-01"), // date 불러오기
        end: new Date(item.end), //end: new Date("2023-11-02"),   // 언제까지 불러올지
        title: employeeList[item.employeeId], //title: 'Some title', // employeeId
      }
    }));
  }, [props.data]);

  const handleSelect = useCallback(({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title)
      setEvents(prev => [
        ...prev,
        {
          start,
          end,
          title,
        },
      ]);
  }, [setEvents]);
  // Custom event style getter
  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: event.title === '전체' ? 'rgba(255, 0, 0, 0.1)' : 'lightblue',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style: style
    };
  };
  // Custom day cell wrapper
  const CustomDayCellWrapper = ({ children, value }) => {
    const isWeekend = value.day() === 0 || value.day() === 6; // 0 for Sunday, 6 for Saturday
    return React.cloneElement(React.Children.only(children), {
      style: {
        ...children.props.style,
        backgroundColor: isWeekend ? 'rgba(102, 102, 102, 0.1)' : undefined,
      },
    });
  };
  const dayPropGetter = useCallback(
    (date) => {return ({
      ...((((dayjs(date).day() === 0 || dayjs(date).day() === 6) && dayjs(date).isSame(currDate, "month")) || checkHoliday(date)) && {
        style: {
          backgroundColor: 'rgba(102, 102, 102, 0.1)',
        }
      }),
    })},
    [currDate]
  );
  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 700, padding: '20px' }}
        eventPropGetter={eventStyleGetter}
        components={{
          dayCellWrapper: CustomDayCellWrapper,
        }}
        dayPropGetter={dayPropGetter}
        popup // +숫자 클릭시 팝업으로 띄워줌. 아니면 week 로 감.
        selectable  // 각 날짜 cell 선택 가능
        // onSelectSlot={handleSelect}
        views={['month']}
        onRangeChange={onRangeChange}
      />
    </div>
  );
};

export default CustomCalendar;