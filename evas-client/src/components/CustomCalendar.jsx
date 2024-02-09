import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko'; // For moment's locale settings

import holiday from '../data/holiday';

// Localizer for the calendar
moment.locale('ko');
const localizer = momentLocalizer(moment);

const CustomCalendar = (props) => {
  const [currMonth, setCurrMonth] = useState(moment());
  const [events, setEvents] = useState([
    // {
    //   start: new Date(2023, 11, 28, 9, 0, 0), // date 불러오기
    //   end: new Date(2023, 11, 28, 18, 0, 0),   // 언제까지 불러올지
    //   title: 'Some title',
    // },
    // ... more events ...
  ]);
  const onRangeChange = useCallback((range) => {
    if (currMonth.year() <= moment(range.end).year() && currMonth.month() < moment(range.end).month() && currMonth < moment(range.end)) { // 현재 달이 end 보다 작으면 next
      setCurrMonth(currMonth.add(1, "months"));
    } else {  
      setCurrMonth(currMonth.subtract(1, "months"));
    }
  }, []);
  const checkHoliday = (date) => {
    for (let i = 0; i < holiday.length; i++) 
    {
      if (moment(date).isSame(holiday[i]) && moment(date).isSame(currMonth, "month")) { // && (holiday[i].isSameOrBefore(moment(), "month") && holiday[i].isSameOrAfter(moment(), "month"))) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    setEvents(props.data.map((item) => {
      return {
        start: new Date(item.start), //new Date("2023-11-01"), // date 불러오기
        end: new Date(item.end), //end: new Date("2023-11-02"),   // 언제까지 불러올지
        title: item.employeeId, //title: 'Some title', // employeeId
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
      backgroundColor: event.isHoliday ? 'red' : 'lightblue',
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
        backgroundColor: isWeekend ? 'rgba(255, 0, 0, 0.1)' : undefined,
      },
    });
  };
  const dayPropGetter = useCallback(
    (date) => {return ({
      ...((((moment(date).day() === 0 || moment(date).day() === 6) && moment(date).isSame(currMonth, "month")) || checkHoliday(date)) && {
        style: {
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        }
      }),
    })},
    [currMonth]
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
        onSelectSlot={handleSelect}
        views={['month']}
        onRangeChange={onRangeChange}
      />
    </div>
  );
};

export default CustomCalendar;