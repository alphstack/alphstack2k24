import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CalendarPage = ({ onClick }) => {
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const { user } = useAuthContext();
  const today = new Date();
  const dayRefs = useRef([]);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const [events, setEvents] = useState([]);

  const getEvents = async () =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/getTasks`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username})
    })

    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setEvents(json.tasks);
    }
  }

  const handleUndo = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/markTaskAsUndone`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setEvents(json.tasks);
    }
  }
  const handleDone = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/markTaskAsDone`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setEvents(json.tasks);
      setPopup({
        visible: true,
        message: `Congratulations! You earned ${json.points || 0} ⭐`,
      });

      // Ascunde popup-ul după 3 secunde
      setTimeout(() => {
        setPopup({ visible: false, message: '' });
      }, 3000);
    }
  }
  const handleDeleteTask = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/deleteTask`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setEvents(json.tasks);
    }
  }
  useEffect(() =>{
    if(user) 
      getEvents();
  }, [user])


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
          
          // Verificăm dacă data este mai veche decât data de azi
          const isPastDate = new Date(year, month, day, 23, 59, 59) < new Date();
      
          // Filtrăm taskurile care au deadline-ul în acea zi
          const dailyEvents = events.filter((e) => {
            if (!e.taskDeadline) return false; // Ignoră task-urile fără deadline
      
            // Task deadline in format 'yyyy-mm-dd'
            const taskDate = new Date(e.taskDeadline); // Creăm un obiect Date din taskDeadline
            
            // Comparăm anul, luna și ziua
            return (
              taskDate.getFullYear() === year &&
              taskDate.getMonth() === month &&
              taskDate.getDate() === day
            );
          });
      
          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => { dayRefs.current[index] = el; }}
              data-month={month}
              data-day={day}
              className={`relative z-10 m-[-0.5px] group flex aspect-[1.3] w-full rounded-xl border font-medium border-gray-300 transition-all hover:z-20 hover:border-cyan-400 ${
                isToday 
                  ? 'bg-[#FDC374]/70 text-white rounded-xl shadow-custom backdrop-blur-sm border border-white/30' // transparent portocaliu
                  : isPastDate 
                  ? 'bg-gray-100 text-gray-500' // Culoare gri pentru datele mai vechi decât azi
                  : 'text-slate-800'
              }`}
            >
              <span
                className={`absolute left-1 top-1 flex items-center justify-center rounded-full text-base sm:text-lg lg:text-xl font-semibold`}
              >
                {day}
              </span>
    
              {/* Afișează toate taskurile pentru ziua respectivă */}
              {dailyEvents.length > 0 && (
              <div className="mx-auto mt-7 flex flex-col gap-1 text-xs sm:text-sm lg:text-base">
                {dailyEvents.map((event, idx) => {
                  // Verificăm dacă task-ul este mai vechi decât ziua de azi
                  const isPastDate = new Date(event.taskDeadline) < today;
                  
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between space-x-2 p-1 rounded-lg ${
                        event.completed ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{event.taskEmoji}</span>
                        <span>{event.taskName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
  {event.completed && !isPastDate && (
    <button
      className="rounded px-2 py-1 text-xs font-semibold bg-green-100 text-green-800"
      onClick={() => handleUndo(event.taskId)}
    >
      Undo
    </button>
  )}
  {!event.completed && !isPastDate && (
    <button
      className={`rounded px-2 py-1 text-xs font-semibold ${
        isPastDate
          ? 'bg-red-700 text-white'
          : 'bg-red-100 text-red-800'
      }`}
      onClick={() =>
        isPastDate
          ? null
          : handleDone(event.taskId)
      }
    >
      {isPastDate ? 'Failed' : 'Mark as Done'}
    </button>
  )}
  {event.completed && (
    <button
      className="text-yellow-500 hover:text-yellow-700"
      title={`Set Points (${event.points || 0})`}
    >
      ⭐ {event.points || 0}
    </button>
  )}
  {!event.completed && !isPastDate && (
    <button
      className="text-gray-400 hover:text-gray-700"
      onClick={() => handleDeleteTask(event.taskId)}
      title="Delete Task"
    >
      🗑️
    </button>
  )}
</div>

                    </div>
                  );
                })}
              </div>
            )}

    
              {index === 0 || calendarDays[index - 1].month !== month ? (
                <span className="absolute bottom-2 left-2 w-full text-xs font-semibold text-slate-500 sm:text-base lg:text-lg">
                  {monthNames[month]} {year}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    ));
    
  }, [year, selectedMonth, events]);

  return (
    <div className="calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 shadow-xl">
        {popup.visible &&
        <div className="absolute bottom-10 left-1/2 z-50 animintr transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-md">
          {popup.message}
        </div>
        }

      <div className="w-full rounded-t-2xl bg-white px-5 pt-7 pb-10 sm:px-10 sm:pt-8">
        <h2 className="text-2xl font-semibold text-slate-800">
          Calendar - Starting from {monthNames[today.getMonth()]} {today.getFullYear()}
        </h2>
      </div>
      <div className="grid px-5 sm:px-10 w-full grid-cols-7 text-center text-xs font-semibold uppercase text-gray-500 sm:text-sm">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 mx-5 sm:mx-10">{generateCalendar}</div>
    </div>
  );
};

export default CalendarPage;
