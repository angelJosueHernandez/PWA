import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

const getGoodFriday = (year) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day - 2);
};

const generateHolidays = (startYear, numberOfYears) => {
  const holidays = [];
  for (let year = startYear; year < startYear + numberOfYears; year++) {
    holidays.push(`${year}-01-01`); // Año Nuevo
    holidays.push(`${year}-02-05`); // Día de la Constitución
    holidays.push(`${year}-03-21`); // Natalicio de Benito Juárez
    holidays.push(`${year}-05-01`); // Día del Trabajo
    holidays.push(`${year}-09-16`); // Día de la Independencia
    holidays.push(`${year}-10-12`); // Día de la Raza
    holidays.push(`${year}-11-02`); // Día de los Muertos
    holidays.push(`${year}-11-20`); // Revolución Mexicana
    holidays.push(`${year}-12-25`); // Navidad

    const goodFriday = getGoodFriday(year);
    holidays.push(format(goodFriday, 'yyyy-MM-dd'));
  }
  return holidays;
};

const holidays = generateHolidays(new Date().getFullYear(), 5);

const isHoliday = (date) => {
  const dateString = format(date, 'yyyy-MM-dd');
  return holidays.includes(dateString);
};

const CustomCalendar = ({ onChange, value }) => {
  return (
    <Calendar
      onChange={onChange}
      value={value}
      className="calendar-container text-gray-800 bg-white rounded-lg shadow-lg text-[16px]"
      next2Label={null}
      prev2Label={null}
      tileDisabled={({ date, view }) =>
        view === 'month' &&
        (date.getDay() === 0 || date.getDay() === 6 || isHoliday(date))
      }
    />
  );
};

export default CustomCalendar;
