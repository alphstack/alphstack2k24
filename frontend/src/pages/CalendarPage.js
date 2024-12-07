import React, { useMemo, useRef, useState } from 'react';
import NavBar from "../components/NavBar";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const CalendarPage = ({ onClick }) => {
  const today = new Date();
  const dayRefs = useRef([]);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const handleDayClick = (day, month, year) => {
    if (onClick) {
      onClick(day, month, year);
    }
  };

  const generateCalendar = useMemo(() => {
    const daysInYear = () => {
      const days = [];
      const startDate = new Date(year, today.getMonth(), 1); // Start from this month
      const endDate = new Date(year + 1, today.getMonth(), 0); // Ends after 12 months from today

      let currentDate = startDate;

      while (currentDate <= endDate) {
        days.push({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
          day: currentDate.getDate(),
        });
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      }

      return days;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    return calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ year, month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isToday = 
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          // Adăugăm text special pentru 8 decembrie
          const isSpecialDate = day === 8 && month === 11 && year === today.getFullYear(); // December = 11 (0-based)

          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => { dayRefs.current[index] = el; }}
              data-month={month}
              data-day={day}
              className={`relative z-10 m-[-0.5px] group aspect-square w-full cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 ${
                isToday ? 'bg-blue-500 text-white' : 'text-slate-800'
              }`}
              onClick={() => handleDayClick(day, month, year)}
            >
              <span className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:text-sm lg:text-base`}>
                {day}
              </span>
              {isSpecialDate && (
                <span className="absolute bottom-1 left-1 text-xs text-red-500 sm:text-sm lg:text-base">
                  Text Special
                </span>
              )}
              {index === 0 || calendarDays[index - 1].month !== month ? (
                <span className="absolute bottom-1 left-1 w-full text-sm font-semibold text-slate-300">
                  {monthNames[month]} {year}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    ));
  }, [year, selectedMonth]);

  return (
    <div className="calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
      <NavBar navType={1}/>
      <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <h2 className="text-lg font-semibold text-slate-800">
          Calendar - Starting from {monthNames[today.getMonth()]} {today.getFullYear()}
        </h2>
      </div>
      <div className="grid w-full grid-cols-7 text-center text-xs font-semibold uppercase text-gray-500 sm:text-sm">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1">{generateCalendar}</div>
    </div>
  );
};

export default CalendarPage;
