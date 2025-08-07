import React, { useState } from 'react';
import { CalendarIcon, CheckCircleIcon, ClockIcon, FileTextIcon, TrendingUpIcon, BookIcon, AlertCircleIcon, XIcon, PlusIcon } from 'lucide-react';
export const Dashboard = () => {
  // Mock data
  const [upcomingTasks, setUpcomingTasks] = useState([{
    id: 1,
    title: 'Math Assignment',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  }, {
    id: 2,
    title: 'Physics Lab Report',
    dueDate: 'Tomorrow',
    priority: 'medium',
    completed: false
  }, {
    id: 3,
    title: 'History Essay Research',
    dueDate: 'In 3 days',
    priority: 'low',
    completed: false
  }]);
  const [upcomingEvents, setUpcomingEvents] = useState([{
    id: 1,
    title: 'Chemistry Study Group',
    time: 'Today, 4:00 PM',
    type: 'study'
  }, {
    id: 2,
    title: 'Economics Exam',
    time: 'May 15, 10:00 AM',
    type: 'exam'
  }, {
    id: 3,
    title: 'Literature Review Session',
    time: 'May 17, 2:30 PM',
    type: 'study'
  }]);
  const recentMaterials = [{
    id: 1,
    title: 'Biology Notes Ch. 5',
    type: 'notes',
    date: 'May 10'
  }, {
    id: 2,
    title: 'Calculus Formula Sheet',
    type: 'pdf',
    date: 'May 9'
  }, {
    id: 3,
    title: 'Spanish Vocabulary',
    type: 'doc',
    date: 'May 8'
  }];
  // State for new task modal
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  // State for new event modal
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventType, setNewEventType] = useState('study');
  // Handle task completion toggle
  const toggleTaskCompletion = taskId => {
    setUpcomingTasks(upcomingTasks.map(task => task.id === taskId ? {
      ...task,
      completed: !task.completed
    } : task));
  };
  // Handle adding new task
  const handleAddNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        dueDate: newTaskDueDate || 'No date set',
        priority: newTaskPriority,
        completed: false
      };
      setUpcomingTasks([...upcomingTasks, newTask]);
      setNewTaskTitle('');
      setNewTaskPriority('medium');
      setNewTaskDueDate('');
      setIsNewTaskModalOpen(false);
    }
  };
  // Handle adding new event
  const handleAddNewEvent = () => {
    if (newEventTitle.trim()) {
      const newEvent = {
        id: Date.now(),
        title: newEventTitle,
        time: newEventTime || 'No time set',
        type: newEventType
      };
      setUpcomingEvents([...upcomingEvents, newEvent]);
      setNewEventTitle('');
      setNewEventTime('');
      setNewEventType('study');
      setIsNewEventModalOpen(false);
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Alex
          </h1>
          <p className="text-gray-600">
            Here's an overview of your study progress
          </p>
        </div>
        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg flex items-center">
          <CalendarIcon size={18} className="mr-2" />
          <span>May 12, 2023</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Study Streak</h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              +5%
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">7 days</p>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Completed Tasks</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              This Week
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">12/15</p>
              <p className="text-xs text-gray-500">3 tasks remaining</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Study Time</h2>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              This Week
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">14.5 hrs</p>
              <p className="text-xs text-gray-500">2.5 hrs above target</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Upcoming Tasks</h2>
            <button onClick={() => window.location.hash = 'tasks'} className="text-sm text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map(task => <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <span className={`text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-3">
                    {task.dueDate}
                  </span>
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} className="h-4 w-4 text-indigo-600 rounded" />
                </div>
              </div>)}
            <button onClick={() => setIsNewTaskModalOpen(true)} className="w-full mt-2 py-2 text-sm text-indigo-600 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50">
              + Add New Task
            </button>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Upcoming Events</h2>
            <button onClick={() => window.location.hash = 'calendar'} className="text-sm text-indigo-600 hover:text-indigo-800">
              View Calendar
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(event => <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg mr-3 ${event.type === 'exam' ? 'bg-red-100' : 'bg-blue-100'}`}>
                  {event.type === 'exam' ? <AlertCircleIcon className="h-5 w-5 text-red-500" /> : <BookIcon className="h-5 w-5 text-blue-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </div>)}
            <button onClick={() => setIsNewEventModalOpen(true)} className="w-full mt-2 py-2 text-sm text-indigo-600 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50">
              + Add New Event
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">
            Recent Study Materials
          </h2>
          <button onClick={() => window.location.hash = 'materials'} className="text-sm text-indigo-600 hover:text-indigo-800">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentMaterials.map(material => <div key={material.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <FileTextIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {material.title}
                </p>
                <p className="text-xs text-gray-500">
                  Added on {material.date}
                </p>
              </div>
            </div>)}
        </div>
      </div>

      {/* New Task Modal */}
      {isNewTaskModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Task
              </h3>
              <button onClick={() => setIsNewTaskModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter task title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input type="text" value={newTaskDueDate} onChange={e => setNewTaskDueDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Today, Tomorrow, May 20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsNewTaskModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAddNewTask} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>}

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input type="text" value={newEventTime} onChange={e => setNewEventTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Today at 3:00 PM, May 20 at 10:00 AM" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select value={newEventType} onChange={e => setNewEventType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="study">Study Session</option>
                  <option value="exam">Exam</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsNewEventModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAddNewEvent} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};