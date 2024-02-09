import moment from 'moment';
import 'moment/locale/ko'; // For moment's locale settings

// Localizer for the calendar
moment.locale('ko');

let holiday = {
    year: 2024,
    fixedDay: ["01-01", "03-01", "05-01", "05-05", "05-15", "06-06", "08-15", "10-03", "10-09", "12-25"],
    dynamicDay: ["02-09", "02-10", "02-11", "02-12", "04-10", "05-06", "09-16", "09-17", "09-18"],
};

let createHoliday = (obj) => {
    let result = [];
    obj.fixedDay.forEach((day) => {
        result.push(moment(`${obj.year}-${day}`, "YYYY-MM-DD"));
    });
    obj.dynamicDay.forEach((day) => {
        result.push(moment(`${obj.year}-${day}`, "YYYY-MM-DD"));
    });
    return result;
}

holiday = createHoliday(holiday);

export default holiday;