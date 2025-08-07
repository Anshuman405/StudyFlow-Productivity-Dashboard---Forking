import React, { useState } from 'react';
import { PlusIcon, FilterIcon, SearchIcon, TagIcon, ClockIcon, CalendarIcon, FlagIcon, XIcon } from 'lucide-react';
export const TaskBoard = () => {
  // Mock task data
  const initialTasks = {
    todo: [{
      id: 1,
      title: 'Complete Math Assignment',
      dueDate: 'May 15',
      priority: 'high',
      subject: 'Mathematics'
    }, {
      id: 2,
      title: 'Read Chapter 5 of History Book',
      dueDate: 'May 16',
      priority: 'medium',
      subject: 'History'
    }, {
      id: 3,
      title: 'Prepare for Biology Quiz',
      dueDate: 'May 18',
      priority: 'medium',
      subject: 'Biology'
    }],
    inProgress: [{
      id: 4,
      title: 'Physics Lab Report',
      dueDate: 'May 20',
      priority: 'high',
      subject: 'Physics'
    }, {
      id: 5,
      title: 'Research for English Essay',
      dueDate: 'May 22',
      priority: 'low',
      subject: 'English'
    }],
    completed: [{
      id: 6,
      title: 'Chemistry Homework',
      dueDate: 'May 10',
      priority: 'medium',
      subject: 'Chemistry'
    }, {
      id: 7,
      title: 'Spanish Vocabulary List',
      dueDate: 'May 8',
      priority: 'low',
      subject: 'Spanish'
    }]
  };
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // State for new task modal
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState('todo');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  // Simple drag-and-drop simulation
  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };
  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceColumn = e.dataTransfer.getData('sourceColumn');
    if (sourceColumn === targetColumn) return;
    const taskToMove = tasks[sourceColumn].find(task => task.id === taskId);
    setTasks({
      ...tasks,
      [sourceColumn]: tasks[sourceColumn].filter(task => task.id !== taskId),
      [targetColumn]: [...tasks[targetColumn], taskToMove]
    });
  };
  const handleDragOver = e => {
    e.preventDefault();
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };
  const handleAddNewTask = (column = 'todo') => {
    setNewTaskColumn(column);
    setIsNewTaskModalOpen(true);
  };
  const handleSaveNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        dueDate: newTaskDueDate || 'No date set',
        priority: newTaskPriority,
        subject: newTaskSubject || 'General'
      };
      setTasks({
        ...tasks,
        [newTaskColumn]: [...tasks[newTaskColumn], newTask]
      });
      setNewTaskTitle('');
      setNewTaskDueDate('');
      setNewTaskPriority('medium');
      setNewTaskSubject('');
      setIsNewTaskModalOpen(false);
    }
  };
  const handleDeleteTask = (taskId, column) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter(task => task.id !== taskId)
    });
  };
  // Get all unique subjects for the filter dropdown
  const allSubjects = [...new Set([].concat(...Object.values(tasks).map(columnTasks => columnTasks.map(task => task.subject))))].filter(Boolean);
  // Apply filters to tasks
  const filterTasks = taskList => {
    return taskList.filter(task => (task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.subject.toLowerCase().includes(searchTerm.toLowerCase())) && (!filterPriority || task.priority === filterPriority) && (!filterSubject || task.subject === filterSubject));
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <button onClick={() => handleAddNewTask()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
          <PlusIcon size={18} className="mr-1" />
          <span>New Task</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search tasks..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={() => setIsFilterModalOpen(true)} className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-100">
          <FilterIcon size={20} className="text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" onDrop={e => handleDrop(e, 'todo')} onDragOver={handleDragOver}>
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-700">To Do</h2>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {filterTasks(tasks.todo).length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {filterTasks(tasks.todo).map(task => <div key={task.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move" draggable onDragStart={e => handleDragStart(e, task.id, 'todo')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    {task.title}
                  </span>
                  <div className={`flex items-center ${getPriorityColor(task.priority)}`}>
                    <FlagIcon size={14} className="mr-1" />
                    <span className="text-xs">{task.priority}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TagIcon size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {task.subject}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <CalendarIcon size={14} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {task.dueDate}
                      </span>
                    </div>
                    <button onClick={() => handleDeleteTask(task.id, 'todo')} className="text-gray-400 hover:text-red-500">
                      <XIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>)}
            <button onClick={() => handleAddNewTask('todo')} className="w-full py-2 text-sm text-indigo-600 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50">
              + Add Task
            </button>
          </div>
        </div>
        {/* In Progress Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" onDrop={e => handleDrop(e, 'inProgress')} onDragOver={handleDragOver}>
          <div className="p-4 bg-blue-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-700">In Progress</h2>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {filterTasks(tasks.inProgress).length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {filterTasks(tasks.inProgress).map(task => <div key={task.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move" draggable onDragStart={e => handleDragStart(e, task.id, 'inProgress')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">
                    {task.title}
                  </span>
                  <div className={`flex items-center ${getPriorityColor(task.priority)}`}>
                    <FlagIcon size={14} className="mr-1" />
                    <span className="text-xs">{task.priority}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TagIcon size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {task.subject}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <CalendarIcon size={14} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {task.dueDate}
                      </span>
                    </div>
                    <button onClick={() => handleDeleteTask(task.id, 'inProgress')} className="text-gray-400 hover:text-red-500">
                      <XIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>)}
            <button onClick={() => handleAddNewTask('inProgress')} className="w-full py-2 text-sm text-indigo-600 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50">
              + Add Task
            </button>
          </div>
        </div>
        {/* Completed Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" onDrop={e => handleDrop(e, 'completed')} onDragOver={handleDragOver}>
          <div className="p-4 bg-green-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-700">Completed</h2>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                {filterTasks(tasks.completed).length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {filterTasks(tasks.completed).map(task => <div key={task.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move opacity-75" draggable onDragStart={e => handleDragStart(e, task.id, 'completed')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800 line-through">
                    {task.title}
                  </span>
                  <div className={`flex items-center ${getPriorityColor(task.priority)}`}>
                    <FlagIcon size={14} className="mr-1" />
                    <span className="text-xs">{task.priority}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TagIcon size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {task.subject}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <ClockIcon size={14} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">Completed</span>
                    </div>
                    <button onClick={() => handleDeleteTask(task.id, 'completed')} className="text-gray-400 hover:text-red-500">
                      <XIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>)}
            <button onClick={() => handleAddNewTask('completed')} className="w-full py-2 text-sm text-indigo-600 border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50">
              + Add Task
            </button>
          </div>
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
                  Subject
                </label>
                <input type="text" value={newTaskSubject} onChange={e => setNewTaskSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Mathematics, History" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input type="text" value={newTaskDueDate} onChange={e => setNewTaskDueDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., May 20" />
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
                <button onClick={handleSaveNewTask} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Filter Modal */}
      {isFilterModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Filter Tasks
              </h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">All Subjects</option>
                  {allSubjects.map(subject => <option key={subject} value={subject}>
                      {subject}
                    </option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => {
              setFilterPriority('');
              setFilterSubject('');
            }} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Clear Filters
                </button>
                <button onClick={() => setIsFilterModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};