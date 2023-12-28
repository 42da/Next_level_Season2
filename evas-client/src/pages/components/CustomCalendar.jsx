import React, { useCallback, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko'; // For moment's locale settings

// Localizer for the calendar
moment.locale('ko');
const localizer = momentLocalizer(moment);


const CustomCalendar = () => {
  
  
  const [events, setEvents] = useState([
    {
      start: new Date(2023, 11, 28, 9, 0, 0), // date 불러오기
      end: new Date(2023, 11, 28, 18, 0, 0),   // 언제까지 불러올지
      title: 'Some title',
    },
    {
      start: moment().toDate(), // date 불러오기
      end: moment().add(2, 'days').toDate(),   // 언제까지 불러올지
      title: 'Some title2',
    },
    {
      start: moment().toDate(), // date 불러오기
      end: moment().add(3, 'days').toDate(),   // 언제까지 불러올지
      title: 'Some title3',
    }
    // ... more events ...
  ]);

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
      color: 'white',
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
  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        components={{
            dayCellWrapper: CustomDayCellWrapper,
          }}
        popup // +숫자 클릭시 팝업으로 띄워줌. 아니면 week 로 감.
        selectable  // 각 날짜 slot 선택 가능
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default CustomCalendar;