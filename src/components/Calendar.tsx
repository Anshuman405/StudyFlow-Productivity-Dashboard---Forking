import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon, RepeatIcon, CalendarIcon } from 'lucide-react';
export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Mock data for calendar events
  const [events, setEvents] = useState([{
    id: 1,
    date: '2023-05-15',
    title: 'Economics Exam',
    type: 'exam',
    time: '10:00 AM',
    isRecurring: false
  }, {
    id: 2,
    date: '2023-05-12',
    title: 'Chemistry Study Group',
    type: 'study',
    time: '4:00 PM',
    isRecurring: true,
    recurrenceType: 'weekly',
    recurrenceDay: 5,
    startDate: '2023-05-12',
    endDate: '2023-06-30'
  }, {
    id: 3,
    date: '2023-05-17',
    title: 'Literature Review',
    type: 'study',
    time: '2:30 PM',
    isRecurring: false
  }, {
    id: 4,
    date: '2023-05-20',
    title: 'Math Assignment Due',
    type: 'assignment',
    time: '11:59 PM',
    isRecurring: false
  }, {
    id: 5,
    date: '2023-05-22',
    title: 'Physics Lab',
    type: 'lab',
    time: '3:00 PM',
    isRecurring: true,
    recurrenceType: 'daily',
    startDate: '2023-05-22',
    endDate: '2023-05-26'
  }]);
  // State for new event modal
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState('study');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [recurrenceDay, setRecurrenceDay] = useState(1); // Monday default
  const [recurrenceStartDate, setRecurrenceStartDate] = useState('');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  // State for event details modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  // State for view mode
  const [viewMode, setViewMode] = useState('month');
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const handleAddNewEvent = (date = '') => {
    setNewEventDate(date);
    setRecurrenceStartDate(date);
    setIsNewEventModalOpen(true);
    setIsRecurring(false);
    setRecurrenceType('daily');
    setRecurrenceDay(1);
    setRecurrenceEndDate('');
  };
  // Check if an event occurs on a specific date
  const doesEventOccurOnDate = (event, dateStr) => {
    if (!event.isRecurring) {
      return event.date === dateStr;
    }
    const eventDate = new Date(event.date || event.startDate);
    const checkDate = new Date(dateStr);
    const endDate = new Date(event.endDate);
    // Check if date is within range
    if (checkDate < eventDate || checkDate > endDate) {
      return false;
    }
    if (event.recurrenceType === 'daily') {
      return true;
    } else if (event.recurrenceType === 'weekly') {
      // Check if day of week matches
      return checkDate.getDay() === event.recurrenceDay;
    }
    return false;
  };
  const handleSaveEvent = () => {
    if (newEventTitle.trim()) {
      const baseDate = newEventDate || recurrenceStartDate;
      const newEvent = {
        id: Date.now(),
        date: baseDate,
        title: newEventTitle,
        type: newEventType,
        time: newEventTime || 'All day',
        isRecurring: isRecurring
      };
      if (isRecurring) {
        newEvent.recurrenceType = recurrenceType;
        newEvent.startDate = recurrenceStartDate;
        newEvent.endDate = recurrenceEndDate || recurrenceStartDate;
        if (recurrenceType === 'weekly') {
          newEvent.recurrenceDay = parseInt(recurrenceDay);
        }
      }
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setNewEventType('study');
      setNewEventTime('');
      setNewEventDate('');
      setIsNewEventModalOpen(false);
    }
  };
  const handleShowEventDetails = event => {
    setSelectedEvent(event);
    setIsEventDetailsModalOpen(true);
  };
  const handleDeleteEvent = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsEventDetailsModalOpen(false);
  };
  const goToToday = () => {
    setCurrentMonth(new Date());
  };
  const formatRecurrenceInfo = event => {
    if (!event.isRecurring) return 'One-time event';
    if (event.recurrenceType === 'daily') {
      return `Daily from ${formatDate(event.startDate)} to ${formatDate(event.endDate)}`;
    } else if (event.recurrenceType === 'weekly') {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `Every ${days[event.recurrenceDay]} from ${formatDate(event.startDate)} to ${formatDate(event.endDate)}`;
    }
    return '';
  };
  const formatDate = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }
    // Add cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      // Find events for this date (including recurring events)
      const dayEvents = events.filter(event => doesEventOccurOnDate(event, dateStr));
      days.push(<div key={day} className="h-24 border border-gray-200 p-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
              {day}
            </span>
            <button onClick={() => handleAddNewEvent(dateStr)} className="text-gray-400 hover:text-indigo-600">
              <PlusIcon size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {dayEvents.map(event => <div key={`${event.id}-${dateStr}`} className={`text-xs p-1 rounded truncate cursor-pointer ${event.type === 'exam' ? 'bg-red-100 text-red-800' : event.type === 'assignment' ? 'bg-yellow-100 text-yellow-800' : event.type === 'lab' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} ${event.isRecurring ? 'border-l-2 border-indigo-500' : ''}`} onClick={() => handleShowEventDetails(event)}>
                {event.title}{' '}
                {event.isRecurring && <RepeatIcon size={8} className="inline ml-1" />}
              </div>)}
          </div>
        </div>);
    }
    return days;
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => handleAddNewEvent('')} className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-100">
            <PlusIcon size={20} className="text-indigo-600" />
          </button>
          <select className="bg-white p-2 rounded-lg border border-gray-200 text-sm" value={viewMode} onChange={e => setViewMode(e.target.value)}>
            <option value="month">Month View</option>
            <option value="week">Week View</option>
            <option value="day">Day View</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeftIcon size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRightIcon size={20} className="text-gray-600" />
            </button>
          </div>
          <button onClick={goToToday} className="text-sm text-indigo-600 hover:text-indigo-800">
            Today
          </button>
        </div>
        <div className="grid grid-cols-7 text-center py-2 border-b bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-sm font-medium text-gray-500">
              {day}
            </div>)}
        </div>
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.sort((a, b) => new Date(a.date || a.startDate) - new Date(b.date || b.startDate)).slice(0, 3).map(event => <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-full rounded-full mr-3 ${event.type === 'exam' ? 'bg-red-500' : event.type === 'assignment' ? 'bg-yellow-500' : event.type === 'lab' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-800">
                      {event.title}
                    </p>
                    {event.isRecurring && <RepeatIcon size={14} className="text-indigo-500 ml-2" />}
                  </div>
                  <p className="text-xs text-gray-500">
                    {event.isRecurring ? `${formatDate(event.startDate)} • ${event.time}` : `${formatDate(event.date)} • ${event.time}`}
                  </p>
                  {event.isRecurring && <p className="text-xs text-indigo-600 italic">
                      {event.recurrenceType === 'daily' ? 'Repeats daily' : `Repeats weekly on ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][event.recurrenceDay]}`}
                    </p>}
                </div>
                <button onClick={() => handleShowEventDetails(event)} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                  Details
                </button>
              </div>)}
        </div>
      </div>
      {/* New Event Modal */}
      {isNewEventModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Event
              </h3>
              <button onClick={() => setIsNewEventModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input type="text" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter event title" />
              </div>
              {!newEventDate && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input type="date" value={newEventDate || recurrenceStartDate} onChange={e => {
              setNewEventDate(e.target.value);
              setRecurrenceStartDate(e.target.value);
            }} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input type="text" value={newEventTime} onChange={e => setNewEventTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 3:00 PM" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select value={newEventType} onChange={e => setNewEventType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="study">Study Session</option>
                  <option value="exam">Exam</option>
                  <option value="assignment">Assignment</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center mb-3">
                  <input type="checkbox" id="isRecurring" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="h-4 w-4 text-indigo-600 rounded" />
                  <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-gray-700">
                    Recurring Event
                  </label>
                </div>
                {isRecurring && <div className="space-y-3 pl-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recurrence Type
                      </label>
                      <select value={recurrenceType} onChange={e => setRecurrenceType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                    {recurrenceType === 'weekly' && <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Day of Week
                        </label>
                        <select value={recurrenceDay} onChange={e => setRecurrenceDay(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                          <option value="0">Sunday</option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                        </select>
                      </div>}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input type="date" value={recurrenceStartDate} onChange={e => setRecurrenceStartDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input type="date" value={recurrenceEndDate} onChange={e => setRecurrenceEndDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" min={recurrenceStartDate} />
                    </div>
                  </div>}
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsNewEventModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSaveEvent} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Event Details Modal */}
      {isEventDetailsModalOpen && selectedEvent && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Event Details
              </h3>
              <button onClick={() => setIsEventDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h4 className="font-medium text-lg text-gray-800">
                    {selectedEvent.title}
                  </h4>
                  {selectedEvent.isRecurring && <RepeatIcon size={16} className="text-indigo-500 ml-2" />}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Date:</span>{' '}
                  {selectedEvent.isRecurring ? formatDate(selectedEvent.startDate) : formatDate(selectedEvent.date)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Time:</span>{' '}
                  {selectedEvent.time}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span>{' '}
                  {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                </p>
                {selectedEvent.isRecurring && <div className="mt-2 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-800 font-medium">
                      Recurring Event
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatRecurrenceInfo(selectedEvent)}
                    </p>
                  </div>}
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Delete
                </button>
                <button onClick={() => setIsEventDetailsModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};